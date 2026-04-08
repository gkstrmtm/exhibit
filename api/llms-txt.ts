import { buildLlmsText } from "../server/llms.js";

export default async function handler(_req: any, res: any) {
  try {
    const txt = await buildLlmsText();
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(txt);
  } catch {
    res.status(500).send("# EXHIBIT\nFailed to generate index.");
  }
}