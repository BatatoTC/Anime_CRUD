const Personagem = require('../model/Personagem');
const Anime = require('../model/Anime');

function opAdd(req, res){
    Anime.find({}).then(function(animes){
        res.render('personagem/add.ejs', {Animes: animes, Login: req.user });
    });
};

function add(req, res){
    var personagem = new Personagem();
    personagem.nome = req.body.nome;
    personagem.foto = req.file.filename;
    personagem.animes = req.body.animes;
    personagem.save(function (err, result){
        if(err){
            res.send("Aconteceu o seguinte erro: " +err);
        }else{
            for(let i = 0; i < personagem.animes.length; i++){
                Anime.findById(personagem.animes[i]).then(function (anime){
                    anime.personagens.push(result._id);
                    anime.save();
                });
            };
            res.redirect("/personagem/lst");
        };
    });
};

function lst(req, res){
    Personagem.find({}).populate("animes").then(function(personagens){
        res.render('personagem/lst.ejs', {Personagens: personagens, Login: req.user});
    });
};

function filter(req, res){
    var search = req.body.pesquisa;
    Personagem.find({name: RegExp(search, 'i')}).populate("animes").then(function(personagens){
        res.render('personagem/lst.ejs', {Personagens: personagens, Login: req.user});
    });
};

function opEdt(req, res){
    Personagem.findById(req.params.id).then(function(personagem){
        Anime.find({}).then(function(animes){
            res.render('personagem/edt.ejs', {Personagem: personagem, Animes: animes, Login: req.user });
        });    
    });
};

function edt(req, res){
    Personagem.findByIdAndUpdate(req.params.id, {    
        nome: req.body.nome,
        foto: req.file.filename,
        animes: req.body.animes,
    }, function(err, result){
        if(result){
            res.redirect('/personagem/lst');
        }else{
            res.render(err);
        };
    }); 
};

function del(req, res){
    Personagem.findByIdAndDelete(req.params.id).populate("animes").then(function(valor){
        for (let i = 0; i < valor.animes.length; i++) {
            Anime.findById(valor.animes[i]).then(function (anime) {
                anime.personagens.splice(anime.personagens.indexOf(valor._id), 1);
                anime.save();
            });
        };
        res.redirect('/personagem/lst');
    });
};

module.exports = {opAdd, add, lst, filter, opEdt, edt, del};