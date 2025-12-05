// api/contact.js - Vercel serverless function

const endpoint = process.env.CONTACT_ENDPOINT;

async function parseBody(req) {
  // If Vercel already parsed JSON:
  if (req.body && Object.keys(req.body).length > 0) {
    return req.body;
  }

  // Otherwise, read raw stream
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => {
      data += chunk;
    });
    req.on("end", () =>  {
      if (!data) return resolve({});
      try  {
        // Try JSON first
        resolve(JSON.parse(data));
      } catch  (_) {
        // Fallback: form-encoded string "a=1&b=2"
        const  obj = {};
        for (const pair of data.split("&")) {
          const [k, v] = pair.split("=");
          if (!k) continue;
          obj[decodeURIComponent(k)] = decodeURIComponent(v || "");
        }
        resolve(obj);
      }
    });
    req.on("error", reject);
  });
}

module.exports = async  (req, res) => {
  // Only allow POST from the frontend
  if (req.method !== "POST") {
    return  res
      .status(405)
      .json({ ok: false, error: "Method Not Allowed" });
  }

  if  (!endpoint) {
    return  res
      .status(500)
      .json({ ok: false, error: "Missing CONTACT_ENDPOINT" });
  }

  try  {
    const body = await parseBody(req);

    // Build URLSearchParams for Apps Script
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(body)) {
      params.append(key, value == null ? "" : String(value));
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers : {
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
  } catch  (err) {
    return  res
      .status(500)
      .json({ ok: false, error: err.message || "Unknown error" });
  }
};
