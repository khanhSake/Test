export default async function handler(req, res) {
  const backend = process.env.BACKEND_URL;

  if (!backend) {
    return res.status(500).json({
      ok: false,
      error: "BACKEND_URL is not set"
    });
  }

  try {
    const response = await fetch(
      `${backend.replace(/\/$/, "")}/health`
    );

    const data = await response.json();

    return res.status(response.status).json({
      ok: response.ok,
      vercel: "online",
      backend: data
    });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      vercel: "online",
      backend: "unreachable",
      error: error.message
    });
  }
}
