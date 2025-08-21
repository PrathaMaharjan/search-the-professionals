import axiosInstance from "./axiosInstance";

// 🔹 Auth
export const loginApi = (data: { username: string; password: string }) => {
  return axiosInstance.post("/auth/login", data);
};

export const registerApi = (data: { email: string; username: string; role: string; password: string }) => {
  return axiosInstance.post("/auth/register", data);
};

// 🔹 User List
export const getUserListApi = () => {
  return axiosInstance.get("/user/list");
};

// 🔹 Search User
export const searchUserApi = (username?: string, role?: string) => {
  let query = "";

  if (username && username.trim() !== "") {
    query += `username=${encodeURIComponent(username)}`;
  }
  if (role && role.trim() !== "") {
    query += query ? `&role=${encodeURIComponent(role)}` : `role=${encodeURIComponent(role)}`;
  }

  return axiosInstance.get(`/user/search?${query}`);
};

// 🔹 Get user by ID
export const getUserByIdApi = (id: string) => {
  return axiosInstance.get(`/user/${id}`);
};

// 🔹 Upload profile picture
export const uploadProfilePictureApi = (formData: FormData) => {
  return axiosInstance.patch("/user/uploadProfilePicture", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
