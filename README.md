# 🧩 Git Masters — Frontend

## 📘 Descripción
Este proyecto corresponde a la **interfaz de usuario de Git Masters**, desarrollada con **React + Vite**.  
El frontend consume los servicios REST del backend (`Node.js + Express`) y gestiona toda la interacción del usuario:  
autenticación, estadísticas, eventos, rankings, reglas de puntos y más.

Incluye manejo robusto de errores, validaciones, paginación, filtros, estados de carga,  
y control centralizado de sesión mediante **Context API**.

---

## ⚙️ Tecnologías principales
- ⚛️ **React 18** (con Vite)
- 🧭 **React Router DOM** (v6)
- 🔄 **Axios** con `withCredentials: true`
- 🎨 **Sass (SCSS)** modular
- 🧠 **Context API**
- 🧩 **Hooks personalizados (useDebouncedValue, useAuth, etc.)**
- 🧹 **ESLint + SonarLint** (calidad del código)
- 🔔 **React Toastify** (notificaciones de éxito/error)
- ⚙️ **Vite Environment Variables**

---

## 🧰 Requisitos previos
Asegúrese de tener instalado:
- **Node.js 18+**
- **npm** o **yarn**
- Backend ejecutándose en `http://localhost:3000`

---

## 🚀 Instalación

1. Clonar el repositorio y acceder a la carpeta del frontend:
   cd frontend
Instalar dependencias:
npm install
Crear un archivo .env en la raíz del frontend con el contenido:

VITE_BACKEND_URL=http://localhost:3000
💻 Ejecución en entorno de desarrollo
Inicie el servidor de desarrollo con:
npm run dev
Por defecto, la aplicación se ejecuta en:
👉 http://localhost:5173

🧩 Estructura del proyecto
css
src/
 ├─ assets/
 ├─ components/
 │   ├─ Footer.jsx
 │   ├─ Loader.jsx
 │   ├─ Navbar.jsx
 │   └─ ProtectedRoute.jsx
 │
 ├─ context/
 │   ├─ AuthContext.jsx
 │   └─ ThemeContext.jsx
 │
 ├─ hooks/
 │   ├─ useDebouncedValue.js
 │   └─ useAuth.js
 │
 ├─ modules/
 │   ├─ auth/
 │   ├─ badges/
 │   ├─ dashboard/
 │   ├─ events/
 │   ├─ leaderboard/
 │   ├─ profile/
 │   ├─ rankings/
 │   ├─ rules-points/
 │   └─ statistics/
 │       ├─ components/
 │       ├─ hooks/
 │       └─ pages/
 │
 ├─ routes/
 │   └─ AppRoutes.jsx
 │
 ├─ services/
 │   ├─ api.js
 │   └─ endpoints.js
 │
 ├─ styles/
 │   ├─ base/
 │   ├─ components/
 │   ├─ pages/
 │   └─ main.scss
 │
 ├─ utils/
 │   └─ index.js
 │
 ├─ App.jsx
 ├─ main.jsx
 ├─ App.css
 └─ index.css
📜 Scripts disponibles
Comando	Descripción
npm run dev	Inicia el servidor de desarrollo
npm run build	Crea la build para producción
npm run preview	Previsualiza la build
npm run lint	Ejecuta ESLint para verificar la calidad del código

🧭 Enrutamiento
El enrutamiento principal se gestiona desde:
src/routes/AppRoutes.jsx
Usando React Router DOM.
Todas las rutas protegidas pasan por ProtectedRoute.jsx, que consulta el AuthContext.

🔐 Contextos globales
Contexto	Descripción
AuthContext	Maneja sesión de usuario, login/logout, token y protección de rutas.
ThemeContext	Controla el tema global (modo claro/oscuro).

🌍 Servicios HTTP
Las peticiones HTTP se centralizan en:
src/services/
 ├─ api.js         # Configuración base de Axios (withCredentials, baseURL)
 └─ endpoints.js   # Definición de rutas del backend
Incluye manejo automático de errores:

401: logout automático (AuthContext.logout())

403: “No tienes permisos”

409: mensajes de conflicto del servidor

500: “Error interno, reintentar”

🎨 Estilos
El proyecto utiliza Sass (SCSS) modular:

Carpeta	Contenido
base/	Variables globales, resets, tipografía
components/	Estilos de componentes reutilizables
pages/	Estilos específicos de cada vista

Todos los estilos se importan en src/styles/main.scss.

✅ Hitos implementados
1. Estructura base y normalización
SCSS moderno con modern-normalize.

Variables y mixins globales.

Reset y diseño responsivo.

2. Auth + Protected Routes
Login, logout y persistencia con cookies.

Rutas privadas mediante ProtectedRoute.jsx.

3. Dashboard y Navbar dinámico
Muestra nombre de usuario y navegación según permisos.

Estado global de autenticación.

4. Integración API REST
Axios configurado con withCredentials: true.

Centralización de endpoints.

Fetch automático de datos y loaders globales.

5. Manejo visual de estados
Loader y EmptyState integrados.

Toasts para éxito/error.

6. Puntos, rankings y estadísticas
Componentes PointsSummary, LeaderboardPage y StatisticsPage completos.

Actualización automática tras mutaciones.

7. Formularios y validaciones robustas
Validación cliente: campos vacíos, longitud máxima.

Botones deshabilitados durante submit.

Confirmación de acciones destructivas.

Manejo detallado de errores HTTP (400–500).

Toasts y mensajes inline de éxito.

8. Paginación, filtros y debounce
Eventos y Rankings con:

Filtros por usuario, repositorio, tipo, acción y fecha.

Debounce (300 ms).

Paginación con page, limit (20/50).

Botones Prev/Next y total dinámico.

9. Debugging checklist & troubleshooting
Incluido al final de este documento 👇

🧪 Debugging checklist & troubleshooting
🔍 Comprobaciones iniciales
Backend:

Asegúrate de que está corriendo en http://localhost:3000

Swagger accesible en http://localhost:3000/api-docs

Frontend:

Ejecuta npm run dev

Verifica que carga en http://localhost:5173

🔐 Autenticación
Tras iniciar sesión, abre DevTools → Network y revisa la respuesta del login:

Debe incluir Set-Cookie: token.

Si no aparece cookie, revisar logs del backend.

🌐 CORS
En backend:

Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
En frontend: Axios debe tener withCredentials: true.

🚨 Fallos de API
Revisa en DevTools → Network:

¿La cookie se envía con la petición?

¿El status code corresponde?

Interpretación rápida:

400: validación del campo → mostrar error en el formulario.

401: token inválido → AuthContext.logout().

403: permisos insuficientes.

409: conflicto (“Ya perteneces a un equipo”).

500: error interno → “Reintentar más tarde”.

🔁 Datos no actualizan tras una mutación
Asegúrate de refrescar el endpoint afectado o actualizar el estado local.

Verifica los cambios en Prisma Studio o Postgres.

⚙️ Race conditions
Usa flags mounted en useEffect.

Cancela llamadas Axios en desmontaje o cambio rápido de filtros.

🧰 Herramientas recomendadas
React DevTools

Postman / Thunder Client

Prisma Studio

Browser DevTools → Network tab

📦 Build para producción
npm run build
npm run preview
Esto genera la carpeta dist/ lista para desplegar.
