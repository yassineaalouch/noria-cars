import { llmsFullText } from "@/lib/seo";

export function GET() {
  return new Response(llmsFullText(), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" }
  });
}
