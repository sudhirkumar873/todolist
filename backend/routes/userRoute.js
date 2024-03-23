const {Router} = require('express');
const userController = require('../controller/user')

const router = Router();

router.post('/login', userController.login)
router.post('/signup', userController.signUp)
router.get('/logout', userController.logout)

module.exports = router;