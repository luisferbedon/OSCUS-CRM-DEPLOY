var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././middleware/auth');
//var formidable = require('express-formidable');
//var fs = require('fs');

router.get('/', controllers.UserController.nuevo);

//routas de usuario
router.get('/nuevo-usuario', AuthMiddleware.isLogged , controllers.UserController.getSignUp);
//router.get('/nuevo-usuario', controllers.UserController.getSignUp);


router.post('/nuevo-usuario', AuthMiddleware.isLogged , controllers.UserController.postSignUp);
//router.post('/nuevo-usuario', controllers.UserController.postSignUp);

router.get('/tablero', AuthMiddleware.isLogged , controllers.UserController.crm);
//router.get('/tablero' , controllers.UserController.crm);


router.post('/',  passport.authenticate('local', {
	successRedirect : '/',
	failureRedirect : '/',
	failureFlash : true 
}));
router.get('/salir', controllers.UserController.logout);
router.get('/users/panel', AuthMiddleware.isLogged ,controllers.UserController.getUserPanel);
router.get('/perfil', AuthMiddleware.isLogged, controllers.UserController.getProfile);
router.post('/users/perfil', AuthMiddleware.isLogged, controllers.UserController.postProfile);
//ruta para acceder al calendario
router.get('/calendario',AuthMiddleware.isLogged, controllers.UserController.getCalendario);
// ruta  para registrar nuevo dispositivo

router.get('/nuevo-dispositivo', AuthMiddleware.isLogged, controllers.UserController.nuevo);
//nuevo Usuario 
//router.post('/nuevo-usuario', AuthMiddleware.isLogged,con);

module.exports = router;
