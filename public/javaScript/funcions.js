document.addEventListener("DOMContentLoaded", function (event) {
    //código a ejecutar cuando el DOM está listo para recibir acciones
    var escenaPrincipal = document.getElementById("sala");
    if (escenaPrincipal.hasLoaded) {
        init();
    } else {
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
    document.getElementById("camera").appendChild(menuPrincipal);
}


/*  funció per eliminar el menú si hi clicam damunt */
menuPrincipal.addEventListener('click', function () { // nou ** llevar el cursor de l'escena,
    menuPrincipal.remove();
    document.querySelector('a-scene').removeAttribute('cursor');
    //  document.querySelector('a-scene').removeAttribute('sound');
    document.getElementById("camera").setAttribute('look-controls', { pointerLockEnabled: true }); //("look-controls","pointerLockEnabled", true);
    document.querySelector('canvas').requestPointerLock(); //per canviar en un sol click de mouse a cursor virtual
});

function init() {
    menuInicial();
    var xmlhttp = new XMLHttpRequest();
    var url = "dades.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var dades = JSON.parse(xmlhttp.responseText);

            Object.keys(dades).forEach(i => {
                //marcos
                crearMarcos(dades, i);

                var boxQuadre = document.createElement("a-box");
                boxQuadre.setAttribute('class', "clickable")
                boxQuadre.setAttribute('src', dades[i].imatge);
                boxQuadre.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z });
                boxQuadre.setAttribute('depth', dades[i].depth);
                boxQuadre.setAttribute('width', dades[i].width);
                boxQuadre.setAttribute('height', dades[i].height);
                boxQuadre.setAttribute('rotation', dades[i].orientacioMarco);

                //animacions marcos
                var marcoEsq = document.getElementById("marcoEsq" + i);
                var marcoDre = document.getElementById("marcoDre" + i);
                var marcoSup = document.getElementById("marcoSup" + i);
                var marcoInf = document.getElementById("marcoInf" + i);

                boxQuadre.addEventListener('mouseenter', function () {
                    marcoEsq.emit('iniciEnfoque');
                    marcoDre.emit('iniciEnfoque');
                    marcoSup.emit('iniciEnfoque');
                    marcoInf.emit('iniciEnfoque');
                });

                boxQuadre.addEventListener('mouseleave', function () {
                    marcoEsq.emit('finalEnfoque');
                    marcoDre.emit('finalEnfoque');
                    marcoSup.emit('finalEnfoque');
                    marcoInf.emit('finalEnfoque');
                });


                ferPopUps(boxQuadre, dades, i);
                document.getElementById("sala").appendChild(boxQuadre);


                /*FRASES PAREDS*/
                var frasePared = document.createElement("a-entity");
                if (dades[i].pared == 0) {
                    frasePared.setAttribute('rotation', dades[i].orientacioMarco);
                    frasePared.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z - 10 })
                } else if (dades[i].pared == 2) {
                    frasePared.setAttribute('rotation', "0 -90 0");
                    frasePared.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z + 10 })
                } else {
                    frasePared.setAttribute('rotation', dades[i].orientacioMarco);
                    frasePared.setAttribute('position', { x: dades[i].position_x + 10, y: dades[i].position_y, z: dades[i].position_z })
                }
                frasePared.setAttribute('text', "value:" + dades[i].frase + "; color: black; width: 13; wrapCount: 45; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/italianno/Italianno-Regular.json");
                document.getElementById("sala").appendChild(frasePared);
            });
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/* FUNCIÓ PER CREAR EL QUADRE DELS MARCOS */
//fer una box grossa al fons del quadre com a marco??
function crearMarcos(dades, i) {

    var marcoEsq = document.createElement("a-box");
    marcoEsq.setAttribute('id', "marcoEsq" + i);
    //marcoEsq.setAttribute('src', "assets/marco.jpg");
    marcoEsq.setAttribute('color', "black");
    if (dades[i].pared == 0 || dades[i].pared == 2) {
        marcoEsq.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z + 2.6 });
    } else {
        marcoEsq.setAttribute('position', { x: dades[i].position_x - 2.6, y: dades[i].position_y, z: dades[i].position_z });
    }
    marcoEsq.setAttribute('depth', dades[i].depth);
    marcoEsq.setAttribute('width', "0.2");
    marcoEsq.setAttribute('height', dades[i].height);
    marcoEsq.setAttribute('rotation', dades[i].orientacioMarco);
    marcoEsq.setAttribute('animation', "property: material.color; startEvents: iniciEnfoque; easing: easeInCubic; dur: 500; dir: alternate; from:#000; to:#F5FAAB");
    marcoEsq.setAttribute('animation__2', "property: material.color; startEvents: finalEnfoque; easing: easeInCubic; dur: 500; dir: alternate; from:#F5FAAB; to:#000");

    document.getElementById("sala").appendChild(marcoEsq);

    var marcoDre = document.createElement("a-box");
    marcoDre.setAttribute('id', "marcoDre" + i);
    // marcoDre.setAttribute('src', "assets/marco.jpg");
    marcoDre.setAttribute('color', "black");
    if (dades[i].pared == 0 || dades[i].pared == 2) {
        marcoDre.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y, z: dades[i].position_z - 2.6 });
    } else {
        marcoDre.setAttribute('position', { x: dades[i].position_x + 2.6, y: dades[i].position_y, z: dades[i].position_z });
    }
    marcoDre.setAttribute('depth', dades[i].depth);
    marcoDre.setAttribute('width', "0.2");
    marcoDre.setAttribute('height', dades[i].height);
    marcoDre.setAttribute('rotation', dades[i].orientacioMarco);
    marcoDre.setAttribute('animation', "property: material.color; startEvents: iniciEnfoque;  easing: easeInCubic; dur: 500; dir: alternate; from:#000; to:#F5FAAB");
    marcoDre.setAttribute('animation__2', "property: material.color; startEvents: finalEnfoque; easing: easeInCubic; dur: 500; dir: alternate; from:#F5FAAB; to:#000");

    document.getElementById("sala").appendChild(marcoDre);

    var marcoSup = document.createElement("a-box");
    marcoSup.setAttribute('id', "marcoSup" + i);
    //marcoSup.setAttribute('src', "assets/marco.jpg");
    marcoSup.setAttribute('color', "black");
    marcoSup.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y + 3.6, z: dades[i].position_z });
    marcoSup.setAttribute('depth', dades[i].depth);
    marcoSup.setAttribute('width', dades[i].width + 0.4);
    marcoSup.setAttribute('height', "0.2");
    marcoSup.setAttribute('rotation', dades[i].orientacioMarco);
    marcoSup.setAttribute('animation', "property: material.color; startEvents: iniciEnfoque; easing: easeInCubic; dur: 500; dir: alternate; from:#000; to:#F5FAAB");
    marcoSup.setAttribute('animation__2', "property: material.color; startEvents: finalEnfoque; easing: easeInCubic; dur: 500; dir: alternate; from:#F5FAAB; to:#000");

    document.getElementById("sala").appendChild(marcoSup);

    var marcoInf = document.createElement("a-box");
    marcoInf.setAttribute('id', "marcoInf" + i);
    // marcoInf.setAttribute('src', "assets/marco.jpg");
    marcoInf.setAttribute('color', "black");
    marcoInf.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y - 3.6, z: dades[i].position_z });
    marcoInf.setAttribute('depth', dades[i].depth);
    marcoInf.setAttribute('width', dades[i].width + 0.4);
    marcoInf.setAttribute('height', "0.2");
    marcoInf.setAttribute('rotation', dades[i].orientacioMarco);
    marcoInf.setAttribute('animation', "property: material.color; startEvents: iniciEnfoque; easing: easeInCubic; dur: 500; dir: alternate; from:#000; to:#F5FAAB");
    marcoInf.setAttribute('animation__2', "property: material.color; startEvents: finalEnfoque; easing: easeInCubic; dur: 500; dir: alternate; from:#F5FAAB; to:#000");

    document.getElementById("sala").appendChild(marcoInf);

    var ombraQuadre = document.createElement("a-plane");
    //ombraQuadre.setAttribute('id', "boxTextoMenu");
    ombraQuadre.setAttribute('color', "#838383");
    ombraQuadre.setAttribute('position', { x: dades[i].position_x, y: dades[i].position_y - 3.9, z: dades[i].position_z });
    ombraQuadre.setAttribute('rotation', dades[i].orientacioMarco);
    ombraQuadre.setAttribute('width', dades[i].width + 0.6);
    ombraQuadre.setAttribute('height', "0.5");
    ombraQuadre.setAttribute('material', "side: double");
    document.getElementById("sala").appendChild(ombraQuadre);

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
        circleTancarPopUp.setAttribute('position', { x: 2.5, y: 1.3, z: 0.1 });
        circleTancarPopUp.setAttribute('radius', 0.25);
        tancarPopUps(circleTancarPopUp, planePopUp);
        planePopUp.appendChild(circleTancarPopUp);


        //PLANO PER POSAR QUADRE DONA
        var imatgePopUp = document.createElement("a-plane");
        imatgePopUp.setAttribute('src', dades[i].imatge);
        imatgePopUp.setAttribute('position', { x: -1.5, y: 0, z: 0.1 });
        imatgePopUp.setAttribute('width', 2.3);
        imatgePopUp.setAttribute('height', 2.7);
        imatgePopUp.setAttribute('material', "side: double");
        planePopUp.appendChild(imatgePopUp);


        //Nom dona + biografia
        var nomPopUp = document.createElement("a-entity");
        nomPopUp.setAttribute('scale', "1 1 2");
        nomPopUp.setAttribute('position', { x: 1.5, y: 1, z: 0.25 })
        nomPopUp.setAttribute('text', "value:" + dades[i].nom + "; color: black; width: 2; wrapCount: 15; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/notoserif/NotoSerif-Regular.json");
        planePopUp.appendChild(nomPopUp);

        var biografiaPopUp = document.createElement("a-entity");
        biografiaPopUp.setAttribute('scale', "1 1 2");
        biografiaPopUp.setAttribute('position', { x: 1.2, y: 0, z: 0.25 })
        biografiaPopUp.setAttribute('text', "value:" + dades[i].biografies.biografiaCat + "; color: black; width: 2.5; wrapCount: 50; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/notoserif/NotoSerif-Regular.json");
        planePopUp.appendChild(biografiaPopUp);


        //AUDIO DINS POP UP
        var regioAudioPopUp = document.createElement("a-plane");
        regioAudioPopUp.setAttribute('id', "regioAudioPopUp");
        regioAudioPopUp.setAttribute('width', 2);
        regioAudioPopUp.setAttribute('height', 0.2);
        regioAudioPopUp.setAttribute('position', { x: 1.2, y: -1.2, z: 0.25 });
        regioAudioPopUp.setAttribute('color', "white");
     //   regioAudioPopUp.setAttribute('sound', "src: #audioTomeu; on: click; poolSize: 3");
        planePopUp.appendChild(regioAudioPopUp);

        var audioProgresPopUp = document.createElement("a-plane");
        audioProgresPopUp.setAttribute('id', "audioProgresPopUp");
       // audioProgresPopUp.setAttribute('class', "clickable");
        audioProgresPopUp.setAttribute('width', 0.1);
        audioProgresPopUp.setAttribute('height', 0.2);
        audioProgresPopUp.setAttribute('position', { x: -0.95, y: 0, z: 0.01});
        audioProgresPopUp.setAttribute('color', "red");
        regioAudioPopUp.appendChild(audioProgresPopUp);


    /* //Creació de barra progrés
    var barraProgres = document.createElement("div");
    barraProgres.setAttribute('class', "video-progress");

    var progresCompletat = document.createElement("div");
    progresCompletat.setAttribute('class', "video-progress-filled");

    barraProgres.appendChild(progresCompletat);
    playerControls.appendChild(barraProgres);
    
    //eventListener que va pintant la barra de progrés a mesura que es va reproduint el vídeo
    video.addEventListener("timeupdate", () => {
        const percentatge = (video.currentTime / video.duration) * 100;
        progresCompletat.style.width = ${percentatge}%;
        consultaTempsPregunta(video.currentTime);
    });
    */


        var buttonPlayPopUp = document.createElement("a-image");
        buttonPlayPopUp.setAttribute('id', "audioControls");
        buttonPlayPopUp.setAttribute('src', "#play");
        buttonPlayPopUp.setAttribute('class', "clickable");
        buttonPlayPopUp.setAttribute('position',  { x: -1.1, y: 0, z: 0 });
        buttonPlayPopUp.setAttribute('scale', "0.2 0.2 0.2");
        buttonPlayPopUp.setAttribute('play-pause', "audio: " + dades[i].audios.audioCat);
        regioAudioPopUp.appendChild(buttonPlayPopUp);
       


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


