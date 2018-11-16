const express = require('express');
const { userValidator } = require('../../../validations/privateRoutes');

const router = express.Router();

router.put('/', userValidator.updateUserValidator, require('./updateProfile'));
router.delete('/boardStars/:boardId', require('./unstarBoard'));
router.post('/boardStars/:boardId', require('./starBoard'));
router.post('/categories', require('./addCategory'));
router.delete('/categories/:categoryId', require('./deleteCategory'));
router.put('/categories/:categoryId', require('./updateCategoryName'));
router.put('/boards/:boardId/category', require('./updateBoardCategory'));
router.get('/', require('./getUsersWithQuery'));
router.post('/client_applications', require('./addClientApplication'))
router.post('/client_applications/:clientId/uris', require('./addRedirectUri'))
router.delete('/client_applications/:clientId/uris/:uri', require('./removeRedirectUri'))

module.exports = router;