const express = require('express');

const router = express.Router();

router.post('/', require('./addCard'));
router.get('/', require('./getCards'));
router.get('/:idCard', require('./getCardById'));
router.put('/:idCard', require('./updateCard'));

router.post('/:idCard/:field', require('./arrays/addValToField'));
router.delete('/:idCard/:field', require('./arrays/removeValToField'));

module.exports = router;







module.exports = router;
