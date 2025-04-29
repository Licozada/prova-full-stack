// Importando os packages instalados
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

// Importando as rotas
const homeRota = require("./routes/homeRoute");
const loginRota = require("./routes/loginRoute");
const emprestimoRota = require("./routes/emprestimoRoute");
const livrosRota = require("./routes/livrosRoute");

// Importando middleware de autenticação
const AutenticacaoMiddleware = require("./middlewares/AutenticacaoMiddleware");
const auth = new AutenticacaoMiddleware();

const app = express();

// Configurando a nossa pasta pública como o repositório de arquivos estáticos (css, js, imagens)
app.use(express.static(__dirname + "/public"));

// Configuração das nossas views para utilizar a ferramenta EJS
app.set("view engine", "ejs");

// Configuração de onde ficará nossas views
app.set("views", "./views");

// Configuração de sessões
app.use(
    session({
        secret: "biblioteca_secret", // Substitua por um segredo seguro
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Utilize secure: true em HTTPS
    })
);

// Configuração para receber dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração da página de layout
app.set("layout", "./layout");
app.use(expressLayouts);

// Definição das rotas públicas (não requerem autenticação)
app.use("/", homeRota); // Página inicial
app.use("/login", loginRota); // Login
app.use("/emprestimo", emprestimoRota); // Empréstimos

// Definição das rotas privadas (requerem autenticação)
app.use("/livro", auth.validar, livrosRota); // Rotas relacionadas aos livros

// Ponto de início do nosso servidor web
const server = app.listen("5001", function () {
    console.log("Servidor web iniciado na porta 5001");
});
