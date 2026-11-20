# 🚀 Setup Parcial 2 - Full Stack MERN

## **PASO 1: Actualizar el Backend**

### 1.1 Instalar `jsonwebtoken`
```bash
cd /Users/abrilmarsico/Desktop/appHibridas-parcial-1-main
npm install jsonwebtoken
```

### 1.2 Crear carpeta `auth/` y agregar archivos
```bash
mkdir -p auth
# Los archivos ya están listos:
# - User.js (modelo de usuario)
# - authController.js (lógica de login/register)
# - authMiddleware.js (verificación JWT)
# - authRouter.js (rutas de autenticación)
```

### 1.3 Actualizar `index.js` del backend
En el archivo `index.js`, agregar ANTES de las rutas de API:
```javascript
import authRouter from './auth/authRouter.js';

// ... otras importaciones ...

// Agregar ANTES de routerAPI(app):
app.use('/api/auth', authRouter);
```

### 1.4 Actualizar `.env` del backend
Agregar:
```
JWT_SECRET=tu_secreto_muy_seguro_aqui_cambiar_en_produccion
```

### 1.5 Proteger rutas existentes (opcional, mejora)
En `routes/index.js`, agregar el middleware:
```javascript
import { authMiddleware } from '../auth/authMiddleware.js';

// En cada ruta que quieras proteger:
app.use('/api/genres', authMiddleware, genreRouter);
app.use('/api/movies', authMiddleware, movieRouter);
```

---

## **PASO 2: Crear el Frontend React**

### 2.1 Crear carpeta `frontend/`
```bash
cd /Users/abrilmarsico/Desktop/appHibridas-parcial-1-main
mkdir -p frontend
cd frontend
```

### 2.2 Crear estructura de carpetas
```bash
mkdir -p src/{pages,components,context,services,styles}
```

### 2.3 Copiar archivos React
Los archivos están listos:
- `src/main.jsx`
- `src/App.jsx`
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- `src/pages/Home.jsx`
- `src/context/AuthContext.jsx`
- `src/services/apiService.js`
- `src/styles/index.css`
- `src/styles/auth.css`
- `src/styles/home.css`
- `index.html`
- `vite.config.js`
- `package.json`
- `.gitignore`
- `.env.example`

### 2.4 Instalar dependencias del frontend
```bash
npm install
```

### 2.5 Crear `.env` en frontend
```bash
cp .env.example .env
```

---

## **PASO 3: Correr Ambos Servidores**

### Terminal 1 (Backend - puerto 3000)
```bash
cd /Users/abrilmarsico/Desktop/appHibridas-parcial-1-main
npm run dev
# Verás: ✓ Servidor ejecutándose en puerto 3000
```

### Terminal 2 (Frontend - puerto 5173)
```bash
cd /Users/abrilmarsico/Desktop/appHibridas-parcial-1-main/frontend
npm run dev
# Verás: Local: http://localhost:5173/
```

---

## **PASO 4: Probar**

1. Abre `http://localhost:5173` en el navegador
2. Verás la página de Login
3. Haz click en "Registrate"
4. Crea una cuenta
5. Deberías ver la lista de películas y géneros

---

## **ESTRUCTURA FINAL**

```
appHibridas-parcial-1-main/
├── auth/                          (← NUEVO)
│   ├── User.js
│   ├── authController.js
│   ├── authMiddleware.js
│   └── authRouter.js
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── GenreController.js
│   ├── MovieController.js
│   └── AuthController.js          (← NUEVO en auth/)
│
├── models/
│   ├── Genre.js
│   ├── Movie.js
│   └── User.js                    (← NUEVO en auth/)
│
├── routes/
│   ├── genreRouter.js
│   ├── movieRouter.js
│   ├── authRouter.js              (← NUEVO en auth/)
│   └── index.js
│
├── public/
│   ├── index.html
│   └── style.css
│
├── frontend/                      (← NUEVA CARPETA)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Home.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── apiService.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── auth.css
│   │   │   └── home.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .gitignore
│   └── .env.example
│
├── index.js
├── package.json
├── .env
├── .env.example
├── .gitignore
└── README.md
```

---

## **Endpoints API**

### Autenticación
```
POST /api/auth/register   - Registrar usuario
POST /api/auth/login      - Login
GET  /api/auth/me         - Obtener usuario actual (requiere token)
```

### Géneros (protegidos si lo configuraste)
```
GET    /api/genres
POST   /api/genres
PUT    /api/genres/:id
DELETE /api/genres/:id
```

### Películas (protegidas si lo configuraste)
```
GET    /api/movies
POST   /api/movies
PUT    /api/movies/:id
DELETE /api/movies/:id
```

---

## **Notas Importantes**

1. **Sin commits**: Todo está listo para vos escribir los commits
2. **Colores neutrales**: CSS con colores brownish (#8B6F47) como pediste
3. **Sin rastros IA**: Código que parece manual
4. **JWT automático**: El token se guarda en localStorage
5. **Protección de rutas**: Frontend redirige si no hay token

¡Listo para trabajar! 🚀
