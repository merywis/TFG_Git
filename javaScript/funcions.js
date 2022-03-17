/* */

document.addEventListener("DOMContentLoaded", function(event) {
  //código a ejecutar cuando el DOM está listo para recibir acciones
  var escenaPrincipal = document.getElementById("sala");
  if(escenaPrincipal.hasLoaded){
    init();
  } else{
    escenaPrincipal.addEventListener('loaded', init());
  }
});

var menuPrincipal = document.createElement("a-entity");
function menuInicial() {
  //menuPrincipal.setAttribute('id', "boxTextoMenu");
  menuPrincipal.setAttribute('class', "clickable");
  menuPrincipal.setAttribute('position', "0 0.3 -3");
  menuPrincipal.setAttribute('scale', "0.5 0.5 1");
  menuPrincipal.setAttribute('text', "value: Benvinguts i benvingudes al museu virtual \n de les dones informatiques de la historia. \n Clica per comencar.; color: black; width: 6; wrapCount: 40; align:center; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/rhodiumlibre/RhodiumLibre-Regular.json");
  menuPrincipal.setAttribute('geometry', "primitive: plane; width: 7; height: 2.5");
  menuPrincipal.setAttribute('material', "color: #D0B7EE; shader: flat; opacity: 0.7; visible: true");
  document.getElementById("sala").append(menuPrincipal);
}
/*
<a-entity 
      event-set__enter="_event: mouseenter; text.color: red"
      event-set__leave="_event: mouseleave; text.color: blue"
      event-set__mouseenter="material.color: blue"
      ></a-entity>
*/

/*  funció per eliminar el menú si hi clicam damunt */
menuPrincipal.addEventListener('click', function () {
  menuPrincipal.remove();
});

function init() {
  menuInicial();
  var xmlhttp = new XMLHttpRequest();
  var url = "dades.json";
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var dades = JSON.parse(xmlhttp.responseText);

      Object.keys(dades).forEach(i => {

        var boxQuadre = document.createElement("a-box");
        boxQuadre.setAttribute('class', "clickable")
        boxQuadre.setAttribute('src', dades[i].imatge);
        boxQuadre.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z });
        boxQuadre.setAttribute('depth', dades[i].depth);
        boxQuadre.setAttribute('width', dades[i].width);
        boxQuadre.setAttribute('height', dades[i].height);
        boxQuadre.setAttribute('rotation', dades[i].orientacioMarco);
        ferPopUps(boxQuadre, dades, i);
        document.getElementById("sala").append(boxQuadre);

        //marco
        crearMarcos(dades, i);

        /*FRASES PAREDS*/
        var frasePared = document.createElement("a-entity");
        if (dades[i].pared == 0) {
          frasePared.setAttribute('rotation', dades[i].orientacioMarco);
          frasePared.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z - 10 })
        } else if (dades[i].pared == 2) {
          frasePared.setAttribute('rotation', "0 -90 0");
          frasePared.setAttribute('position', { x: dades[i].position_x - 1, y: dades[i].position_y, z: dades[i].position_z + 10 })
        } else {
          frasePared.setAttribute('rotation', dades[i].orientacioMarco);
          frasePared.setAttribute('position', { x: dades[i].position_x + 10, y: dades[i].position_y, z: dades[i].position_z })
        }
        frasePared.setAttribute('text', "value: holaaa, aqui hi haura una frase de sa mes xula del món; color: black; width: 12; wrapCount: 25; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/italianno/Italianno-Regular.json");
        document.getElementById("sala").append(frasePared);
      });
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

/* FUNCIÓ PER CREAR EL QUADRE DELS MARCOS */
function crearMarcos(dades, i) {
  var marcoEsq = document.createElement("a-box");
  marcoEsq.setAttribute('src', "assets/marco.jpg");
  marcoEsq.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z })
  if (dades[i].pared == 0 || dades[i].pared == 2) {
    marcoEsq.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z + 2.7 })
  } else {
    marcoEsq.setAttribute('position', { x: dades[i].position_x - 2.7, y: dades[i].position_y, z: dades[i].position_z })
  }
  marcoEsq.setAttribute('depth', dades[i].depth);
  marcoEsq.setAttribute('width', "0.4");
  marcoEsq.setAttribute('height', dades[i].height + 0.5);
  marcoEsq.setAttribute('rotation', dades[i].orientacioMarco);
  document.getElementById("sala").append(marcoEsq);

  var marcoDre = document.createElement("a-box");
  marcoDre.setAttribute('src', "assets/marco.jpg");
  if (dades[i].pared == 0 || dades[i].pared == 2) {
    marcoDre.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z - 2.7 })
  } else {
    marcoDre.setAttribute('position', { x: dades[i].position_x + 2.7, y: dades[i].position_y, z: dades[i].position_z })
  }
  marcoDre.setAttribute('depth', dades[i].depth);
  marcoDre.setAttribute('width', "0.4");
  marcoDre.setAttribute('height', dades[i].height + 0.5);
  marcoDre.setAttribute('rotation', dades[i].orientacioMarco);
  document.getElementById("sala").append(marcoDre);

  var marcoSup = document.createElement("a-box");
  marcoSup.setAttribute('src', "assets/marco.jpg");
  marcoSup.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y + 3.7, z: dades[i].position_z })
  marcoSup.setAttribute('depth', dades[i].depth);
  marcoSup.setAttribute('width', dades[i].width + 0.8);
  marcoSup.setAttribute('height', "0.5");
  marcoSup.setAttribute('rotation', dades[i].orientacioMarco);
  document.getElementById("sala").append(marcoSup);

  var marcoInf = document.createElement("a-box");
  marcoInf.setAttribute('src', "assets/marco.jpg");
  marcoInf.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y - 3.7, z: dades[i].position_z })
  marcoInf.setAttribute('depth', dades[i].depth);
  marcoInf.setAttribute('width', dades[i].width + 0.8);
  marcoInf.setAttribute('height', "0.5");
  marcoInf.setAttribute('rotation', dades[i].orientacioMarco);
  document.getElementById("sala").append(marcoInf);
}


