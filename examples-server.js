var http    = require("http");
var express = require("express")
var jade    = require("jade")

var app        = express()
var httpServer = http.Server(app)

app.engine("jade", jade.__express);
app.set("view engine", "jade");
app.set("views", __dirname + "/examples");
app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/dist"));

app.get("/", function (req, res) {
  res.render("index");
});

httpServer.listen(5000, console.log.bind(console, "connected on 5000"));
