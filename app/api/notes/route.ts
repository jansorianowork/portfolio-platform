import { NextResponse } from "next/server";
import { getCosmosContainer } from "@/lib/cosmos";
import { getErrorMessage } from "@/lib/errorHandler";

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
		const error = getErrorMessage(err, "Failed to fetch notes");
		return NextResponse.json({ error }, { status: 500 });
	}
}