/* FUNCIÓ OBRIR POP UP QUAN CLICAM QUADRE */
function ferPopUps(boxQuadre, dades, i) {
  boxQuadre.addEventListener('click', function () {
    document.getElementById("rig").setAttribute('movement-controls', "enabled: false");
    var rotationCamera = document.getElementById("camera").getAttribute('rotation');

    //PLANO QUE FA DE POP UP
    var planePopUp = document.createElement("a-plane");
    planePopUp.setAttribute('color', "#DEDEDE");
    planePopUp.setAttribute('position', { x: 0, y: 0, z: -3 });
    planePopUp.setAttribute('width', 6);
    planePopUp.setAttribute('height', 3.5);
    planePopUp.setAttribute('material', "side: double");


    //CREAM CIRCLE QUE SERVIRÀ PER TANCAR POP UP
    var circleTancarPopUp = document.createElement("a-circle");
    circleTancarPopUp.setAttribute('src', "assets/creuPopUp.png");
    circleTancarPopUp.setAttribute('class', "clickable")
    circleTancarPopUp.setAttribute('position', {x: 2.5, y: 1.3, z: 0.1});
    circleTancarPopUp.setAttribute('radius', 0.25);
    tancarPopUps(circleTancarPopUp, planePopUp);
    planePopUp.appendChild(circleTancarPopUp);


    //PLANO PER POSAR QUADRE DONA
    var imatgePopUp = document.createElement("a-plane");
    imatgePopUp.setAttribute('src', dades[i].imatge);
    imatgePopUp.setAttribute('position', {x: -1.5, y: 0, z: 0.1});
    imatgePopUp.setAttribute('width', 2.3);
    imatgePopUp.setAttribute('height', 2.7);
    imatgePopUp.setAttribute('material', "side: double");
    planePopUp.appendChild(imatgePopUp);


    //Nom dona + biografia
    var nomPopUp = document.createElement("a-entity");
    nomPopUp.setAttribute('scale', "1 1 2");
    nomPopUp.setAttribute('position', { x: 1.5, y: 1, z: 0.25  })
    nomPopUp.setAttribute('text', "value:"+ dades[i].nom +"; color: black; width: 2; wrapCount: 15; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/notoserif/NotoSerif-Regular.json");
    planePopUp.appendChild(nomPopUp);

    var biografiaPopUp = document.createElement("a-entity");
    biografiaPopUp.setAttribute('scale', "1 1 2");
    biografiaPopUp.setAttribute('position', { x: 1.2, y: 0, z: 0.25  })
    biografiaPopUp.setAttribute('text', "value:"+ dades[i].biografies.biografiaCat +"; color: black; width: 2.4; wrapCount: 35; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/notoserif/NotoSerif-Regular.json");
    planePopUp.appendChild(biografiaPopUp);


    document.getElementById("PopPupSala").setAttribute('rotation', rotationCamera);
    document.getElementById("PopPupSala").appendChild(planePopUp);
  });
}

/* FUNCIÓ TANCAR POP UP QUAN CLICAM CREU */
function tancarPopUps(circleTancarPopUp, planePopUp) {
  circleTancarPopUp.addEventListener('click', function (e) {
    document.getElementById("rig").setAttribute('movement-controls', "enabled: true");
    document.getElementById("PopPupSala").removeChild(planePopUp);
  });
}






/* 
AFRAME.registerComponent('hover-video', {
    schema: {
        value: { default: '' }
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        el.addEventListener('mouseenter', function () {
            var video = document.getElementById("myVideo");
            video.pause();
            console.log("Hola");
        });

        el.addEventListener('mouseleave', function () {
            var video = document.getElementById("myVideo");
            video.play();
            console.log("Adios");
        });
    }
});


*/

/*var XposBox = Math.sin(rotationCamera.y) + pos.x;
var ZposBox = Math.cos(rotationCamera.y) + pos.z;*/



