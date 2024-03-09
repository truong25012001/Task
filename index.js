const express = require('express');
const app = express();
require('dotenv').config();
const database = require("./config/database");
var cors = require('cors')
app.use(cors())

var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())


const port = process.env.PORT;
database.connect();

// Routes Ver1
const routesVer1 = require("./api/v1/routes/index.route");
routesVer1(app);




app.listen(port, () => {
	console.log(`App listening on port ${port}`);
})