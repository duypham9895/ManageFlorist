const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(require("./middleware/cors"));

app.get("/", (req, res) => res.send("API Running"));

// Define routes
// /// About Auth & User
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/role", require("./routes/api/role"));

// /// About product
app.use("/api/category", require("./routes/api/category"));
app.use("/api/supplier", require("./routes/api/supplier"));
app.use("/api/product", require("./routes/api/product"));

// /// About inventory
app.use("/api/inventory", require("./routes/api/inventory"));

// /// About discount
app.use("/api/discount", require("./routes/api/discount"));

// /// About invoice
app.use("/api/invoice", require("./routes/api/invoice"));

const PORT = process.env.PORT || 4949;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
