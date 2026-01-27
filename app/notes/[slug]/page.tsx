"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Note = {
	id: string;
	slug: string;
	title: string;
	publishedAt: string;
	tags?: string[];
	contentMarkdown?: string;
};

export default function NoteDetailPage() {
	const params = useParams();
	const slug = params.slug as string;
	const [note, setNote] = useState<Note | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const res = await fetch(`/api/notes/${slug}`, {
				cache: "no-store",
			});
			const data = await res.json();
			setNote(data.note ?? null);
			setLoading(false);
		})();
	}, [slug]);

	if (loading) {
		return (
			<main className="max-w-3xl mx-auto px-6 py-12">
				<p className="text-muted-foreground">Loading…</p>
			</main>
		);
	}

	if (!note) {
		return (
			<main className="max-w-3xl mx-auto px-6 py-12 space-y-4">
				<h1 className="text-2xl font-semibold">Note not found</h1>
				<Link className="underline" href="/notes">
					Back to notes
				</Link>
			</main>
		);
	}

	return (
		<main className="max-w-3xl mx-auto px-6 py-12 space-y-6">
			<Link className="underline text-sm" href="/notes">
				← Back
			</Link>
			<header className="space-y-1">
				<h1 className="text-3xl font-semibold">{note.title}</h1>
				<div className="text-sm text-muted-foreground">
					{new Date(note.publishedAt).toDateString()}
				</div>
			</header>

			<article className="prose prose-neutral max-w-none">
				{/* For now, render as plain text. We'll add markdown rendering next. */}
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{note.contentMarkdown ?? ""}
				</ReactMarkdown>
			</article>
		</main>
	);
}
