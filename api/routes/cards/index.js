const express = require('express');

const router = express.Router();

router.post('/:nameCard', require('./addCard'));
router.get('/', require('./getCards'));
router.get('/:idCard', require('./getCardById'));

module.exports = router;
