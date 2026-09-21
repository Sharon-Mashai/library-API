import express from "express";
import authorRoutes from "./routes/authorRoutes.js";
import bookroutes from "./routes/bookRoutes.js" ;
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(logger);

// routes
app.use("/authors", authorRoutes);
app.use("/books", bookroutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`,
  );
});