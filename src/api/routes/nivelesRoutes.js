const express = require('express');
const router = express.Router();
const nivelController = require('../controllers/nivelController');

router.get('/', nivelController.listarNiveles);

module.exports = router;