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
		<div className="max-h-screen">
			{/* Header */}
			<header className="bg-black fixed top-0 right-0 md:left-50">
				<div className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-6 text-sm">
						<Link href="/" className="font-medium justify-center">
							About
						</Link>
						<button
							onClick={() => scrollTo("services")}
							className=""
						>
							Services
						</button>
						<button
							onClick={() => scrollTo("projects")}
							className=""
						>
							Projects
						</button>

						<Link href="/notes" className="">
							Blog
						</Link>

						<button
							onClick={() => scrollTo("contact")}
							className=""
						>
							Contact
						</button>
					</div>

					{/* Mobile Ellipsis */}
					<div className="relative md:hidden">
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="text-xl"
						>
							…
						</button>

						{menuOpen && (
							<div className="bg-black absolute right-0 mt-3 border  px-12 py-6 text-sm space-y-3">
								<Link
									href="/"
									className="font-medium justify-center"
								>
									About
								</Link>
								<button
									onClick={() => scrollTo("services")}
									className="block "
								>
									Services
								</button>
								<button
									onClick={() => scrollTo("projects")}
									className="block"
								>
									Projects
								</button>

								<Link href="/notes" className="block">
									Blog
								</Link>

								<button
									onClick={() => scrollTo("contact")}
									className="block"
								>
									Contact
								</button>
							</div>
						)}
					</div>
				</div>
			</header>

			{/* Spacer for fixed header */}
			<div className="h-24" />

			{/* Sections */}
			<main className="max-w-2xl mx-auto px-6 space-y-32 pb-32">
				<section id="about" className="space-y-6">
					<h1 className="text-3xl font-semibold">
						Jan Vincent Soriano
					</h1>
					<h2 className="text-neutral-600">Front-end developer</h2>
					<p>
						With 5+ years of experience building and modernizing
						React and Node.js applications in enterprise
						environments. Experienced in runtime and dependency
						upgrades, CI/CD-safe releases, API integrations, and
						data archiving pipelines. Strong focus on building
						reusable React and Next.js components and pages,
						platform stability, security, and long-term
						maintainability while delivering an accessible,
						high-performance web application.
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
			<footer className=" bottom-0 justify-center md:left-50 py-10 text-sm text-neutral-500">
				<div className="max-w-2xl mx-auto text-center">
					© {new Date().getFullYear()} Jan Vincent Soriano
				</div>
			</footer>
		</div>
	);
}
