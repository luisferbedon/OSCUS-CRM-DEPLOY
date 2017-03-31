var a;
var seler_name = $('#id').val();
$(document).ready(function(){
  obtener_datos();
   
});


console.log("Hola Mundo");
var databaseUrl = "http://smartmanagement.ec/fundelcrm/database.php";	
var eventos1 = [] ;
var n_eventos;


function obtener_datos(){
    $.post( "http://smartmanagement.ec/fundelcrm/database.php", { operacion: "procesados" , seler: seler_name  }).done(function(dat) {
		console.log('funcion Procesados en ejeccion...');
		obj = $.parseJSON(dat);
		$.each(obj, function(index, val){
            eventos1.push(
                {
                    'start': val.f_proxima,
					'title': val.nombre
                }
            );

            //eventoscontend.push(eventos1);
        });
        console.log(obj);
        console.log(eventos1);
        
        $('#calendar').fullCalendar(
        {
          
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay,listWeek'
			},
			defaultDate: '2017-03-15',
			navLinks: true, // can click day/week names to navigate views
            lang: 'es',
			editable: false,
			//eventLimit: false, // allow "more" link when too many events
            events : eventos1,
			
		});
        
        
        
        }); 
}


 

