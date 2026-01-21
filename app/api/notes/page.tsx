type Note = {
	id: string;
	slug: string;
	title: string;
	publishedAt: string;
	tags?: string[];
};

async function getNotes(): Promise<Note[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch notes");
	}

	const data = await res.json();
	return data.items ?? [];
}

export default async function NotesPage() {
	const notes = await getNotes();

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
