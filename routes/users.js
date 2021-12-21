const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');

const upload = require('../middleware/imageUpload');
const protect = require('../middleware/protect');
const restrictTo = require('../middleware/restrictedTo');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/forgetpassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);

router.use(protect);
router.post('/validateToken', authController.validateUser);
router.patch('/updatePassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', upload.single('file'), userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(restrictTo(['Admin']));
router.route('/').get(userController.getalluser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/block/:id').post(userController.block);

router.route('/unblock/:id').post(userController.unblock);
module.exports = router;
