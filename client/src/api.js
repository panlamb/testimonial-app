const BASE = '/api'

function token() {
  return localStorage.getItem('token')
}

async function request(path, options = {}) {
  const headers = { ...options.headers }
  const t = token()
  if (t) headers['Authorization'] = `Bearer ${t}`
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  auth: {
    register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  },
  dashboard: {
    me: () => request('/dashboard/me'),
    testimonials: () => request('/dashboard/testimonials'),
    updateStatus: (id, status) =>
      request(`/dashboard/testimonials/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
    delete: (id) => request(`/dashboard/testimonials/${id}`, { method: 'DELETE' }),
    updateBranding: (body) => request('/dashboard/branding', { method: 'PUT', body: JSON.stringify(body) }),
    updateWidgetSettings: (body) => request('/dashboard/widget-settings', { method: 'PUT', body: JSON.stringify(body) }),
  },
  collect: {
    getPage: (slug) => request(`/collect/${slug}`),
    submit: (slug, formData) => {
      const headers = {}
      const t = token()
      if (t) headers['Authorization'] = `Bearer ${t}`
      return fetch(`${BASE}/collect/${slug}`, { method: 'POST', headers, body: formData })
        .then((r) => r.json())
        .then((data) => { if (data.error) throw new Error(data.error); return data })
    },
  },
  wall: {
    get: (slug) => request(`/wall/${slug}`),
  },
}
