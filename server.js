// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require("express");
var compression = require("compression");
var cors = require("cors");
const logger = require("morgan");
const allRoutes = require('./controllers')
require('dotenv').config()

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================
var app = express();
var PORT = process.env.PORT || 8080;

const db = require('./models');

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({
    origin: [CORS_ORIGIN],
    credentials: true
}));

app.use(compression());
app.use(logger("dev"));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ================================================================================
// ROUTER
// ================================================================================
app.use('/', allRoutes)

// =============================================================================
// LISTENER
// =============================================================================

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});