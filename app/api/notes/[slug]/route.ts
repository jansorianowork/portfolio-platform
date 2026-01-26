import { NextResponse } from "next/server";
import { getCosmosContainer } from "@/lib/cosmos";
import { getErrorMessage } from "@/lib/errorHandler";

export async function GET(
	_req: Request,
	{ params }: { params: { slug: string } },
) {
	try {
		const container = getCosmosContainer();

		const query = {
			query: "SELECT TOP 1 * FROM c WHERE c.type = @type AND c.slug = @slug",
			parameters: [
				{ name: "@type", value: "note" },
				{ name: "@slug", value: params.slug },
			],
		};

		const { resources } = await container.items.query(query).fetchAll();
		const note = resources?.[0];

		if (!note) {
			return NextResponse.json({ error: "Not found" }, { status: 404 });
		}

		return NextResponse.json({ note });
	} catch (err) {
		const error = getErrorMessage(err, "Failed to fetch notes");
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
