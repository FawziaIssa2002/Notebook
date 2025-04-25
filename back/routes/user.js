const express = require('express');
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  updateLoggedUserPassword,
  updateLoggedUserData,
  getLoggedUserData,
  deleteLoggedUser,
} = require('../controllers/userController');
const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  getUserValidator,
  changeUserPasswordValidator,
  changeLoggedUserPassValidator,
  updateLoggedUserValidator,
} = require('../utils/validators/userValidator');
const authController = require('../controllers/authController');

const router = express.Router();

// User routes
router.put(
  '/changeMyPassword',
  authController.auth,
  changeLoggedUserPassValidator,
  updateLoggedUserPassword
);

router.put(
  '/updateMe',
  authController.auth,
  updateLoggedUserValidator,
  updateLoggedUserData
);
router.get('/getMe', authController.auth, getLoggedUserData, getUser);
router.delete('/deleteMe', authController.auth, deleteLoggedUser);

router
  .route('/')
  .get(authController.auth, getUsers)
  .post(
    authController.auth,
    createUserValidator,
    createUser
  );

router
  .route('/:id')
  .get(
    authController.auth,
    getUserValidator,
    getUser
  )
  .put(
    authController.auth,
    updateUserValidator,
    updateUser
  )
  .delete(
    authController.auth,
    deleteUserValidator,
    deleteUser
  );

module.exports = router;
