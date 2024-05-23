
   async function cargarEsqueleto(){
      //Primero leemos el esqueleto y la estructura completa de la web.
     //Se hace fuera de la función, porque quedará fijo y no se vuelve a recargar cada vez
     //que pinche un enlace.
     const esqueleto=await fetch("html/esqueleto.html");
        const htmlEsqueleto=await esqueleto.text();
        var body=document.getElementsByTagName("body");
        body[0].innerHTML=htmlEsqueleto;
   }

    async function cargarContenido(pagina){
        console.log("pagina: "+pagina);
        //Una vez cargado el esqueleto, cargamos en el <main> el contenido de la página que
        //se nos ha pasado por argumentos
        const pag=await fetch(pagina);
        const htmlPag=await pag.text();
        var main=document.getElementsByTagName("main");
        main[0].innerHTML=htmlPag;

        //Obtengo todos los enlaces, para cambiar su comportamiento por defecto, y hacer que 
        //recarguen solo la parte central de la página, con el texto que tengan en "href", que
        //ahora en lugar de ser un enlace completo, será solo el nombre del archivo que debe
        //estar en la carpeta html
        var enlaces=document.getElementsByTagName("a");
        for(let i=0;i<enlaces.length;i++){
            //Solo tendré en cuenta los enlaces que no tengan target="_blank", porque asumo
            //que esos no son enlaces de mi web, sino que van a un sitio externo, y no
            //van a funcionar usando este método con javascript.
            const tieneTargetBlank = enlaces[i].getAttribute("target") == "_blank"; 
            if(!tieneTargetBlank){
                //Prevengo el comportamiento por defecto
                enlaces[i].addEventListener("click", function (evento) {
                    //Impido el comportamiento por defecto de ir a la página
                    evento.preventDefault();
                    //obtengo el contenido de href, y lo envío a cargarweb(dirección) para que 
                    //cargue el contenido así 
                    console.log(enlaces[i].href);
                    cargarContenido(enlaces[i].href);
                });
            }
        }

    }

    //El esqueleto solo lo tengo que cargar una vez: La primera cuando se abre la web en el index.
    //Ir navegando entre páginas a partir de ahora solo necesitará llamar a cargarContenido.
    cargarEsqueleto();
    cargarContenido("./html/inicio.html");



