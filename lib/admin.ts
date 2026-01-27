const ADMINS = ["jansorianowork"];

export function assertAdminFromSwaHeaders(req: Request) {
  // SWA often forwards identity in headers; shape can vary.
  // We’ll use a robust check: try multiple headers and do a substring match.
  const candidates = [
    req.headers.get("x-ms-client-principal-name"),
    req.headers.get("x-ms-client-principal"),
    req.headers.get("x-ms-client-principal-id"),
  ]
    .filter(Boolean)
    .map((v) => String(v).toLowerCase());

  const ok = ADMINS.some((u) => candidates.some((c) => c.includes(u.toLowerCase())));
  if (!ok) {
    throw new Error("Unauthorized");
  }
}
