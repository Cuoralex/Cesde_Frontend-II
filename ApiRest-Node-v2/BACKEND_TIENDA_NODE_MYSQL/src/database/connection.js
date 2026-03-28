const mysql = require("mysql2/promise")
require("dotenv").config()

async function initDatabase() {
  try {

    // Crear conexion sin base de datos para poder crearla
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      port: process.env.DB_PORT || 3306
    })

    console.log("Conectado a MySQL")

    // Crear base de datos
    await connection.query(`
      CREATE DATABASE IF NOT EXISTS inventario_db
    `)

    console.log("Base de datos verificada")

    // Usar la base de datos
    await connection.query(`
      USE inventario_db
    `)

    // Crear tabla usuarios
    await connection.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        rol ENUM('admin','vendedor') DEFAULT 'vendedor'
      )
    `)

    // Crear tabla productos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100),
        precio DECIMAL(10,2),
        stock INT,
        creado_por INT,
        FOREIGN KEY (creado_por) REFERENCES usuarios(id)
      )
    `)

    console.log("Tablas creadas correctamente")

    await connection.end()

    console.log("Base de datos inicializada correctamente")

  } catch (error) {
    console.error("Error inicializando DB:", error)
  }
}

initDatabase()