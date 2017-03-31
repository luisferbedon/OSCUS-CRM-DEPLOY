var seler_name = $('#id').val();
var databaseUrl = "http://smartmanagement.ec/fundelcrm/database.php";
var id_grupo = $('#id_grupo').val();

var  contactos;
var  procesados;
var  aceptados;
var rechazados;

function date_to_utf(fecha){
   /*
    dateString = '17-09-2013 10:08'
    2017-01-18 20:45:19*/
    var dateString = fecha,
    dateTimeParts = dateString.split(' '),
    timeParts = dateTimeParts[1].split(':'),
    dateParts = dateTimeParts[0].split('-'),
    date;

date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0]-5, timeParts[1]);

    var fecha_fin = date.getTime();
//console.log(date.getTime()); //1379426880000
//console.log(date); //Tue Sep 17 2013 10:08:00 GMT-0400
    return fecha_fin;
}

function comparar_fechas(fecha1, fecha2)
{
    var dateString1 = fecha1,
    dateTimeParts1 = dateString1.split(' '),
    timeParts1 = dateTimeParts1[1].split(':'),
    dateParts1 = dateTimeParts1[0].split('-');
    
    var dateString2 = fecha2,
    dateTimeParts2 = dateString2.split(' '),
    timeParts2 = dateTimeParts2[1].split(':'),
    dateParts2 = dateTimeParts2[0].split('-');
    if ((dateParts1[0]==dateParts2[0])&&(dateParts1[1]==dateParts2[1])&&(dateParts1[2]==dateParts2[2]))
        {
            //console.log("fechas iguales");
            return 1;
        }
    else
        return 0;
        //console.log("Fechas Distintas");
}
				

$.post(databaseUrl, {
operacion: "contactos", id_grupo: id_grupo
}).done(function(dat) {
	obj = $.parseJSON(dat);
    contactos = obj.length;
	$.post(databaseUrl,{ operacion:"procesados",seler:seler_name}).done(function(data){
		obj1 = $.parseJSON(data);
		procesados = obj1.length;
		$.post(databaseUrl,{ operacion:"aceptados",seler:seler_name}).done(function(data2){
		obj2 = $.parseJSON(data2);
		aceptados = obj2.length;
		$.post(databaseUrl,{ operacion:"rechazados",seler:seler_name}).done(function(data3){
		obj3 = $.parseJSON(data3);
		rechazados =obj3.length;
			// diagrama pie
			Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Prospectación General de clientes Obtenidos en la Web'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Porcentaje',
        colorByPoint: true,
        data: [{
            name: 'Prospectos no Atendidos',
            y: contactos
        }, {
            name: 'Prospectos en proceso de venta',
            y: procesados,
            sliced: true,
            selected: true
        }, {
            name: 'Prospectos con venta Concretada',
            y: aceptados
        }, {
            name: 'Prospectos con venta rechazada',
            y: rechazados
        }]
    }]
});
			//Diagrama de ventas 
			Highcharts.chart('container2', {
    chart: {
        type: 'funnel',
        marginRight: 100
    },
    title: {
        text: 'Resumen de Ventas',
        x: -50
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                softConnector: true
            },
            neckWidth: '30%',
            neckHeight: '25%'

            //-- Other available options
            // height: pixels or percent
            // width: pixels or percent
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Usuarios en esta sección',
        data: [
            ['Total de requerimientos', procesados+aceptados+rechazados+contactos  ],
            ['Peticiones sin Respuesta', contactos],
            ['Peticiones en Proceso', procesados],
            ['Peticiones con venta exitosa', aceptados],
            ['Peticiones con venta fallida', rechazados]
        ]
    }]
});
	});   
	});   
	});    
});
