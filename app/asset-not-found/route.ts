// Target of the afterFiles rewrite in next.config.ts for missing root assets.
export function GET() {
  return new Response("Not Found", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}
