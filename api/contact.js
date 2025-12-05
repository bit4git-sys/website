module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' });
    return;
  }

  const endpoint = process.env.CONTACT_ENDPOINT || process.env.VITE_CONTACT_ENDPOINT;
  if (!endpoint) {
    res.status(500).json({ ok: false, error: 'Missing CONTACT_ENDPOINT' });
    return;
  }

  let body = {};
  try {
    if (req.body && typeof req.body === 'object') {
      body = req.body;
    } else {
      const raw = await new Promise((resolve) => {
        let data = '';
        req.on('data', (chunk) => (data += chunk));
        req.on('end', () => resolve(data));
      });
      const ct = req.headers['content-type'] || '';
      if (ct.includes('application/json')) {
        body = JSON.parse(raw || '{}');
      } else if (ct.includes('application/x-www-form-urlencoded')) {
        const usp = new URLSearchParams(raw);
        usp.forEach((v, k) => (body[k] = v));
      }
    }
  } catch {}

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
    await fetch(endpoint, { method: 'POST', body: params });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'Forwarding failed' });
  }
};
