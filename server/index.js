const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const port = 8000

mongoose.connect(process.env.DATABASE);

app.use(cors({
  origin: 'https://music-app-sepia-chi.vercel.app',
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const adminRoute = require("./routes/admin/index.route");
app.use(`/admin`, adminRoute);

const clientRoute = require("./routes/client/index.route");
app.use(`/`, clientRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
