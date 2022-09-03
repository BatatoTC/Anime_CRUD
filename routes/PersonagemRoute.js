const express = require('express');
const router = express.Router();
const personagemController = require('../controller/PersonagemController');

const upload = require('../config/upload');

upload.fields;

router.get('/add', personagemController.opAdd);
router.post('/add', upload.single('foto'), personagemController.add);

router.get('/lst', personagemController.lst);
router.post('/lst', personagemController.filter);

router.get('/edt/:id', personagemController.opEdt);
router.post('/edt/:id', upload.single('foto'), personagemController.edt);

router.get('/del/:id', personagemController.del);

module.exports = router;