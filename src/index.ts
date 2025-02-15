import express from "express";
import { Express } from "express-serve-static-core";
import routes from "./routers";

declare global {
  namespace Express {
    interface Request {
      hasErrors: boolean;
      Errors: [];
      user: number | false;
    }
  }
}

//const cors = require("cors");

const port = process.env.PORT || 8626;

const app: Express = express();
app.get("/", (req, res) => {
  res.status(200).send("Works");
});

app.use(express.json());
//app.use(cors);
app.use(
  express.urlencoded({
    extended: true,
  }),
);
routes(app);

// Swagger docs
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger";
// const YAML = require("yamljs");
// const swaggerJsDocs = YAML.load("./src/api.yaml");

//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
