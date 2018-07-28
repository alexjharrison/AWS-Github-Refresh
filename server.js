var express = require("express")
var fs = require("fs");
var bodyParser = require("body-parser");

var PORT = 3569;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(PORT,(err)=>{
    if (err) throw err;
    console.log("Program started on port "+PORT);
})

app.post("/update",(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})