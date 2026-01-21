import { NextResponse } from "next/server";
import { getCosmosContainer } from "@/lib/cosmos";

export async function GET() {
	try {
		const container = getCosmosContainer();

		const query = {
			query: "SELECT TOP 50 * FROM c WHERE c.type = @type ORDER BY c.publishedAt DESC",
			parameters: [{ name: "@type", value: "note" }],
		};

		const { resources } = await container.items.query(query).fetchAll();

		return NextResponse.json({ items: resources ?? [] });
	} catch (err: unknown) {
		const error = err instanceof Error ? err.message : "Auth error";
		return NextResponse.json(
			{ error: error ?? "Failed to fetch notes" },
			{ status: 500 },
		);
	}
}
