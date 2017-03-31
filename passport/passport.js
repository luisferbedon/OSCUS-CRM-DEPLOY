var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');

//lo siguiente es el modulo que importa a la app 
module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new LocalStrategy({
		passReqToCallback : true
	}, function(req, email, password, done){

		var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();

		db.query('SELECT * FROM usuarios INNER JOIN grupo ON usuarios.grupo = grupo.id_grupo WHERE  `correo` = ?', email, function(err, rows, fields){
			if(err) console.log(err);

			db.end();

			if(rows.length > 0){

				var user = rows[0];
				// aqui se define la variable user que se maneja en todas las vistas en las que haga login
				if(bcrypt.compareSync(password, user.password)){
					return done(null, {
						id: user.id_usuario, 
						nombre : user.nombre,
						email : user.correo,
						tipo : user.tipo,
						grupo : user.nombre_grupo, 
						id_grupo : user.grupo
					});
				}
			}

			return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));

		});

	}
	));

};