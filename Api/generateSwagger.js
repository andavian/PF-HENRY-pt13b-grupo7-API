const fs = require("fs");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Especificación OpenAPI
    info: {
      title: "API Henry Shop",
      version: "1.0.0",
      description: "Descripción de tu API",
    },
  },
  apis: [
    "./src/routes/routes-categories.js",
    "./src/routes/routes-product.js",
    "./src/routes/routes-payment.js",
  ], // Rutas con anotaciones Swagger
};

const swaggerSpec = swaggerJSDoc(options);

// Especifica la ruta y el nombre del archivo en el que deseas guardar la especificación Swagger
const outputFilePath = "./swagger.json";

// Escribe la especificación Swagger en el archivo
fs.writeFileSync(outputFilePath, JSON.stringify(swaggerSpec, null, 2));

module.exports = swaggerSpec;
