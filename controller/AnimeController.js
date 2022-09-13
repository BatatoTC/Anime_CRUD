const Anime = require("../model/Anime");
const Diretor = require('../model/Diretor');
const Personagem = require('../model/Personagem');

function opAdd(req, res){
    Diretor.find({}).then(function(diretores){
        Personagem.find({}).then(function(personagens){
            res.render('anime/add.ejs', {Diretores: diretores, Personagens: personagens, Login: req.user });
        });
    });
};

function add(req, res){
    var anime = new Anime();
    anime.nome = req.body.nome;
    anime.episodio = req.body.episodio;
    anime.inicio = req.body.inicio;
    anime.fim = req.body.fim;
    anime.estudio = req.body.estudio;
    anime.genero = req.body.generos;
    anime.foto = req.file.filename;
    anime.diretor = req.body.diretor;

    anime.save(function (err, result){
        if(err){
            res.send("Aconteceu o seguinte erro: " + err);
        }else{
            res.redirect("/anime/lst");
        };
    });
};

function lst(req, res){
    Anime.find({}).populate("diretor").populate("personagens").then(function(animes){
        res.render('anime/lst.ejs', {Animes: animes, Login: req.user });
    });
};

function filter(req, res){
    var pesquisa = req.body.pesquisa;
    Anime.find({nome: RegExp(pesquisa, 'i')}).populate("diretor").populate("personagens").then(function(animes){
        res.render('anime/lst.ejs', {Animes: animes, Login: req.user});
    });
};

function opEdt(req, res){
    Anime.findById(req.params.id).then(function(anime){
        Diretor.find({}).then(function(diretores){
            res.render('anime/edt.ejs', {Anime: anime, Diretores: diretores, Login: req.user });
        });
    });
};

function edt(req, res){
    Anime.findByIdAndUpdate(req.params.id, {    
        nome: req.body.nome,
        episodio: req.body.episodio,
        inicio: req.body.inicio,
        fim: req.body.fim,
        estudio: req.body.estudio,
        genero: req.body.generos,
        foto: req.file.filename,
        diretor: req.body.diretor,
    }, function(err, result){
        if(result){
            res.redirect('/anime/lst');
        }else{
            res.render(err);
        };
    });
};

function del(req, res){
    Anime.findByIdAndDelete(req.params.id).populate("personagens").then(function(valor){
        for (let i = 0; i < valor.personagens.length; i++) {
            Personagem.findById(valor.personagens[i]).then(function (personagem) {
                personagem.animes.splice(personagem.animes.indexOf(valor._id), 1);
                personagem.save();
            });
        };
        res.redirect('/anime/lst');
    });
};

module.exports = {opAdd, add, lst, filter, opEdt, edt, del};