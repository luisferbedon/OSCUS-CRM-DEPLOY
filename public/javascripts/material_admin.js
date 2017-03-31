$(".dropdown-button").dropdown();
$('.modal').modal();

$(".datepicker").pickadate();
$(document).ready(function(){
    // Materialize.toast('HOla Mundo', 4000)
    //para la ventana modal de agregar usuario 
    $('.modal').modal();
	$('.nuevo_dispositivo').modal();
    $('.busqueda').modal();
    //para habilitar el select del modal de agregar usuario 
	 $('select').material_select();
  });
  