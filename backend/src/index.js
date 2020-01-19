const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require("./routes.js");

const app = express();

mongoose.connect("mongodb+srv://db_general_admin:db_admin@cluster0-phrys.mongodb.net/dev_radar?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);