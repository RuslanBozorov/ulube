// Development: Vite proxy handles /api → backend
// Production: set VITE_API_URL in environment variables
const BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";

const getToken = () => localStorage.getItem("admin_token");

export const apiRequest = async (path, method = "GET", body = null) => {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  }

  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json?.data !== undefined ? json.data : json;
};

export const uploadImage = async (file) => {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json?.data !== undefined ? json.data : json;
};
