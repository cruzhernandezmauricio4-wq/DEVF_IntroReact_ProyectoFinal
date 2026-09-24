// Gestión de usuarios en localStorage. Las contraseñas nunca se guardan en
// texto plano: se guarda un hash PBKDF2 con una sal aleatoria por usuario.
// Al ser una app sin backend, esto es una protección básica, no seguridad de
// producción.

const USERS_KEY = "users";
const ITERATIONS = 100_000;

const toHex = (buffer) =>
  Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, "0")).join(
    ""
  );

const fromHex = (hex) =>
  new Uint8Array(hex.match(/.{2}/g).map((byte) => parseInt(byte, 16)));

const hashPassword = async (password, salt) => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
    key,
    256
  );
  return toHex(bits);
};

const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];

const findUser = (username) =>
  getUsers().find((u) => u.username.toLowerCase() === username.toLowerCase());

// Devuelve un mensaje de error, o null si el registro fue exitoso.
export const registerUser = async (username, password) => {
  if (findUser(username)) return "Ese nombre de usuario ya existe.";

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await hashPassword(password, salt);
  const users = [...getUsers(), { username, salt: toHex(salt), hash }];
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return null;
};

// Devuelve el nombre de usuario registrado si las credenciales son correctas,
// o null si no lo son.
export const verifyUser = async (username, password) => {
  const user = findUser(username);
  if (!user) return null;

  const hash = await hashPassword(password, fromHex(user.salt));
  return hash === user.hash ? user.username : null;
};
