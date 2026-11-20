# API RESTful de Películas - Parcial 2

## Información del Proyecto

**Alumnos:** Cusinier Candela, Marsico Abril  
**Materia:** Aplicaciones Híbridas  
**Docente:** CRUZ, Jonathan Emanuel  
**Comisión:** DWN4AV

## Descripción

Aplicación Full Stack MERN (MongoDB, Express, React, Node.js) que implementa un sistema de gestión de películas con autenticación JWT, validaciones en frontend y backend, y gestión de usuarios.

## Requisitos Cumplidos

- ✅ Separación del Backend y Frontend (REST API)
- ✅ Autenticación con JWT
- ✅ Base de datos MongoDB
- ✅ Gestión de Usuarios (registro, login)
- ✅ 2 entidades adicionales: Películas y Géneros
- ✅ CRUD completo para todas las entidades
- ✅ React con Hooks, Context API, React Router
- ✅ Separación clara entre vistas y lógica de APIs
- ✅ Validaciones en Backend y Frontend
- ✅ Rutas protegidas

## Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **JWT (jsonwebtoken)** - Autenticación
- **bcrypt** - Hash de contraseñas
- **CORS** - Seguridad de solicitudes
- **Chalk** - Colores en consola

### Frontend
- **React** - Librería UI
- **React Router** - Navegación
- **Context API** - Gestión de estado
- **Axios** - Cliente HTTP
- **Vite** - Build tool

## Estructura del Proyecto

```
appHibridas-parcial-1-main/
├── backend/
│   ├── auth/
│   │   ├── User.js (Modelo)
│   │   ├── authController.js
│   │   ├── authMiddleware.js
│   │   └── authRouter.js
│   ├── models/
│   │   ├── Genre.js
│   │   └── Movie.js
│   ├── controllers/
│   │   ├── GenreController.js
│   │   └── MovieController.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── genreRouter.js
│   │   └── movieRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── index.js (Servidor principal)
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── apiService.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── auth.css
│   │   │   └── home.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── README.md
├── .gitignore
└── .env.example
```

## Instalación y Ejecución

### Requisitos Previos
- Node.js v18 o superior
- MongoDB (local o Atlas)
- npm o yarn

### Instalación del Backend

1. Navega a la carpeta del proyecto:
```bash
cd /path/to/appHibridas-parcial-1-main
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Configura tu `MONGO_URI` y `JWT_SECRET` en el archivo `.env`

5. Inicia el servidor:
```bash
npm run dev
```

El backend se ejecutará en `http://localhost:3000`

### Instalación del Frontend

1. Navega a la carpeta frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

El frontend se ejecutará en `http://localhost:5173`

## Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener datos del usuario (protegido)

### Películas
- `GET /api/movies` - Obtener todas las películas
- `GET /api/movies/:id` - Obtener película por ID
- `POST /api/movies` - Crear película (protegido)
- `PUT /api/movies/:id` - Actualizar película (protegido, solo propietario)
- `DELETE /api/movies/:id` - Eliminar película (protegido, solo propietario)

### Géneros
- `GET /api/genres` - Obtener todos los géneros
- `GET /api/genres/:id` - Obtener género por ID
- `POST /api/genres` - Crear género (protegido)
- `PUT /api/genres/:id` - Actualizar género (protegido)
- `DELETE /api/genres/:id` - Eliminar género (protegido)

## Características Principales

### Autenticación
- Registro de usuarios con validación de email y contraseña
- Login con JWT
- Contraseñas hasheadas con bcrypt
- Rutas protegidas que requieren JWT

### Películas
- CRUD completo
- Solo el propietario puede editar/eliminar sus películas
- Validaciones en backend y frontend
- Relación con usuarios (createdBy)
- Timestamps automáticos

### Géneros
- CRUD completo
- Gestión centralizada de géneros
- Relación con películas

### Frontend
- Interfaz responsive
- Autenticación mediante Context API
- Interceptores de Axios para incluir JWT automáticamente
- Validaciones en formularios
- Rutas protegidas

## Validaciones

### Backend
- Email único y validado
- Contraseña mínimo 6 caracteres
- Campos obligatorios en películas y géneros
- Autorización: solo propietarios pueden editar/eliminar

### Frontend
- Campos requeridos en formularios
- Validación de email
- Validación de contraseña
- Mensajes de error claros

## Uso de la Aplicación

1. Registra una cuenta
2. Inicia sesión
3. En la página Home puedes:
   - Ver películas y géneros
   - Crear nuevas películas (si estás autenticado)
   - Editar/eliminar tus propias películas
   - Ver información del usuario

## Notas de Desarrollo

- El proyecto usa ES6 modules
- CORS está configurado para desarrollo local
- Las contraseñas se hashean automáticamente con bcrypt
- JWT se almacena en localStorage del cliente
- El interceptor de Axios añade el JWT automáticamente a cada solicitud
- Node.js en modo watch para desarrollo (reinicia automáticamente con cambios)

## Contacto

Para preguntas o problemas, contactar a los alumnos de la comisión DWN4AV.
