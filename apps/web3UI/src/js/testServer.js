const express = require("express");
const dotenv = require("dotenv").config();
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 4500;

// Middleware
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("WELCOME TO THE BASIC EXPRESS APP WITH AN HTTPS SERVER");
});

// Read SSL certificate and key files
const privateKey  = fs.readFileSync(process.env.SSLCertificateKeyFile, 'utf8')
const certificate = fs.readFileSync(process.env.SSLCertificateFile, 'utf8')
const options = {
  key: privateKey,
  cert: certificate,
};

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`App listening on https://localhost:${port}`);
});
