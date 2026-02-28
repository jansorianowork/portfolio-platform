import "./globals.css";

export const metadata = {
	title: "Jan Vincent Soriano | Software Developer",
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
					<div className="flex-1 px-6">
						<div className="max-w-2xl mx-auto">{children}</div>
						<div />
					</div>
				</div>
			</body>
		</html>
	);
}
