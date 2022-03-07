/*
  Viewport argument key "minimal-ui" not recognized and ignored.  
}*/

/*  funció per eliminar el menú si hi clicam damunt */
var boxMenu = document.getElementById("boxTextoMenu");
boxMenu.addEventListener('click', function () {
  boxMenu.parentNode.removeChild(boxMenu);
});



function crearGaleria() {
  var idClicat;
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
        document.getElementById("sala").append(boxQuadre);
        crearMarcos(dades,i);
        //marco
        /*
        var marcoEsq = document.createElement("a-box");
        marcoEsq.setAttribute('src', "assets/marco.jpg");
        marcoEsq.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z})
       if(dades[i].pared == 0){
        marcoEsq.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z +2.7})
       }else {
        crearMarcos(dades,i);
        marcoEsq.setAttribute('position', { x: dades[i].position_x -2.7, y: dades[i].position_y, z: dades[i].position_z})
       }
        marcoEsq.setAttribute('depth', dades[i].depth);
        marcoEsq.setAttribute('width', "0.4");
        marcoEsq.setAttribute('height', dades[i].height + 0.5);
        marcoEsq.setAttribute('rotation', dades[i].orientacioMarco);
        document.getElementById("sala").append(marcoEsq);


        var marcoDre = document.createElement("a-box");
        marcoDre.setAttribute('src', "assets/marco.jpg");
        if (dades[i].pared == 0) {
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
        document.getElementById("sala").append(marcoInf);*/

        /* VENTANA POP UP ALS QUADRES */
        var boxPopUp = document.createElement("a-box");
        var boxTancarPopUp = document.createElement("a-box");

        /* FUNCIÓ OBRIR POP UP QUAN CLICAM QUADRE */
        boxQuadre.addEventListener('click', function () {
          //document.getElementById("camera").setAttribute('wasd-controls', true); ho faig aixi?
          //document.getElementById("camera").removeAttribute('wasd-controls');


          var pos = document.getElementById("camera").getAttribute('position');
          var rotationCamera = document.getElementById("camera").getAttribute('rotation');

          console.log("posicio camara normal:");
          console.log(pos);

          var posProva = new THREE.Vector3(pos.x, pos.y, pos.z);

          posProva = posProva.clone().negate().normalize().multiplyScalar(1.5);

          console.log("posicio rara vector3:");
          console.log(posProva);
          /*var provaBox = document.createElement("a-box");
          marcoInf.setAttribute('color', "yellow");
          provaBox.setAttribute('position', positionStack)
          provaBox.setAttribute('depth', "0.8");
          provaBox.setAttribute('width', "0.1");
          provaBox.setAttribute('height', "0.5");
          document.getElementById("sala").append(provaBox); */

          console.log("Rotació camara:");
          console.log(rotationCamera);
          boxPopUp.setAttribute('color', "purple");
          var XposBox = Math.sin(rotationCamera.y) + pos.x;
          var ZposBox = Math.cos(rotationCamera.y) + pos.z;
          if (rotationCamera.y > 0) { //estic mirant cap a l'esquerra
            XposBox = XposBox - 3;
            ZposBox = ZposBox - 1.5;
          } else if (rotationCamera.y < 0) { //mirar cas = 0?? // aqui estic mirant cap a la dreta
            XposBox = XposBox + 1.5;
            ZposBox = ZposBox - 1.5;
          }
          console.log("Posició box:");
          console.log(XposBox, pos.y, ZposBox);

          boxPopUp.setAttribute('position', { x: XposBox, y: pos.y, z: ZposBox });
          // boxPopUp.setAttribute('position', posProva);

          boxPopUp.setAttribute('rotation', rotationCamera);
          boxPopUp.setAttribute('depth', 0.1);
          boxPopUp.setAttribute('width', 4);
          boxPopUp.setAttribute('height', 2);
          document.getElementById("sala").append(boxPopUp); //jaume diu q append a camera i no a sala

          //CREAM BOX QUE SERVIRÀ PER TANCAR POP UP
          /*boxTancarPopUp.setAttribute('color', "red");
          boxTancarPopUp.setAttribute('class', "clickable")
          boxTancarPopUp.setAttribute('position', { x: XposBox, y: pos.y + 1.5, z: ZposBox });
          boxTancarPopUp.setAttribute('rotation', rotationCamera);
          boxTancarPopUp.setAttribute('depth', 0.1);
          boxTancarPopUp.setAttribute('width', 1);
          boxTancarPopUp.setAttribute('height', 1);
          document.getElementById("sala").append(boxTancarPopUp);*/

        });

        /* FUNCIÓ TANCAR POP UP QUAN CLICAM CREU */
        boxTancarPopUp.addEventListener('click', function (e) {
          document.getElementById("camera").setAttribute('wasd-controls', true);
          boxTancarPopUp.parentNode.removeChild(boxTancarPopUp);
          boxPopUp.parentNode.removeChild(boxPopUp);
        });
      });
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function crearMarcos(dades, i) {
  console.log("hola!!!!");
  var marcoEsq = document.createElement("a-box");
  marcoEsq.setAttribute('src', "assets/marco.jpg");
  marcoEsq.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z })
  if (dades[i].pared == 0) {
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
  if (dades[i].pared == 0) {
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




