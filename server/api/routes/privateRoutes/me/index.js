const express = require('express');

const router = express.Router();

router.delete('/boardStars/:boardId', require('./unstarBoard'));
router.post('/boardStars/:boardId', require('./starBoard'));
router.post('/categories', require('./addCategory'));
router.delete('/categories/:categoryId', require('./deleteCategory'));
router.put('/categories/:categoryId', require('./updateCategoryName'));
router.put('/boards/:boardId/category', require('./updateBoardCategory'));
router.get('/', require('./getUsersWithQuery'));

module.exports = router;