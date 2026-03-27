import express from "express"
import morgan from "morgan"
import cors from "cors"
import indexRoutes from "./routes/index.routes.js"
import loginRoutes from "./routes/login.routes.js"
import usersRoutes from "./routes/users.routes.js"

const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(cors())
app.use(indexRoutes);
app.use(usersRoutes);
app.use(loginRoutes);

const PORT = 8000

app.listen(PORT, console.log("http://localhost:"+PORT))