AFRAME.registerComponent('play-pause', {

    schema: {
        audio: { type: 'audio', src: 'assets/audios/audioTomeu.mp3' },
        //color: { default: '#FFF' }
    },

    init: function () {
        //var video = document.querySelector("#audioTomeu");
        var audioPopUp = document.querySelector("#audioBiografia");
        var audioProgresPopUp = document.querySelector("#audioProgresPopUp");
        var regioAudioPopUp = document.querySelector("#regioAudioPopUp");
        
        console.log(audioPopUp);
        audioPopUp.setAttribute('src', this.data.audio); //li posam com a src lo que mos han passat x paràmetre

        audioPopUp.addEventListener("canplaythrough", event => {
            /* the audio is now playable; play it if permissions allow */
            var minAudio = audioPopUp.duration/60;
            console.log("duracion audio es "+ minAudio);
        });
        var canvi = 0.2;
        audioPopUp.addEventListener("timeupdate", () => {
            console.log("hola current time "+audioPopUp.currentTime + " duration "+audioPopUp.duration);
           // console.log("hola width total "+regioAudioPopUp.getAttribute('width', "value"));
            const percentatge = (audioPopUp.currentTime / audioPopUp.duration) * 100;
            console.log(" audio percentatge "+ percentatge);
            audioProgresPopUp.setAttribute('width', percentatge);
            //console.log("hola pos x "+ audioProgresPopUp.width);
           canvi = canvi-0.05;
            audioProgresPopUp.setAttribute('position', { x: -0.95-canvi, y: 0, z: 0.01});

        });
 
        var audioControls = document.querySelector("#audioControls");
        //var escena = document.querySelector("#sala");

        this.el.addEventListener('click', function () {
           // escena.removeAttribute('sound');
           audioPopUp.muted = false;
            if (audioPopUp.paused) {
                audioPopUp.play();
                audioControls.setAttribute('src', "#pause");

            } else {
                console.log("regio play")
                audioPopUp.pause();
                audioControls.setAttribute('src', "#play");
            }
        });
    }
});
/*
var botoAudioguia = document.createElement("a-entity");
//menuPrincipal.setAttribute('id', "boxTextoMenu");
botoAudioguia.setAttribute('class', "clickable");
botoAudioguia.setAttribute('position', "-1 1 -5");
botoAudioguia.setAttribute('text', "value: Clica per audio; color: black; width: 6; align:center;");
botoAudioguia.setAttribute('geometry', "primitive: plane; width: 2; height: 0.5");
botoAudioguia.setAttribute('material', "color: #D0B7EE; shader: flat; opacity: 0.7; visible: true");
document.getElementById("sala").append(botoAudioguia);
*/





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



