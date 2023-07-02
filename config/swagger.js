const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crud_With_Jwt_Authentication",
      version: "1.0.0",
      description:
        "Implementation of the CRUD operation with authentication and swagger documentation",
      contact: {
        name: "Safaid Ansari",
        email: "safaidansari07@gmail.com",
      },
    },
    security: [
      {
        bearerAuth: [], // Add the Bearer token scheme
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/user.route.js"], // Path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
