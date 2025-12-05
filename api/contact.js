// api/contact.js - Vercel serverless function (ESM)

const endpoint = process.env.CONTACT_ENDPOINT;

// Helper to read request body in all cases
async function parseBody(req) {
  if (req.body && Object.keys(req.body).length > 0) {
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => {
      data += chunk;
    });
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (_) {
        const obj = {};
        for (const part of data.split("&")) {
          const [k, v] = part.split("=");
          if (!k) continue;
          obj[decodeURIComponent(k)] = decodeURIComponent(v || "");
        }
        resolve(obj);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  // 1) Only allow POST
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ ok: false, error: "Method Not Allowed", method: req.method });
  }

  // 2) Ensure env var exists
  if (!endpoint) {
    return res
      .status(500)
      .json({ ok: false, error: "Missing CONTACT_ENDPOINT" });
  }

  try {
    const body = await parseBody(req);

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(body)) {
      params.append(key, value == null ? "" : String(value));
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({
        ok: false,
        error: "Apps Script error",
        status: response.status,
        body: text,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, error: err.message || "Unknown error" });
  }
}
