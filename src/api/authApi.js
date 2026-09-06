import api from "./client";

export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function checkDuplicate({ login, email }) {
  const users = await getUsers();
  const loginExists = users.some(
    (u) => u.login.toLowerCase() === login.toLowerCase()
  );
  const emailExists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  return { loginExists, emailExists };
}

export async function registerUser(userData) {
  const { loginExists, emailExists } = await checkDuplicate(userData);
  if (loginExists) throw new Error("LOGIN_EXISTS");
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
      (u.login.toLowerCase() === login.toLowerCase() ||
        u.email.toLowerCase() === login.toLowerCase()) &&
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
