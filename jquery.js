$(document).ready(function () {
  //CREACION DE VARIABLES
  var cantidadCoches = []; //ARRAY DE COCHES QUE VAMOS A MOSTRAR Y ANIMAR
  var posiciones = []; //ARRAY DE POSICIONES QUE REGISTRARÁ lA TABLA DE RESULTADOS
  $("#tablaResultados").hide();


  //OCULTAMOS REINICIAR
  $("#reiniciar").hide();

  //FUNCIÓN PARA CREAR LOS COCHES Y PINTARLOS
  function crearCoches() {
    $("#carrera").empty();
    arrayCoches = new Array();
    for (let i = 1; i <= cantidadCoches; i++) {
      arrayCoches[i] = `<div id='carretera${i}' class='pista'><img id='coche${i}' class='car' src='img/car${i}.png'></img></div>`;
    }
    $("#carrera").append(arrayCoches);
    $("#tablaResultados").hide();
  }

  //FUNCIÓN PARA AGREGAR FILA A LA TABLA DE RESULTADOS
  function agregarFilaTabla(posicion, coche) {
    var fila = `<tr><td>${posicion}</td><td>${coche}</td></tr>`;
    $("#tablaResultados tbody").append(fila);
  }

  //SELECCIONAR CANTIDAD DE COCHES
  $("#cantidadCoches").change(function () {
    cantidadCoches = parseInt($("#cantidadCoches").val());
    crearCoches();
  });

  //INICIAR CARRERA
  $("#iniciarCarrera").click(function () {
    //ENSEÑAMOS REINICIAR
    $("#reiniciar").show();
    //OCULTAMOS INICIAR
    $(this).hide();
    //ANIMAMOS LOS COCHES
    for (let i = 1; i <= cantidadCoches; i++) {
      var velocidad = Math.floor(Math.random() * 10);
      $("#coche" + i).animate(
        { left: "+=95%" },
        velocidad * 1000,
        function () {
          //AGREGAMOS LA LLEGADA DE CADA COCHE A LA TABLA DE RESULTADOS
          posiciones.push("#coche" + i);
          if (posiciones.length === cantidadCoches) {
            //CUANDO TODOS LOS COCHES HAN LLEGADO A LA META VACIAMOS LA TABLA ANTERIOR (si la hubiera)
            //AGREGAMOS LAS FILAS Y MOSTRAMOS LA TABLA
            $("#tablaResultados tbody").empty();
            for (let j = 0; j < posiciones.length; j++) {
              var coche = posiciones[j].substring(1);
              agregarFilaTabla(j + 1, coche);
            }
            $("#tablaResultados").show();
          }
        }
      );
    }
  });

  //REINICIAR CARRERA
  $("#reiniciar").click(function () {
    $(this).hide();
    $("#iniciarCarrera").show();
    posiciones = [];
    $("#tablaResultados").hide();
    for (let i = 1; i <= cantidadCoches; i++) {
      $("#coche" + i).stop();
      $("#coche" + i).animate({ left: "0px" }, 1000);
    }
  });
});

  





