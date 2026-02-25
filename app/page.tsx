"use client";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
	const [menuOpen, setMenuOpen] = useState(false);

	const scrollTo = (id: string) => {
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ behavior: "smooth" });
		setMenuOpen(false);
	};

	return (
		<div className="min-h-screen">
			{/* Header */}
			<header className="fixed top-0 left-0 right-0 bg-white">
				<div className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
					<div className="font-medium">Your Name</div>

					<div className="flex items-center gap-6 text-sm">
						<button
							onClick={() => scrollTo("about")}
							className="underline"
						>
							About
						</button>
						<button
							onClick={() => scrollTo("services")}
							className="underline"
						>
							Services
						</button>
						<button
							onClick={() => scrollTo("projects")}
							className="underline"
						>
							Projects
						</button>

						<Link href="/notes" className="underline">
							Blog
						</Link>

						{/* Ellipsis */}
						<div className="relative">
							<button onClick={() => setMenuOpen(!menuOpen)}>
								…
							</button>

							{menuOpen && (
								<div className="absolute right-0 mt-2 border bg-white px-4 py-3 text-sm">
									<button
										onClick={() => scrollTo("contact")}
										className="block underline"
									>
										Contact
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>

			{/* Spacer for fixed header */}
			<div className="h-24" />

			{/* Sections */}
			<main className="max-w-2xl mx-auto px-6 space-y-32 pb-32">
				<section id="about" className="space-y-6">
					<h1 className="text-3xl font-semibold">About</h1>
					<p className="text-neutral-600">
						Short professional bio here.
					</p>
				</section>

				<section id="services" className="space-y-6">
					<h1 className="text-3xl font-semibold">Services</h1>
					<p className="text-neutral-600">What you offer.</p>
				</section>

				<section id="projects" className="space-y-6">
					<h1 className="text-3xl font-semibold">Projects</h1>
					<p className="text-neutral-600">Selected work.</p>
				</section>

				<section id="contact" className="space-y-6">
					<h1 className="text-3xl font-semibold">Contact</h1>
					<p className="text-neutral-600">your@email.com</p>
				</section>
			</main>
		</div>
	);
}
