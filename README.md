# Mi Twitter Clon

Clon simplificado de Twitter hecho con React y Vite. Permite iniciar sesión, ver una línea de tiempo de tweets, publicar tweets, darles "me gusta" y ver un perfil con los tweets propios. Todo se guarda en `localStorage`.

## Funcionalidades

- **Registro e inicio de sesión:** con usuario y contraseña; la sesión persiste entre recargas.
- **Contraseñas con hash:** nunca se guardan en texto plano (PBKDF2 con sal aleatoria por usuario, vía Web Crypto API).
- **Línea de tiempo:** publicar tweets y dar "me gusta" (solo con sesión iniciada para publicar).
- **Perfil:** página protegida que muestra el usuario y sus tweets. Sin sesión, redirige a `/login`.
- **Persistencia:** usuario y tweets se guardan en `localStorage`.

## Tecnologías

- React 19 (componentes funcionales, `useState`, `useEffect`)
- React Router (`react-router-dom`) para rutas y redirección
- Vite como herramienta de build
- Oxlint para el análisis estático

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Otros comandos:

```bash
npm run build    # build de producción
npm run preview  # previsualizar el build
npm run lint     # análisis estático con Oxlint
```

## Estructura

```
src/
├── components/
│   ├── Tweet.jsx        # un tweet con su botón de "me gusta"
│   ├── TweetList.jsx    # lista de tweets
│   └── TweetForm.jsx    # formulario para publicar
├── pages/
│   ├── Home.jsx         # línea de tiempo
│   ├── Login.jsx        # formulario de inicio de sesión
│   ├── Register.jsx     # formulario de registro
│   └── Profile.jsx      # perfil (ruta protegida)
├── utils/
│   └── auth.js          # registro y verificación de usuarios (hash de contraseñas)
├── App.jsx              # rutas y estado de autenticación
├── main.jsx
└── index.css
```

## Rutas

| Ruta       | Página  | Acceso                                  |
| ---------- | ------- | --------------------------------------- |
| `/`        | Home    | Público (publicar requiere sesión)      |
| `/login`   | Login   | Público (con sesión, redirige a `/`)    |
| `/register`| Register| Público (con sesión, redirige a `/`)    |
| `/profile` | Profile | Solo autenticados; si no, va a `/login` |

## Datos en `localStorage`

- `users`: arreglo de `{ username, salt, hash }`, los usuarios registrados (sin contraseña en texto plano).
- `user`: `{ "username": "..." }`, el usuario con sesión iniciada.
- `tweets`: arreglo de `{ id, text, likes, author }`.

## Notas de diseño

- El estado inicial de `user` y `tweets` se lee de `localStorage` dentro de `useState(() => ...)` en lugar de un `useEffect`. Así, al recargar en una ruta protegida el usuario ya está disponible (no hay redirección falsa a `/login`) y, bajo `StrictMode`, el efecto que guarda los tweets no sobrescribe los datos guardados con un arreglo vacío.
- Los archivos con JSX usan extensión `.jsx`, ya que Vite no procesa JSX en archivos `.js`.
- Es un proyecto educativo sin backend: el hash de contraseñas evita guardarlas en claro, pero `localStorage` es accesible desde el navegador y la protección de rutas solo existe en la interfaz. Un sistema real necesitaría un servidor que valide las credenciales y la sesión.
