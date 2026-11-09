import { fetchCatalog } from "@/lib/off";

// Open Food Facts blocks browser (CORS) requests, so the catalog is fetched at build time and shipped as a static file.
export const dynamic = "force-static";

export async function GET() {
  return Response.json(await fetchCatalog());
}
