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
        document.getElementById("sala").append(boxQuadre);

        //marco
        var marcoEsq = document.createElement("a-box");
        marcoEsq.setAttribute('src', "assets/marco.jpg");
        marcoEsq.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z + 2.7 })
        marcoEsq.setAttribute('depth', "0.4");
        marcoEsq.setAttribute('width', "0.1");
        marcoEsq.setAttribute('height', dades[i].height + 0.5);
        document.getElementById("sala").append(marcoEsq);

        var marcoDre = document.createElement("a-box");
        marcoDre.setAttribute('src', "assets/marco.jpg");
        marcoDre.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z - 2.7 })
        marcoDre.setAttribute('depth', "0.4");
        marcoDre.setAttribute('width', "0.1");
        marcoDre.setAttribute('height', dades[i].height + 0.5);
        document.getElementById("sala").append(marcoDre);

        var marcoSup = document.createElement("a-box");
        marcoSup.setAttribute('src', "assets/marco.jpg");
        marcoSup.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y + 3.7, z: dades[i].position_z })
        marcoSup.setAttribute('depth', dades[i].depth + 0.8);
        marcoSup.setAttribute('width', "0.1");
        marcoSup.setAttribute('height', "0.5");
        document.getElementById("sala").append(marcoSup);

        var marcoInf = document.createElement("a-box");
        marcoInf.setAttribute('src', "assets/marco.jpg");
        marcoInf.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y - 3.7, z: dades[i].position_z })
        marcoInf.setAttribute('depth', dades[i].depth + 0.8);
        marcoInf.setAttribute('width', "0.1");
        marcoInf.setAttribute('height', "0.5");
        document.getElementById("sala").append(marcoInf);


        /* VENTANA POP UP ALS QUADRES */
        /*
         var btnTancar = document.createElement("a");
         btnTancar.setAttribute('class', "btn-cerrar-popup");
         btnTancar.setAttribute('id', "btn-cerrar-popup");
         btnTancar.setAttribute('href', "#");
         popUp.appendChild(btnTancar);
 
         var btnIcono = document.createElement("i");
         btnIcono.setAttribute('class', "fas fa-times");
         btnTancar.appendChild(btnIcono);*/



        boxQuadre.addEventListener('click', function () {
          var pos = document.getElementById("camera").getAttribute('position');
          var rotationCamera = document.getElementById("camera").getAttribute('rotation');
          /* var cameraEl = document.querySelector('#camera');
          var worldPos = new THREE.Vector3();
          worldPos.setFromMatrixPosition(cameraEl.object3D.matrixWorld);
          console.log(worldPos.x); */
          console.log("Rotació camara:");
          console.log(rotationCamera);
          var boxPopUp = document.createElement("a-box");
          boxPopUp.setAttribute('color', "purple");
          var XposBox = Math.sin(rotationCamera.y) + pos.x;
          var ZposBox = Math.cos(rotationCamera.y) + pos.z;
          boxPopUp.setAttribute('position', { x: XposBox, y: pos.y, z: ZposBox});
          console.log("Posició box:");
          console.log(pos.x, pos.y, pos.z);
          boxPopUp.setAttribute('rotation', rotationCamera);
          boxPopUp.setAttribute('depth', 0.5);
          boxPopUp.setAttribute('width', 5);
          boxPopUp.setAttribute('height', 3.5);
          document.getElementById("sala").append(boxPopUp); //jaume diu q append a camera i no a sala

        });
        /*
                btnTancar.addEventListener('click', function (e) {
                  e.preventDefault(); //si llev aquesta línea, he de llevarli la "e" com a paràmetre
                  Overlay.classList.remove('active');
                  popUp.classList.remove('active');
                });*/

      });
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}




