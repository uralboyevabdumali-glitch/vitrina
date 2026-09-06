export function getPasswordStrength(password) {
  if (!password) return { level: 0, key: "weak" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { level: 1, key: "weak" };
  if (score <= 4) return { level: 2, key: "good" };
  return { level: 3, key: "strong" };
}

export function formatPrice(price, currency = "so'm") {
  return `${price.toLocaleString("uz-UZ")} ${currency}`;
}
