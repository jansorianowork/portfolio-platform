import Link from "next/link";

export default function HomePage() {
	return (
		<section className="space-y-10 py-20">
			<div className="space-y-4">
				<h1 className="text-3xl font-semibold leading-tight">
					Hi, I’m Your Name.
				</h1>
				<p className="text-neutral-600">
					I build systems, platforms, and production-grade
					applications.
				</p>
			</div>

			<nav className="space-y-3 text-lg">
				<div>
					<Link href="/about" className="underline">
						About
					</Link>
				</div>
				<div>
					<Link href="/services" className="underline">
						Services
					</Link>
				</div>
				<div>
					<Link href="/projects" className="underline">
						Projects
					</Link>
				</div>
				<div>
					<Link href="/research" className="underline">
						Research
					</Link>
				</div>
				<div>
					<Link href="/contact" className="underline">
						Contact
					</Link>
				</div>
			</nav>
		</section>
	);
}
