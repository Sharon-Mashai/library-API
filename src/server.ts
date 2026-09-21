import express from "express";
import authorRoutes from "./routes/authorRoutes.js";

const app = express();
const PORT = 4000;

// Middleware for reading JSON request bodies
app.use(express.json());

// Author routes
app.use("/authors", authorRoutes);

// Start server
app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`,
  );
});