"use client";

import { useEffect, useState } from "react";

type Note = {
	id: string;
	slug: string;
	title: string;
	publishedAt: string;
	tags?: string[];
};

export default function NotesPage() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch("/api/notes", { cache: "no-store" });
				const data = await res.json();
				setNotes(data.items ?? []);
			} catch (e) {
				const err = e instanceof Error ? e.message : "Auth error";
				setError(err ?? "Failed to load notes");
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<main className="max-w-3xl mx-auto px-6 py-12">
			<h1 className="text-3xl font-semibold mb-8">Engineering Notes</h1>

			{loading && <p className="text-muted-foreground">Loading…</p>}
			{error && <p className="text-red-500 text-sm">{error}</p>}

			{!loading && !error && notes.length === 0 && (
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
