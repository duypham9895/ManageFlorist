const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
// const config = require("config");

const app = express();

// process.env["NODE_CONFIG_DIR"] = __dirname + "./config/";

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(require("./middleware/cors"));
app.set("trust proxy", true);

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

// Server static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 4949;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
