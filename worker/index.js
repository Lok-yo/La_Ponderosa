const KNOWN_ROUTES = new Set(['/', '/cortes', '/calculadora', '/nosotros', '/contacto'])

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function addAbsoluteMetadata(html, requestUrl) {
  const url = new URL(requestUrl)
  const canonicalPath = KNOWN_ROUTES.has(url.pathname) ? url.pathname : '/'
  const canonicalUrl = escapeAttribute(`${url.origin}${canonicalPath}`)
  const imageUrl = escapeAttribute(`${url.origin}/og.png`)

  return html
    .replaceAll('content="/og.png"', `content="${imageUrl}"`)
    .replace('"image": "/og.png"', `"image": "${imageUrl}"`)
    .replace(
      '</head>',
      `    <link rel="canonical" href="${canonicalUrl}" />\n` +
        `    <meta property="og:url" content="${canonicalUrl}" />\n  </head>`
    )
}

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    const contentType = response.headers.get('content-type') || ''

    if (!contentType.includes('text/html')) return response

    const headers = new Headers(response.headers)
    headers.delete('content-length')
    headers.delete('etag')

    return new Response(addAbsoluteMetadata(await response.text(), request.url), {
      status: response.status,
      statusText: response.statusText,
      headers
    })
  }
}
