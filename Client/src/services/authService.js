// ─────────────────────────────────────────────
// Centralized API helper for all auth & user requests
// Uses VITE_API_URL from environment — never hardcodes URLs
// ─────────────────────────────────────────────

const API_URL = import.meta.env.VITE_API_URL;

// ================= Register =================
export const registerUser = async ({ name, email, password, role }) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

// ================= Login =================
export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

// ================= Get Profile =================
export const getProfile = async (token) => {
  const res = await fetch(`${API_URL}/api/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
};

// ================= Update Profile =================
export const updateProfile = async (token, profileData) => {
  const res = await fetch(`${API_URL}/api/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data;
};

// ================= Get Dashboard =================
export const getDashboard = async (token) => {
  const res = await fetch(`${API_URL}/api/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch dashboard");
  }

  return data;
};
