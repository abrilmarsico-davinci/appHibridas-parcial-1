# Instrucciones para hacer el Commit

## Paso 1: Agrega todos los archivos al staging area

```bash
git add .
```

## Paso 2: Verifica qué archivos se van a commitear

```bash
git status
```

Deberías ver archivos modificados y nuevos listos para ser commiteados.

## Paso 3: Haz el commit con este mensaje:

```bash
git commit -m "Parcial 2: MERN Stack - Sistema de gestión de películas con autenticación JWT

- Backend: REST API con Express y MongoDB
- Autenticación: JWT con bcrypt para contraseñas
- Modelos: User, Movie, Genre con relaciones
- CRUD completo para películas y géneros
- Rutas protegidas con middleware de autenticación
- Frontend: React con Context API y React Router
- Validaciones en backend y frontend
- Interceptor de Axios para incluir JWT automáticamente
- Rutas protegidas en frontend
- Interfaz responsive con CSS limpio
- .gitignore y .env.example incluidos
- README con instrucciones completas"
```

## Paso 4: Push a GitHub

```bash
git push origin main
```

---

## Archivos que se incluyen en el commit:

✅ Backend completo:
- auth/ (User.js, authController.js, authMiddleware.js, authRouter.js)
- models/ (Genre.js, Movie.js)
- controllers/ (GenreController.js, MovieController.js)
- routes/ (index.js, genreRouter.js, movieRoutes.js)
- config/ (db.js)
- index.js
- package.json
- .env.example (SIN .env real)

✅ Frontend completo:
- src/ (context/, pages/, services/, styles/, App.jsx, main.jsx)
- package.json

✅ Archivos de proyecto:
- .gitignore (nuevo)
- .env.example (nuevo)
- README.md (actualizado)

❌ NO se incluyen:
- node_modules/ (en .gitignore)
- .env (en .gitignore)
- frontend/node_modules/ (en .gitignore)
- .DS_Store (en .gitignore)

---

## ¡Listo! 🚀

Tu proyecto MERN está completo y listo para ser commiteado.
