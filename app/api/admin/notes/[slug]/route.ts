import { NextResponse } from "next/server";
import { Container } from "@azure/cosmos";
import { getCosmosContainer } from "@/lib/cosmos";
import { assertAdminFromSwaHeaders } from "@/lib/admin";
import { getErrorMessage } from "@/lib/errorHandler";

type NotePatch = {
	title?: string;
	contentMarkdown?: string;
	tags?: string[];
	publishedAt?: string;
};

async function findNoteBySlug(container: Container, slug: string) {
	const query = {
		query: "SELECT TOP 1 * FROM c WHERE c.type = @type AND c.slug = @slug",
		parameters: [
			{ name: "@type", value: "note" },
			{ name: "@slug", value: slug },
		],
	};
	const { resources } = await container.items.query(query).fetchAll();
	return resources?.[0] ?? null;
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;
	try {
		assertAdminFromSwaHeaders(req);

		const container = getCosmosContainer();
		const existing = await findNoteBySlug(container, slug);

		if (!existing) {
			return NextResponse.json({ error: "Not found" }, { status: 404 });
		}

		const patch = (await req.json()) as NotePatch;

		const updated = {
			...existing,
			title: patch.title ?? existing.title,
			contentMarkdown: patch.contentMarkdown ?? existing.contentMarkdown,
			tags: patch.tags ?? existing.tags,
			publishedAt: patch.publishedAt ?? existing.publishedAt,
			updatedAt: new Date().toISOString(),
		};

		// Use replace with id + partition key
		await container.item(existing.id, existing.type).replace(updated);

		return NextResponse.json({ ok: true, note: updated });
	} catch (err: unknown) {
		const error = getErrorMessage(err, "Failed to update note");
		const status = error === "Unauthorized" ? 401 : 500;
		return NextResponse.json({ error: error }, { status });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;
	try {
		assertAdminFromSwaHeaders(req);

		const container = getCosmosContainer();
		const existing = await findNoteBySlug(container, slug);

		if (!existing) {
			return NextResponse.json({ error: "Not found" }, { status: 404 });
		}

		await container.item(existing.id, existing.type).delete();

		return NextResponse.json({ ok: true });
	} catch (err: unknown) {
		const error = getErrorMessage(err, "Failed to delete note");
		const status = error === "Unauthorized" ? 401 : 500;
		return NextResponse.json({ error: error }, { status });
	}
}
