

function upTo(el, tagName) {
    tagName = tagName.toLowerCase();

    while (el && el.parentNode) {
        el = el.parentNode;
        if (el.tagName && el.tagName.toLowerCase() === tagName) {
            return el;
        }
    }

    // Many DOM methods return null if they don't
    // find the element they are searching for
    // It would be OK to omit the following and just
    // return undefined
    return null;
}


function deleted(element) {

    var row = upTo(element, 'tr');
    if (row)
        row.parentNode.removeChild(row);

}


function addItem() {

    var contenido = document.getElementById("contenido2");
    var tr2 = document.createElement("TR");

    var tr = document.createElement("TR");
    if (contenido.getElementsByTagName("TH").length === 0)
    {
        contenido.appendChild(tr2);
        tr2.innerHTML += "<th>Heladeria</th>";
        tr2.innerHTML += "<th>Fecha</th>";
        tr2.innerHTML += "<th>Sabor</th>";
        tr2.innerHTML += "<th>Cantidad</th>";
        tr2.innerHTML += "<th></th>";

    }

    //var head = document.createElement("TH");

    contenido.appendChild(tr);

    //var th = document.createElement("TD");
    var option = ["heladerias", "sabores"];
    var valor = document.getElementById("sabor_calorias");
    var fecha = document.getElementById("fecha");


    for (var i = 0; i <= 0; i++) {

        var input = document.getElementById(option[i]).selectedIndex;
        var input2 = document.getElementById(option[i]).options;

        tr.innerHTML += "<td>" + input2[input].text + "</td>";
        tr.innerHTML += "<td>" + fecha.value + "</td>";

        for (var j = 1; j <= 1; j++) {

            input = document.getElementById(option[j]).selectedIndex;
            input2 = document.getElementById(option[j]).options;
            tr.innerHTML += "<td>" + input2[input].text + "</td>";
            tr.innerHTML += "<td>" + valor.value + "</td>";
            tr.innerHTML += "<td id ='unico'> <input type='button' class='borrar' value='x' onclick='deleted(this)'/> </td>";

        }


    }

}


// Javascript: Inicializacion de Objeto PERSONA Instanciado con Llaves
SABOR = {};
//TODO: Recordar poner mas comentarios
// Creacion de un Metodo insertar() en el Objeto PERSONA
SABOR.insertar = function () {
    // Instanciar el Objeto AJAX que existe en todos los Navegadores Web
    var xhr = new XMLHttpRequest();
    // Metodo INSERTAR, Accion PersonaServer
    xhr.open("POST", "conexion3");

    //xhr.setRequestHeader('enctype', 'multipart/form-data');
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    // Metodo Respuesta que se ejecuta en y muestra al finalizar el AJAX.
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { // Caso de OK 
        


        } // Lista de codigos de error https://tools.ietf.org/html/rfc7231

    };


    // objeto para enviar los parametros del formulario
    var sabor = {}; // new Object();
    //var x = document.getElementById("sabores").selectedIndex;
    //var y = document.getElementById("sabores").options;
    //sabor.nombre = y[x].text;
    sabor.heladerias = document.querySelector("#heladerias").value;
    sabor.fecha = document.querySelector("#fecha").value;
    sabor.sabores = document.querySelector("#sabores").value;
    sabor.calorias = document.querySelector("#sabor_calorias").value;


    // formato del mensaje en JSON
    var personaStringJSON = JSON.stringify(sabor);//transforma los parametros("#sabor_calorias","#sabor_nombre") del objeto sabor en JSON..
    //alert(personaStringJSON);
    // Activa el Envio por Red del Ajax
    xhr.send(personaStringJSON);
};



SABOR.consultar = function () {
    SABOR.insertar();
    // Instanciar el Objeto AJAX que existe en todos los Navegadores Web
    var xhr = new XMLHttpRequest();
    // Metodo INSERTAR, Accion PersonaServer
    xhr.open("GET", "conexion3");

    //xhr.setRequestHeader('enctype', 'multipart/form-data');

    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    // Metodo Respuesta que se ejecuta en y muestra al finalizar el AJAX.
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { // Caso de OK 

             
            //var myElem = document.getElementById('respuesta');
            var json = JSON.stringify(xhr.responseText);
            /*var parse = JSON.parse(json), patron = /[OK\[\]]/g, nuevoValor = "", nuevaCadena = parse.replace(patron, nuevoValor);*/
            var parse = JSON.parse(json), patron = /\[OK\]/, nuevaCadena = parse.split(patron);
            var replace = [];
            //var imprimir = [];
            var eliminar = [];


            for (var i = 0; i < nuevaCadena.length; ++i) {

                replace += nuevaCadena[i].replace(/\[OK\]/g, "");

                eliminar += nuevaCadena.splice(0, 2);

            }

            //alert(parse);
            //alert(replace);
            //alert(eliminar);

            //imprimir = nuevaCadena.join("").replace(/<br>/g, "");
            var prueba = {};
            prueba = nuevaCadena[nuevaCadena.length - 1].replace(/<br>/g, "").split(",");
            prueba.venta =  prueba[0] ;
            prueba.fecha = prueba[1];
            prueba.heladeria = prueba[2];

            //prueba.base.split(",");

            //if (myElem === null) {
            var contenido = document.getElementById("contenido");
            var tr2 = document.createElement("TR");
            var tr1 = document.createElement("TR");
           
           

            if (contenido.getElementsByTagName("TH").length === 0)
            {
                contenido.appendChild(tr2);
                tr2.innerHTML += "<th>Heladeria</th>";
                tr2.innerHTML += "<th>Fecha</th>";
                tr2.innerHTML += "<th>ID</th>";
                
                 
            } 
                
                 
                var template = "<td>{{heladeria}}</td>" + "<td>{{fecha}}</td> " + "<td>{{venta}}</td>";
               
               
                document.querySelector('#contenido').innerHTML +=  Mustache.render(template, prueba);
                      
                 
                 

            //document.querySelector("p").innerHTML += "<p id='respuesta'>" + prueba + "</p>";

            //}
            //var respuesta = document.querySelector("#contenido2");
            //var personaStringJSON = JSON.stringify(sabor);
            //respuesta.innerHTML += xhr.responseText;  



        } // Lista de codigos de error https://tools.ietf.org/html/rfc7231


    };

    // Activa el Envio por Red del Ajax
    xhr.send();
    
};

SABOR.limpiar = function () {
   
    document.getElementById("contenido").innerHTML = "";
    document.getElementById("contenido2").innerHTML = "";
    
};

SABOR.inicializar = function () {

    var elemConsultar = document.querySelector('#btnConsultar');
    elemConsultar.setAttribute('onclick', "SABOR.consultar();");
    var elemLimpiar = document.querySelector('#limpiar');
    elemLimpiar.setAttribute('onclick', "SABOR.limpiar();");

};

SABOR.inicializar();





