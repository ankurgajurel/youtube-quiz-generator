export function api(endpoint: string) {
  return process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1" + endpoint;
}
