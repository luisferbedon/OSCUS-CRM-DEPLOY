vendedor = "Andres Perez";

function add_analize(container, box_data, img_src){
	img = $('<img/>',{
			class: "responsive-img",
			src: img_src,
			style:"padding-top:5%; width:70%"
	});		
	ul = $('<ul/>',{
			class: "collection left-align"			
	});		
	$.each(box_data, function(index, val){
		li = $('<li/>',{
			class: "collection-item avatar"
		});
		i1 = $('<i/>',{
			class: "material-icons circle " + val.color,
			html: val.icon_left
		});
		span = $('<span/>',{
			class: "title",
			html: val.title
		});
		p = $('<p/>',{
			html: val.total
		});
		a = $('<a/>',{
			class: "secondary-content"
		});
		i2 = $('<i/>',{
			class: "material-icons",
			html: val.icon_right
		});
		a.append(i2);
		li.append(i1)
			.append(span)
			.append(p)
			.append(a)
			.appendTo(ul);		
	});
	container.append(img);
	container.append(ul);
}

function add_chart(container, info, brand, seller){
	var chart = Highcharts.chart(container, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Reporte de ventas de ' + seller
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
			name: brand,
        	colorByPoint: true,
        	data: info
		}],
		responsive: {
        	rules: [{
            	condition: {
                	maxWidth: 500
            	},
            	chartOptions: {
                	legend: {
                    	align: 'center',
                    	verticalAlign: 'bottom',
                    	layout: 'horizontal'
                	},
                	yAxis: {
                    	labels: {
                        	align: 'left',
                        	x: 0,
                        	y: -5
                    	},
                    	title: {
                        	text: null
                    	}
                	},
                	subtitle: {
                    	text: null
                	},
                	credits: {
                    	enabled: false
                	}	
            	}
        	}]
    	}
    });	
}

$(function () {	
	$.post( "http://smartmanagement.ec/fundelcrm/user/database.php",{ seller: vendedor }).done(function(dat) {		
		obj = $.parseJSON(dat);
		cont1 = "col-right";
		cont2 = $('#col-left');
		source = "http://smartmanagement.ec/foto.PNG";	
		data = [];		
		data.push(
			{color : "yellow", icon_left : "assignment", title : "Ventas en proceso", total : "total: " + obj[0].y, icon_right : "account_circle"},
			{color : "green", icon_left : "assignment_turned_in", title : "Ventas concretadas", total : "total: " + obj[1].y, icon_right : "check_circle"},
			{color : "red", icon_left : "assignment_returned", title : "Ventas no concretadas", total : "total: " + obj[2].y, icon_right : "cancel"
		});	
		add_chart(cont1, obj, 'Marcas', vendedor);
		add_analize(cont2, data, source);				
    });		
});
