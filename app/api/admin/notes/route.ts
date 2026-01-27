import { NextResponse } from "next/server";
import { getCosmosContainer } from "@/lib/cosmos";
import { assertAdminFromSwaHeaders } from "@/lib/admin";
import { getErrorMessage } from "@/lib/errorHandler";

type NoteInput = {
	slug: string;
	title: string;
	contentMarkdown?: string;
	tags?: string[];
	publishedAt?: string;
};

export async function POST(req: Request) {
	try {
		assertAdminFromSwaHeaders(req);

		const body = (await req.json()) as NoteInput;

		if (!body.slug || !body.title) {
			return NextResponse.json(
				{ error: "slug and title are required" },
				{ status: 400 },
			);
		}

		const container = getCosmosContainer();

		const doc = {
			id: `note_${body.slug}`,
			type: "note",
			slug: body.slug,
			title: body.title,
			contentMarkdown: body.contentMarkdown ?? "",
			tags: body.tags ?? [],
			publishedAt: body.publishedAt ?? new Date().toISOString(),
		};

		await container.items.create(doc);

		return NextResponse.json({ ok: true, note: doc });
	} catch (err) {
		const error = getErrorMessage(err, "Failed to fetch notes");
		const status = error === "Unauthorized" ? 401 : 500;
		return NextResponse.json({ error: error }, { status });
	}
}
