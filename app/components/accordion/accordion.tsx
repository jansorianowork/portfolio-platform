import React, { useState, ReactNode } from "react";

// minimal accordion component
export function AccordionItem({
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
