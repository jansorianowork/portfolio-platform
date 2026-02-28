"use client";
import Link from "next/link";
import { useState, ReactNode } from "react";

// minimal accordion component
function AccordionItem({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	const [open, setOpen] = useState(false);
	return (
		<div className="border-b">
			<button
				onClick={() => setOpen(!open)}
				className="w-full text-left py-2 flex justify-between items-center"
			>
				<span>{title}</span>
				<span>{open ? "–" : "+"}</span>
			</button>
			{open && <div className="pt-2">{children}</div>}
		</div>
	);
}

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
			<header className="fixed right-0 md:flex md:relative">
				<div className="max-w-2xl mx-auto px-6 py-6 flex justify-between">
					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-6 text-sm">
						<Link href="/" className="font-medium">
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
							className="text-xl text-orange-500"
						>
							…
						</button>

						{menuOpen && (
							<div className="bg-black absolute right-0 mt-3 border  px-12 py-6 text-sm space-y-3">
								<Link
									href="/"
									className="font-medium justify-center block"
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
			<main className="max-w-2xl mx-auto px-6 space-y-16 pb-32">
				<section id="about" className="space-y-6">
					<h1 className="text-3xl font-semibold">
						Jan Vincent Soriano
					</h1>
					<h2 className="text-neutral-600">Front-end developer</h2>
					<p>
						With 5+ years of experience building reusable React and
						Next.js components for enterprise applications. Skilled
						in modular architecture, TypeScript, performance
						optimization, and REST API integration. Contributed to
						frontend modernization through Node.js upgrades and
						dependency updates while maintaining UI stability.
						Familiar with Azure DevOps CI/CD pipelines for build and
						release validation.
					</p>
				</section>

				<section id="services" className="space-y-6">
					<h1 className="text-3xl font-semibold">Services</h1>
					<p className="text-neutral-600">
						Framework, Platforms & Libraries
					</p>
					{/* simple accordion for each service */}
					<AccordionItem title="Frontend Development">
						<ul className="list-disc ml-6 space-y-4 text-neutral-700">
							<li className="pl-1">
								Build scalable web applications using
								<strong>React.js</strong>
								and <strong>Next.js</strong>
							</li>
							<li className="pl-1">
								Develop reusable component systems with
								<strong>TypeScript</strong>
							</li>
							<li className="pl-1">
								Create responsive, accessible UI using
								<strong>HTML, CSS/SCSS</strong>
							</li>
							<li className="pl-1">
								Shopify theme customization and storefront
								optimization
							</li>
							<li className="pl-1">
								Performance optimization and frontend
								modernization
							</li>
						</ul>
					</AccordionItem>
					<AccordionItem title="Backend & API Integration">
						<ul className="list-disc ml-6 space-y-4 text-neutral-700">
							<li className="pl-1">
								Develop, upgrade and maintain
								<strong>Node.js applications</strong>
							</li>
							<li className="pl-1">
								Design and integrate <strong>REST APIs</strong>
							</li>
							<li className="pl-1">
								Database integration with
								<strong>MongoDB</strong> and
								<strong>PostgreSQL</strong>
							</li>
							<li className="pl-1">
								Deploy and manage apps on
								<strong>Heroku</strong>
							</li>
						</ul>
					</AccordionItem>
					<AccordionItem title="Development Tools & Workflow">
						<ul className="list-disc ml-6 space-y-4 text-neutral-700">
							<li className="pl-1">
								Component-driven development with
								<strong>Storybook</strong>
							</li>
							<li className="pl-1">
								CI/CD build validation using
								<strong>Azure DevOps Pipelines</strong>
							</li>
							<li className="pl-1">
								Issue tracking and sprint collaboration via
								<strong>JIRA</strong>
							</li>
							<li className="pl-1">
								Debugging and performance analysis with
								<strong>Chrome DevTools</strong>
							</li>
							<li className="pl-1">
								Accessibility auditing using axe
								<strong>DevTools</strong>
							</li>
						</ul>
					</AccordionItem>
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
