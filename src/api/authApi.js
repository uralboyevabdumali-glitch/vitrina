import api from "./client";
import seedData from "../../db.json";

export async function getUsers() {
  try {
    const { data } = await api.get("/users");
    return Array.isArray(data) ? data : seedData.users;
  } catch {
    return seedData.users;
  }
}

export async function checkDuplicate({ email }) {
  const users = await getUsers();
  const emailExists = users.some(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );
  return { emailExists };
}

export async function registerUser(userData) {
  const { emailExists } = await checkDuplicate(userData);
  if (emailExists) throw new Error("EMAIL_EXISTS");

  const { data } = await api.post("/users", {
    ...userData,
    role: "Mijoz",
  });
  return data;
}

export async function loginUser({ login, password }) {
  const users = await getUsers();
  const user = users.find(
    (u) =>
      (u.login?.toLowerCase() === login.toLowerCase() ||
        u.email?.toLowerCase() === login.toLowerCase()) &&
      u.password === password
  );
  if (!user) throw new Error("INVALID_CREDENTIALS");
  const { password: _, ...safeUser } = user;
  return safeUser;
}

export async function updatePassword(userId, newPassword) {
  const { data } = await api.patch(`/users/${userId}`, { password: newPassword });
  return data;
}
