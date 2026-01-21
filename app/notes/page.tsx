import { getCosmosContainer } from "@/lib/cosmos";

type Note = {
	id: string;
	slug: string;
	title: string;
	publishedAt: string;
	tags?: string[];
};

export default async function NotesPage() {
	const container = getCosmosContainer();

	const query = {
		query: "SELECT TOP 50 * FROM c WHERE c.type = @type ORDER BY c.publishedAt DESC",
		parameters: [{ name: "@type", value: "note" }],
	};

	const { resources } = await container.items.query(query).fetchAll();
	const notes = (resources ?? []) as Note[];

	return (
		<main className="max-w-3xl mx-auto px-6 py-12">
			<h1 className="text-3xl font-semibold mb-8">Engineering Notes</h1>

			{notes.length === 0 && (
				<p className="text-muted-foreground">No notes yet.</p>
			)}

			<ul className="space-y-6">
				{notes.map((note) => (
					<li key={note.id} className="border-b pb-4">
						<a
							href={`/notes/${note.slug}`}
							className="text-xl font-medium hover:underline"
						>
							{note.title}
						</a>
						<div className="text-sm text-muted-foreground mt-1">
							{new Date(note.publishedAt).toDateString()}
						</div>
					</li>
				))}
			</ul>
		</main>
	);
}
