const express = require('express');
const router = express.Router();

const routes = require('./routes');

router.get('/city/:name', routes.get);

module.exports = router;
