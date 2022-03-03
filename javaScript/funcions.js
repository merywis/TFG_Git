/*
  Viewport argument key "minimal-ui" not recognized and ignored.  
}*/

/*  funció per eliminar el menú si hi clicam damunt */
var boxMenu = document.getElementById("boxTextoMenu");
boxMenu.addEventListener('click', function () {
  boxMenu.parentNode.removeChild(boxMenu);
  console.log("hola")
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
        var Overlay = document.createElement("div");
        Overlay.setAttribute('class', "overlay");
        Overlay.setAttribute('id', "overlay");

        var popUp = document.createElement("div");
        popUp.setAttribute('class', "popup");
        popUp.setAttribute('id', "popup");
        Overlay.appendChild(popUp);

        var btnTancar = document.createElement("a");
        btnTancar.setAttribute('class', "btn-cerrar-popup");
        btnTancar.setAttribute('id', "btn-cerrar-popup");
        btnTancar.setAttribute('href', "#");
        popUp.appendChild(btnTancar);

        var btnIcono = document.createElement("i");
        btnIcono.setAttribute('class', "fas fa-times");
        btnTancar.appendChild(btnIcono);

        /* *****començam amb el contingut del pop up *** */

        var contingutPopUP = document.createElement("div");
        contingutPopUP.setAttribute('class', "contenedor");
        // texteGran.setAttribute('id', "popup");
        popUp.appendChild(contingutPopUP);

        /* ANTES var titol = document.createElement("h3");
        var newContent = document.createTextNode("Hola!!!¿Qué tal?");
        titol.appendChild(newContent);
        popUp.appendChild(titol);*/
        
        var headerPrincipal = document.createElement("header");
        headerPrincipal.setAttribute('class',"header");
        var newContent = document.createTextNode("ESPAI DEL HEADER");
        headerPrincipal.appendChild(newContent);
        contingutPopUP.appendChild(headerPrincipal);

        var contingutEsq = document.createElement("div");
        contingutEsq.setAttribute('class', "contenido");
        contingutPopUP.appendChild(contingutEsq);

        var titolEsq = document.createElement("h1");
        var newContent4 = document.createTextNode("Contenido esquerra");
        titolEsq.appendChild(newContent4);
        contingutEsq.appendChild(titolEsq);

        var contingutDreta = document.createElement("div");
        contingutDreta.setAttribute('class', "sidebar");
        contingutPopUP.appendChild(contingutDreta);
        
        var titolDreta = document.createElement("h3");
        var newContent5 = document.createTextNode("Contenido dreta");
        titolDreta.appendChild(newContent5);
        contingutDreta.appendChild(titolDreta);

        var footer = document.createElement("footer");
        footer.setAttribute('class', "footer");
        contingutPopUP.appendChild(footer);

        var titolFooter = document.createElement("h3");
        var newContent6 = document.createTextNode("Contenido footer");
        titolFooter.appendChild(newContent6);
        footer.appendChild(titolFooter);

        /*var titol2 = document.createElement("h4");
        var newContent2 = document.createTextNode("Info sobre el contingut quadre");
        titol2.appendChild(newContent2);
        popUp.appendChild(titol2);*/
        /*

        <div class="contenedor">
    <header class="header">
      <h2>HEADER</h2>
    </header>
    <main class="contenido">
      <h1>Contenido</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis rutrum gravida. Aliquam vel nunc sit amet nibh aliquam sollicitudin eu vitae elit. Duis varius turpis est, at feugiat metus blandit non. Mauris est nunc, ullamcorper nec egestas at, faucibus ac ex. Cras gravida ut odio eget vulputate. Suspendisse ut nunc cursus, vulputate tortor id, mollis magna. Proin mattis euismod magna. Suspendisse mattis, nunc vitae mattis iaculis, elit massa facilisis magna, ac consequat magna lacus sit amet lectus. Suspendisse a lacinia est, a semper turpis. Phasellus lobortis eget nibh in scelerisque. Morbi feugiat volutpat nisl, vehicula commodo augue volutpat at. Aenean aliquet tristique diam. Aenean maximus, quam non sollicitudin efficitur, est sapien pharetra odio, eget aliquam justo urna eu eros. Donec nec tincidunt tortor.
      </p>
    </main>
    <aside class="sidebar">
      <h3>SIDEBAR</h3>
    </aside>
    <div class="widget-1">
      <h3>WIDGET 1</h3>
    </div>
    <div class="widget-2">
      <h3>WIDGET 2</h3>
    </div>
    <footer class="footer">
      <h3>FOOTER</h3>
    </footer>
  </div>
        */

        document.getElementById("sala").append(Overlay);

        boxQuadre.addEventListener('click', function () {
          Overlay.classList.add('active');
          popUp.classList.add('active');
        });

        btnTancar.addEventListener('click', function (e) {
          e.preventDefault(); //si llev aquesta línea, he de llevarli la "e" com a paràmetre
          Overlay.classList.remove('active');
          popUp.classList.remove('active');
        });

      });
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}




