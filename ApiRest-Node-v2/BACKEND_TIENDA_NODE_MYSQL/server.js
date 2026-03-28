const express = require("express")
const cors = require("cors")
require("dotenv").config()

// Base de datos
const connection = require("./src/database/connection")
const { initializeDatabase } = require("./src/database/init")

// DEBUG connection: ahora mostrará el contenido correcto una vez exportado
console.log("DEBUG connection:", connection)

// Rutas
const authRoutes = require("./src/routes/authRoutes")
const productosRoutes = require("./src/routes/productosRoutes")
const clientesRoutes = require("./src/routes/clientesRoutes")
const pedidosRoutes = require("./src/routes/pedidosRoutes")
const usuariosRoutes = require("./src/routes/usuariosRoutes")
const detallePedidoRoutes = require("./src/routes/detallePedidoRoutes")

const app = express()
const PORT = process.env.PORT || 3000

// =======================
// Middlewares
// =======================

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// =======================
// Ruta principal
// =======================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "¡Bienvenido a la API de Tienda!",
    version: "1.0.0",
    description: "API REST para gestión de inventario, productos, clientes y pedidos",
    author: "Sistema de Inventario - CESDE",
    endpoints: {
      authentication: {
        login: "POST /api/login"
      },
      resources: {
        productos: "GET /api/productos | POST /api/productos | PUT /api/productos/:id | DELETE /api/productos/:id",
        clientes: "GET /api/clientes | POST /api/clientes | PUT /api/clientes/:id | DELETE /api/clientes/:id",
        pedidos: "GET /api/pedidos | POST /api/pedidos | PUT /api/pedidos/:id | DELETE /api/pedidos/:id",
        usuarios: "GET /api/usuarios | POST /api/usuarios | PUT /api/usuarios/:id | DELETE /api/usuarios/:id",
        detallePedido: "GET /api/detalle-pedido | POST /api/detalle-pedido | PUT /api/detalle-pedido/:id | DELETE /api/detalle-pedido/:id"
      },
      status: "API funcionando ✅"
    }
  })
})

// =======================
// Rutas API
// =======================

app.use("/api", authRoutes)
app.use("/api/productos", productosRoutes)
app.use("/api/clientes", clientesRoutes)
app.use("/api/pedidos", pedidosRoutes)
app.use("/api/usuarios", usuariosRoutes)
app.use("/api/detalle-pedido", detallePedidoRoutes)

// =======================
// Ruta no encontrada
// =======================

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `${req.method} ${req.originalUrl} no existe`,
    suggestion: "Consulta GET / para ver endpoints disponibles"
  })
})

// =======================
// Inicio del servidor
// =======================

async function startServer() {
  try {

    console.log("🔄 Iniciando servidor...")

    // conexión MySQL
    await connection.initializePool()

    // crear tablas si no existen
    await initializeDatabase()

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`)
      console.log(`📚 API Base: http://localhost:${PORT}/api`)
      console.log(`💾 Base de datos: ${process.env.DB_NAME || "inventario_db"}`)
    })

  } catch (error) {

    console.error("❌ Error al iniciar el servidor:", error.message)
    process.exit(1)

  }
}

// =======================
// Cierre seguro del servidor
// =======================

process.on("SIGINT", async () => {
  console.log("\n🔒 Cerrando conexiones MySQL...")
  // Cambiado para usar la función directamente del objeto connection
  if (connection.closePool) {
    await connection.closePool()
  }
  console.log("✅ Conexiones cerradas")
  process.exit(0)
})

// Manejo de errores globales

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err)
})

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err)
})

// =======================

startServer()