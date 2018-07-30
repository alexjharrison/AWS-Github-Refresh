var express = require("express");
var bodyParser = require("body-parser");
var cmd = require("node-cmd");

var PORT = 3569;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(PORT,(err)=>{
    if (err) throw err;
    console.log("Program started on port "+PORT);
})

app.post("/update",(req,res)=>{
    if(req.body.ref==="refs/heads/master")
    {
        var repo = req.body.repository.name;
        console.log("master branch");
        cmd.get(
            `
            cd ../${repo}
            sudo forever stop server.js
            git pull
            npm i
            sudo forever start server.js
            `,
            function(err,data,stderr){
                if(err) throw err;
                console.log(data);
                console.log("repo updated and restarted");
                res.send(req.body);
            }
        )
    }
    else {
        console.log("not master branch");
        res.send(req.body)
    }
})