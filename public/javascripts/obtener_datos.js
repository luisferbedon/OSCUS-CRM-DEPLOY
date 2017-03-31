var viajes = [];
var viajes_count =0;
$.get( "http://104.197.148.48/api/1.3/index.php/consulta-fecha/9354869057466765/2017-03-06/00:00:00/2017-03-07/00:00:00").done(function(dat) {
    
		console.log('se está obteniendo datos');
        var flag = 0;
		obj = $.parseJSON(dat);
		$.each(obj, function(index, val){
            
        if(val.STAT_POS == "STAT=0")
        {
            flag =1;
        }
        if(val.STAT_POS == "POS=1")
            {
               if(flag == 1)
                   {
                    viajes_count ++;
                   }
                flag=0;
               viajes.push(
                {
                    'trip': viajes_count,
					'latitud': val.GPS_LATITUD,
                    'longitud': val.GPS_LONGITUD,
                    'speed': val.SPEED,
                    'date': val.CURRENT_TIMESTAMP_COL
                }
            );
                
            }
        });
     
        });

//Reportería . Previo Supervición 
//Manteniemiento 
// consolidado de Ventas 
// Dispositivos registrados 
//reportes de velocidad 
// Geocercas 