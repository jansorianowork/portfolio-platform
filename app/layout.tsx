import "./globals.css";
import Link from "next/link";

export const metadata = {
	title: "Your Name",
	description: "Portfolio",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-white text-neutral-900">
				<div className="min-h-screen flex flex-col">
					{/* Header */}
					<header className="px-6 py-6">
						<div className="max-w-2xl mx-auto flex justify-between items-center">
							<Link href="/" className="font-medium">
								Your Name
							</Link>
							<Link href="/about" className="text-sm ">
								About
							</Link>
							<Link href="/contact" className="text-sm ">
								Contact
							</Link>
						</div>
					</header>

					{/* Main */}
					<main className="flex-1 px-6">
						<div className="max-w-2xl mx-auto">{children}</div>
					</main>

					{/* Footer */}
					<footer className="px-6 py-10 text-sm text-neutral-500">
						<div className="max-w-2xl mx-auto">
							© {new Date().getFullYear()} Your Name
						</div>
					</footer>
				</div>
			</body>
		</html>
	);
}
