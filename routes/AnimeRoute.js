const express = require('express');
const router = express.Router();
const animeController = require('../controller/AnimeController');

const upload = require('../config/upload');

upload.fields;

router.get('/add', animeController.opAdd);
router.post('/add', upload.single('foto'), animeController.add);

router.get('/lst', animeController.lst);
router.post('/lst', animeController.filter);

router.get('/edt/:id', animeController.opEdt);
router.post('/edt/:id', upload.single('foto'), animeController.edt);

router.get('/del/:id', animeController.del);

module.exports = router;