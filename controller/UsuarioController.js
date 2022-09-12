const Usuario = require("../model/Usuario");

function opadd(req, res){
    res.render('usuario/add.ejs', {Login: req.user});
};

function add(req, res){
    var usuario = new Usuario();
    usuario.nome = req.body.nome;
    usuario.email = req.body.email;
    usuario.senha = req.body.senha;
    usuario.foto = req.file.filename;
    usuario.save(function (err, result) {
        if(err){
            res.send(err);
        }else{
            res.redirect('/usuario/lst');
        };
    });
};

function lst(req, res){
    Usuario.find({}).then(function(usuarios){
        res.render("usuario/lst.ejs", {Usuarios: usuarios, Login: req.user});
    });
};

function filter(req, res){
    var pesquisa = req.body.pesquisa;
    Usuario.find({nome: RegExp( pesquisa, "i")}).then(function(usuarios){
        res.render("usuario/lst.ejs", {Usuarios: usuarios, Login: req.user});
    });
};

function opedt(req, res){
    Usuario.findById(req.params.id).then(function(usuario){
        res.render("usuario/edt.ejs", {Usuario: usuario, Login: req.user});
    });
};

function edt(req, res){
    Usuario.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        foto: req.file.filename
    }, function(err, result) {
        if(err){
            res.send("Aconteceu o seguinte erro:\n" + err);
        }else{
            res.redirect("/usuario/lst");
        };
    });
};

function del(req, res){
    Usuario.findByIdAndDelete(req.params.id).then(function(i){
        res.redirect('/usuario/lst');
    });
};

module.exports = {opadd, add, lst, filter, opedt, edt, del};