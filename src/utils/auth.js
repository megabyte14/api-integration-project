export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export const saveAuth = (data) => {
  console.log("Saving user:", data.user);

  if (data?.token) {
    localStorage.setItem("token", data.token);
  }

  if (data?.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const roleHome = (role) => {
  switch (role?.toLowerCase()) {
    case "admin":
      return "/admin";
    case "vendor":
      return "/vendor";
    case "seller":
      return "/seller";
    default:
      return "/login";
  }
};

