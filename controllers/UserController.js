var mysql = require('mysql');
var bcrypt = require('bcryptjs');
//var express = require('express');
var formidable = require('express-formidable');

module.exports = {

	nuevo : function(req, res,next)
	{
		if(req.user)
			{
                // imprimimos el array del usuario que arroja passport 
                /*
                para poder redirigir entre un admnistrador y un usuario nos giamos según el tipo que este esté escrito en la base de datos  en este caso 1 es administrado y cualquier otro es usuario 
                */
                if(req.user.tipo == 1)
                    {
                        console.log(req.user);
                        return res.render('users/admin',{
                        isAuthenticated : req.isAuthenticated(),
                        user: req.user
                        }); 
                    }
                else{
                     console.log(req.user);
                    return res.render('users/admin',{
                    isAuthenticated : req.isAuthenticated(),
                    user: req.user
                    });
                }
			}
		else
		return res.render('users/inicio');
	},
	//controlador para gestionar ewl perfil 
	getProfile : function(req, res, next)
	{
		return res.render('users/perfil',{
			isAuthenticated : req.isAuthenticated(),
			user: req.user,
			message : req.flash('info')
		})
	},
	//peticion post para actualizar los campos del perfil
	postProfile : function(req,res,next)
	{
		var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
		if(req.body.password)
			{
				var salt = bcrypt.genSaltSync(10);
                var password = bcrypt.hashSync(req.body.password, salt);
                var user = {
                    nombre : req.body.nombre,
                    password : password
                };
				//sql para actualizar datos 
        		db.query('UPDATE usuarios SET ? WHERE usuarios.id_usuario='+req.body.id, user ,function(err, rows, fields){
                    if(err) console.log(err);
                });
			}
		else
			{
				var user = {
                    nombre : req.body.nombre
                };
				//sql para actualizar datos 
        		db.query('UPDATE usuarios SET ? WHERE usuarios.id_usuario='+req.body.id, user ,function(err, rows, fields){
                    if(err) console.log(err);
                });
			}
		 
		
                   db.end();
                return res.redirect('/'); 
	},
	//controlador para  nuevo usuario
	getSignUp : function(req, res, next){
		return res.render('users/signup', {
			isAuthenticated : req.isAuthenticated(),
			user : req.user,
			message : req.flash('info'),
			fail_msg : req.flash('fail_msg')
			
		});
	},

    crm : function(req, res, next){
		var user = req.user;
		if(user.tipo==2)
			{
				return res.render('users/crm', {
			isAuthenticated : req.isAuthenticated(),
			user : req.user
				});
			}
		else
			return res.redirect('/');
	},
	//controlador para nuevo usuario 
	postSignUp: function(req, res, next){
        
        var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
        db.query('SELECT * FROM usuarios WHERE  correo = ?', req.body.email , function(err, rows, fields){
			if(err) throw err;
            if(rows.length > 0)
                {
                    req.flash('fail_msg', 'Ya  existe un usuario con ese correo electrónico');
                    console.log('no se creo el usuario ');
                       db.end();
                    return res.redirect('/', {fail_msg:req.flash('fail_msg')}); 
                }
            else
            {
             //encriptacion de contraseñas 
                var salt = bcrypt.genSaltSync(10);
                var password = bcrypt.hashSync(req.body.password, salt);

                var user = {
                    correo : req.body.email,
                    nombre : req.body.nombre,
					tipo : req.body.tipo,
					grupo : req.body.grupo,
                    password : password,
                   
                };
                db.query('INSERT INTO usuarios SET ?', user, function(err, rows, fields){
                    if(err) 
						console.log(err);
					 req.flash('info', 'Se registró correctamente el nuevo usuario');
                   db.end();
                return res.redirect('/');  
                });
                
            }
		});
		
	},
    

	getSignIn: function(req, res, next){
		return res.render('users/inicio', {message: req.flash('info'), authmessage : req.flash('authmessage')});
	},

	logout : function(req, res, next){
		req.logout();
		res.redirect('/');
	},

	getUserPanel : function(req, res, next){
		res.render('users/panel', {
			isAuthenticated : req.isAuthenticated(),
			user : req.user
		});
	}
    ,
    
    getCalendario : function(req,res,next){
        res.render('users/calendario', {
			isAuthenticated : req.isAuthenticated(),
			user : req.user
		});
    }



};