const express = require('express');
const router = express.Router();
const usuarioController = require("../controller/UsuarioController");

const upload = require('../config/upload');

upload.fields;

router.get('/add', usuarioController.opadd);
router.post('/add', upload.single('foto'), usuarioController.add);

router.get('/lst', usuarioController.lst);
router.post('/lst', usuarioController.filter);

router.get('/edt/:id', usuarioController.opedt);
router.post('/edt/:id', upload.single('foto'), usuarioController.edt);

router.get('/del/:id', usuarioController.del);

module.exports = router;