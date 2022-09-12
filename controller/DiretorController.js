const Diretor = require('../model/Diretor');

function opAdd(req, res){
    res.render('diretor/add.ejs', { Login: req.user });
};

function add(req, res){
    var diretor = new Diretor();
    diretor.nome = req.body.nome;
    diretor.nascimento = req.body.nascimento;
    diretor.foto = req.file.filename;
    diretor.save(function (err, result){
        if(err){
            res.send(err);
        }else{
            res.redirect('/diretor/lst');
        }
    });
};

function lst(req, res){
    Diretor.find({}).then(function(diretores){
        res.render('diretor/lst.ejs', {Diretores: diretores, Login: req.user});
    });
};

function filter(req, res){
    var search = req.body.pesquisa;
    Diretor.find({name: RegExp(search, 'i')}).then(function(diretores){
        res.render('diretor/lst.ejs', {Diretores: diretores, Login: req.user});
    });
};

function opEdt(req, res){
    Diretor.findById(req.params.id).then(function(diretor){
        res.render('diretor/edt.ejs', {Diretor: diretor, Login: req.user});
    });
};

function edt(req, res){
    Diretor.findByIdAndUpdate(req.params.id, {    
        nome: req.body.nome,
        nascimento: req.body.nascimento,
        foto: req.file.filename
    }, function(err, result){
        if(result){
            res.redirect('/diretor/lst');
        }else{
            res.render(err);
        };
    }); 
};

function del(req, res){
    Diretor.findByIdAndDelete(req.params.id).then(function(i){
        for (let i = 0; i < valor.animes.length; i++) {
            Anime.findById(valor.animes[i]).then(function (anime) {
                anime.personagens.splice(anime.personagens.indexOf(valor._id), 1);
                anime.save();
            });
        };
        res.redirect('/diretor/lst');
    });
};

module.exports = {opAdd, add, lst, filter, opEdt, edt, del};