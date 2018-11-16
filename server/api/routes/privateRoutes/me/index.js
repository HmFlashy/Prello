const express = require('express');
const { userValidator } = require('../../../validations/privateRoutes');
const checkRequest = require('../../../middlewares/CheckRequest')

const router = express.Router();

router.put('/', userValidator.updateUserValidator, checkRequest, require('./updateProfile'));
router.delete('/boardStars/:boardId', userValidator.unstarBoardValidator, checkRequest, require('./unstarBoard'));
router.post('/boardStars/:boardId', userValidator.starBoardValidator, checkRequest, require('./starBoard'));
router.post('/categories', userValidator.addCategoryValidator, checkRequest, require('./addCategory'));
router.delete('/categories/:categoryId', userValidator.deleteCategoryValidator, checkRequest, require('./deleteCategory'));
router.put('/categories/:categoryId', userValidator.updateCategoryNameValidator, checkRequest, require('./updateCategoryName'));
router.put('/boards/:boardId/category', userValidator.updateBoardCategoryValidator, checkRequest, require('./updateBoardCategory'));
router.get('/', require('./getUsersWithQuery'));
router.post('/client_applications', userValidator.addClientApplicationValidator, checkRequest, require('./addClientApplication'))
router.post('/client_applications/:clientId/uris', userValidator.addRedirectValidator, checkRequest, require('./addRedirectUri'))
router.delete('/client_applications/:clientId/uris/:uri', userValidator.removeRedirectURIValidator, checkRequest, require('./removeRedirectUri'))

module.exports = router;