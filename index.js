const { Console } = require('console');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

connection.authenticate().then(()=>{
    console.log('Conexão OK');
}).catch((msgErro)=>{
    console.log(msgErro);
})

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.render("index",{
    });
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send(titulo + descricao);
});


app.listen(8081,() => {

});