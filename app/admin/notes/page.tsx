"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Note = {
	id: string;
	slug: string;
	title: string;
	publishedAt: string;
	tags?: string[];
	contentMarkdown?: string;
};

const ADMIN_GITHUB_LOGINS = ["jansorianowork"];

export default function AdminNotesPage() {
	const [allowed, setAllowed] = useState(false);
	const [authChecked, setAuthChecked] = useState(false);

	const [notes, setNotes] = useState<Note[]>([]);
	const [loadingNotes, setLoadingNotes] = useState(true);

	const [slug, setSlug] = useState("");
	const [title, setTitle] = useState("");
	const [contentMarkdown, setContentMarkdown] = useState("");
	const [tags, setTags] = useState("");

	const [status, setStatus] = useState<string | null>(null);

	const tagsArray = useMemo(
		() =>
			tags
				.split(",")
				.map((t) => t.trim())
				.filter(Boolean),
		[tags],
	);

	async function loadNotes() {
		setLoadingNotes(true);
		const res = await fetch("/api/notes", { cache: "no-store" });
		const data = await res.json();
		setNotes(data.items ?? []);
		setLoadingNotes(false);
	}

	useEffect(() => {
		(async () => {
			// Client check (UX). Real security is enforced in API.
			const res = await fetch("/.auth/me");
			const data = await res.json();
			const userDetails = String(
				data?.clientPrincipal?.userDetails ?? "",
			).toLowerCase();
			const ok = ADMIN_GITHUB_LOGINS.some((u) =>
				userDetails.includes(u.toLowerCase()),
			);
			setAllowed(ok);
			setAuthChecked(true);

			if (ok) {
				await loadNotes();
			}
		})();
	}, []);

	async function createNote(e: React.FormEvent) {
		e.preventDefault();
		setStatus(null);

		const res = await fetch("/api/admin/notes", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				slug: slug.trim(),
				title: title.trim(),
				contentMarkdown,
				tags: tagsArray,
			}),
		});

		const data = await res.json();

		if (!res.ok) {
			setStatus(`Error: ${data?.error ?? "Failed"}`);
			return;
		}

		setStatus("Created ✅");
		setSlug("");
		setTitle("");
		setContentMarkdown("");
		setTags("");
		await loadNotes();
	}

	if (!authChecked) {
		return <main className="p-8">Loading…</main>;
	}

	if (!allowed) {
		return (
			<main className="p-8 space-y-3">
				<h1 className="text-2xl font-semibold">Admin Notes</h1>
				<p className="text-sm text-muted-foreground">Access denied.</p>
				<Link className="underline" href="/admin">
					Back
				</Link>
			</main>
		);
	}

	return (
		<main className="max-w-3xl mx-auto px-6 py-12 space-y-10">
			<header className="space-y-1">
				<h1 className="text-3xl font-semibold">Admin • Notes</h1>
				<p className="text-sm text-muted-foreground">
					Create notes that appear on{" "}
					<Link className="underline" href="/notes">
						/notes
					</Link>
					.
				</p>
			</header>

			<section className="space-y-3">
				<h2 className="text-xl font-medium">Create</h2>

				<form onSubmit={createNote} className="space-y-3">
					<input
						className="w-full border rounded-md px-3 py-2"
						placeholder="slug (e.g. axios-auth-regression)"
						value={slug}
						onChange={(e) => setSlug(e.target.value)}
					/>
					<input
						className="w-full border rounded-md px-3 py-2"
						placeholder="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<input
						className="w-full border rounded-md px-3 py-2"
						placeholder="tags (comma-separated)"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
					/>
					<textarea
						className="w-full border rounded-md px-3 py-2 min-h-50"
						placeholder="contentMarkdown"
						value={contentMarkdown}
						onChange={(e) => setContentMarkdown(e.target.value)}
					/>
					<button
						className="border rounded-md px-4 py-2"
						type="submit"
					>
						Create note
					</button>
					{status && <div className="text-sm">{status}</div>}
				</form>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-medium">Existing</h2>

				{loadingNotes ? (
					<p className="text-muted-foreground">Loading…</p>
				) : (
					<ul className="space-y-3">
						{notes.map((n) => (
							<li key={n.id} className="border rounded-md p-3">
								<div className="font-medium">{n.title}</div>
								<div className="text-sm text-muted-foreground">
									/notes/{n.slug} •{" "}
									{new Date(n.publishedAt).toDateString()}
								</div>
							</li>
						))}
					</ul>
				)}
			</section>
		</main>
	);
}
