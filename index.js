const express = require("express");
const app = express();
const porta = 3000;
const path = require("path");
const usuarioRoute = require('./routes/UsuarioRoute');
const animeRoute = require('./routes/AnimeRoute');
const diretorRoute = require('./routes/DiretorRoute');
const personagemRoute = require('./routes/PersonagemRoute');
const passport = require('./config/passport');

var session = require("express-session");
var autenticacao = require("./config/autenticacao");
app.use(session({
    secret: "Anime",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.authenticate("session"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extends: true }));

app.set('view engine', 'ejs');

app.use('/usuario', autenticacao, usuarioRoute);
app.use('/anime', autenticacao, animeRoute);
app.use('/diretor', autenticacao, diretorRoute);
app.use('/personagem', autenticacao, personagemRoute);

app.get("/", function (req, res) {
    res.render("login.ejs");
});
  
app.post("/", passport.authenticate("local", {
    successRedirect: "/anime/lst",
    failureRedirect: "/",
}));

app.listen(porta, () => {
    console.log("Servidor rodando na porta 3000.");
});