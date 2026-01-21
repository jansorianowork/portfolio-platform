"use client";

import { useEffect, useState } from "react";

const ADMIN_GITHUB_LOGINS = ["jansorianowork"];

interface AdminAuthState {
	loading: boolean;
	user: {
		userDetails: string;
		identityProvider: string;
		userId: string;
	} | null;
	allowed: boolean;
	error: string | null;
}

export default function AdminPage() {
	const [state, setState] = useState<AdminAuthState>({
		loading: true,
		user: null,
		allowed: false,
		error: "Auth Error",
	});
	useEffect(() => {
		(async () => {
			try {
				const res = await fetch("/.auth/me");
				if (!res.ok) throw new Error("Not authenticated");
				const data = await res.json();

				// SWA returns an array of identities
				const clientPrincipal = data?.clientPrincipal;
				const userDetails = clientPrincipal?.userDetails || ""; // often "github:username" or email-like
				const identityProvider =
					clientPrincipal?.identityProvider || "";
				const userId = clientPrincipal?.userId || "";

				// Derive a “login” string we can compare (best-effort)
				const normalized = String(userDetails).toLowerCase();
				const allowed = ADMIN_GITHUB_LOGINS.some((u) =>
					normalized.includes(u.toLowerCase()),
				);

				setState({
					loading: false,
					user: { userDetails, identityProvider, userId },
					allowed,
					error: null,
				});
			} catch (e) {
				const error = e instanceof Error ? e.message : "Auth error";
				setState({
					loading: false,
					user: null,
					allowed: false,
					error: error || "Auth error",
				});
			}
		})();
	}, []);

	if (state.loading) return <div className="p-8">Loading…</div>;

	if (state.error) {
		return (
			<div className="p-8 space-y-4">
				<h1 className="text-xl font-semibold">Admin</h1>
				<p className="text-sm text-muted-foreground">
					You’re not logged in.
				</p>
				<a className="underline" href="/.auth/login/github">
					Login with GitHub
				</a>
			</div>
		);
	}

	if (!state.allowed) {
		return (
			<div className="p-8 space-y-2">
				<h1 className="text-xl font-semibold">Access denied</h1>
				<p className="text-sm text-muted-foreground">
					Your account is authenticated but not allowed to access this
					admin panel.
				</p>
				<pre className="text-xs p-3 rounded-md bg-neutral-100 overflow-auto">
					{JSON.stringify(state.user, null, 2)}
				</pre>
				<a className="underline" href="/.auth/logout">
					Logout
				</a>
			</div>
		);
	}

	return (
		<div className="p-8 space-y-4">
			<h1 className="text-2xl font-semibold">Admin Panel</h1>
			<p className="text-sm text-muted-foreground">
				Logged in as:{" "}
				<span className="font-medium">{state?.user?.userDetails}</span>
			</p>

			<div className="rounded-lg border p-4">
				<h2 className="font-medium">Next steps</h2>
				<ul className="list-disc ml-5 text-sm mt-2 space-y-1">
					<li>Create Notes CRUD (Cosmos DB)</li>
					<li>Create Experience CRUD (Cosmos DB)</li>
					<li>View resume download leads</li>
				</ul>
			</div>

			<a className="underline text-sm" href="/.auth/logout">
				Logout
			</a>
		</div>
	);
}
