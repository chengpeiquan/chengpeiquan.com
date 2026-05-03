const FORWARDED_HOST_HEADER = 'x-forwarded-host'
const FORWARDED_PORT_HEADER = 'x-forwarded-port'

export const getExternalForwardedHeaders = (headers: Headers): Headers => {
  const forwardedHeaders = new Headers(headers)
  const forwardedHost = forwardedHeaders.get(FORWARDED_HOST_HEADER)

  // `next-intl` uses `x-forwarded-host` and `x-forwarded-port` to build
  // redirect URLs. When a reverse proxy forwards the public host together
  // with an internal Docker port, locale redirects can leak URLs like
  // `https://chengpeiquan.com:4936/...`.
  // See:
  // - https://github.com/amannn/next-intl/pull/2281
  // - https://github.com/amannn/next-intl/issues/987
  if (forwardedHost && !forwardedHost.includes(':')) {
    forwardedHeaders.delete(FORWARDED_PORT_HEADER)
  }

  return forwardedHeaders
}
