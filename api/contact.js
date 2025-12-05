export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' });
    return;
  }

  const endpoint = process.env.CONTACT_ENDPOINT || process.env.VITE_CONTACT_ENDPOINT;
  if (!endpoint) {
    res.status(500).json({ ok: false, error: 'Missing CONTACT_ENDPOINT' });
    return;
  }

  const body = req.body || {};
  const payload = {
    name: body.name || '',
    email: body.email || '',
    phone: body.phone || '',
    service: body.service || '',
    message: body.message || '',
    source: body.source || 'contact',
    path: body.path || ''
  };

  try {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([k, v]) => params.append(k, String(v ?? '')));
    await fetch(endpoint, {
      method: 'POST',
      body: params
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'Forwarding failed' });
  }
}
