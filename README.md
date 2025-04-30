# 🛠️ Backend Lab Nest - Materiales y Proyectos

Este proyecto es un backend construido con **NestJS + PostgreSQL + TypeORM** para la gestión de materiales, unidades, proyectos y sus relaciones.

---

## 🚀 Cómo iniciar el proyecto desde cero

### 1. Apaga y elimina volúmenes anteriores (base de datos incluida):

```bash
sudo docker-compose down -v && sudo rm -r ./postgres-data/
```

> ⚠️ Este comando borra completamente la base de datos. Úsalo solo si deseas empezar desde cero.

### 2. Levanta los contenedores de Docker:

```bash
docker-compose up -d
```

Esto iniciará PostgreSQL y cualquier otro servicio definido.

### 3. Corre las migraciones para crear las tablas:

```bash
npm run db:migrate:run
```

### 4. Inserta datos iniciales (unidades, materiales, estados, ciudades, proyectos):

```bash
npm run db:seed
```

---

## ✅ Endpoints disponibles

Una vez en ejecución, accede a la documentación Swagger para probar los endpoints:

📄 `http://localhost:3000/docs`

---

## 📦 Requisitos previos

- [Node.js](https://nodejs.org/) (v18+ recomendado)
- [Docker y Docker Compose](https://docs.docker.com/)
- `npm` o `yarn`