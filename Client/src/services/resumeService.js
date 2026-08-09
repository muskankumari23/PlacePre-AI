// ─────────────────────────────────────────────
// Resume API Service
// All resume-related API calls for the frontend.
// Uses VITE_API_URL — never hardcodes URLs.
// All requests include JWT in Authorization header.
// ─────────────────────────────────────────────

const API_URL = import.meta.env.VITE_API_URL;

// ─── Helper: build auth headers ───
const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// ─── Helper: handle response ───
const handleResponse = async (res) => {
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

// ================= Create Resume =================
export const createResume = async (token, resumeData) => {
  const res = await fetch(`${API_URL}/api/resume`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(resumeData),
  });
  return handleResponse(res);
};

// ================= Get Resume =================
export const getResume = async (token) => {
  const res = await fetch(`${API_URL}/api/resume`, {
    method: "GET",
    headers: authHeaders(token),
  });
  return handleResponse(res);
};

// ================= Update Resume =================
export const updateResume = async (token, resumeData) => {
  const res = await fetch(`${API_URL}/api/resume`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(resumeData),
  });
  return handleResponse(res);
};

// ================= Delete Resume =================
export const deleteResume = async (token) => {
  const res = await fetch(`${API_URL}/api/resume`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handleResponse(res);
};

// ================= Education =================
export const addEducation = async (token, educationData) => {
  const res = await fetch(`${API_URL}/api/resume/education`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(educationData),
  });
  return handleResponse(res);
};

export const updateEducation = async (token, id, educationData) => {
  const res = await fetch(`${API_URL}/api/resume/education/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(educationData),
  });
  return handleResponse(res);
};

export const deleteEducation = async (token, id) => {
  const res = await fetch(`${API_URL}/api/resume/education/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handleResponse(res);
};

// ================= Experience =================
export const addExperience = async (token, experienceData) => {
  const res = await fetch(`${API_URL}/api/resume/experience`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(experienceData),
  });
  return handleResponse(res);
};

export const updateExperience = async (token, id, experienceData) => {
  const res = await fetch(`${API_URL}/api/resume/experience/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(experienceData),
  });
  return handleResponse(res);
};

export const deleteExperience = async (token, id) => {
  const res = await fetch(`${API_URL}/api/resume/experience/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handleResponse(res);
};

// ================= Projects =================
export const addProject = async (token, projectData) => {
  const res = await fetch(`${API_URL}/api/resume/project`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(projectData),
  });
  return handleResponse(res);
};

export const updateProject = async (token, id, projectData) => {
  const res = await fetch(`${API_URL}/api/resume/project/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(projectData),
  });
  return handleResponse(res);
};

export const deleteProject = async (token, id) => {
  const res = await fetch(`${API_URL}/api/resume/project/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handleResponse(res);
};

// ================= Download PDF =================
// Returns a Blob — caller should create an object URL and trigger download
export const downloadResumePDF = async (token) => {
  const res = await fetch(`${API_URL}/api/resume/download`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to generate PDF");
  }

  return res.blob();
};
