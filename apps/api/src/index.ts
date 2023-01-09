import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import AppRoutes from "./routes";
import connectDB from "./lib/connectDB";
import path from "path";

connectDB();
dotenv.config({ path: process.cwd() + '/.env.local', override: true });

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../", "public")))
AppRoutes(app);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
