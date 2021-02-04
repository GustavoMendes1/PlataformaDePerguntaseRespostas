const { Console } = require('console');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

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

    Pergunta.findAll({raw:true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        console.log(perguntas);
        res.render("index",{
            perguntas: perguntas
        });
    });
    
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(()=>{
        res.redirect("/");
    });
});


app.listen(8081,() => {

});