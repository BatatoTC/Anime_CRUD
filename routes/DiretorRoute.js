const express = require('express');
const router = express.Router();
const diretorController = require('../controller/DiretorController');

const upload = require('../config/upload');

upload.fields;

router.get('/add', diretorController.opAdd);
router.post('/add', upload.single('foto'), diretorController.add);

router.get('/lst', diretorController.lst);
router.post('/lst', diretorController.filter);

router.get('/edt/:id', diretorController.opEdt);
router.post('/edt/:id', upload.single('foto'), diretorController.edt);

router.get('/del/:id', diretorController.del);

module.exports = router;