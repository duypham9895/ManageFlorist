const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const logger = require("morgan");
// const config = require("config");

const app = express();

// process.env["NODE_CONFIG_DIR"] = __dirname + "./config/";

// Connect Database
connectDB();

// require("./routes")(app);

// Init Middleware
app.use(express.json({ extended: false }));
app.use(require("./middleware/cors"));
app.set("trust proxy", true);

// require("./routes/index")(app);

app.use("/api", require("./routes/index"));
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

// /// About Goods Receipt
app.use("/api/receipt", require("./routes/api/goodsReceipt"));
// app.use("/api/receipt", require("./routes/api/goodsReceipt"));

// Server static assets in production
if (process.env.NODE_ENV === "production") {
    // Set staic folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 4949;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
