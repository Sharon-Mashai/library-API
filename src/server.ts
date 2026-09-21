import express from "express";
import authorRoutes from "./routes/authorRoutes.js";
import bookroutes from "./routes/bookRoutes.js" ;
import { logger } from "./middleware/logger.js";

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(logger);

// Author routes
app.use("/authors", authorRoutes);
app.use("/books", bookroutes);

// Start server
app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`,
  );
});