document.addEventListener('DOMContentLoaded', function () {
  // Obtener el elemento del canvas y su contexto 2D
  const canvas = document.getElementById('lienzo');
  const ctx = canvas.getContext('2d');
  

  // Crear una instancia de Image para la imagen de fondo
  const fondoImg = new Image();
  fondoImg.src = 'img/Temperature-time-of-death-nomogram-for-ambient-temperatures-of-23C.gif';

  // Manejar la carga de la imagen de fondo en el canvas
  fondoImg.onload = function() {
    ctx.drawImage(fondoImg, 0, 0, canvas.width, canvas.height);
    
    // Inicializar variables para el dibujo de líneas
    let lineas = [];
    let dibujando = false;
    let xInicial = 0;
    let yInicial = 0;
    let xActual = 0;
    let yActual = 0;

    // Manejar el evento 'mousedown' en el canvas
    canvas.addEventListener('mousedown', e => {
      xInicial = e.offsetX;
      yInicial = e.offsetY;
      dibujando = true;
    });

    // Manejar el evento 'mousemove' en el canvas
    canvas.addEventListener('mousemove', e => {
      if (dibujando === true) {
        xActual = e.offsetX;
        yActual = e.offsetY;
        dibujarLineaRecta(xInicial, yInicial, xActual, yActual);
      }
    });

    // Manejar el evento 'mouseup' en el canvas
    canvas.addEventListener('mouseup', e => {
      if (dibujando === true) {
        dibujarLineaRecta(xInicial, yInicial, xActual, yActual);
        lineas.push([xInicial, yInicial, xActual, yActual]);
        xInicial = 0;
        yInicial = 0;
        xActual = 0;
        yActual = 0;
        dibujando = false;
      }
    });

    // Función para dibujar una línea recta en el canvas
    function dibujarLineaRecta(x1, y1, x2, y2) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(fondoImg, 0, 0, canvas.width, canvas.height); // Restaurar la imagen de fondo
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'red';
      ctx.stroke();
      for (let i = 0; i < lineas.length; i++) {
        let linea = lineas[i];
        ctx.beginPath();
        ctx.moveTo(linea[0], linea[1]);
        ctx.lineTo(linea[2], linea[3]);
        ctx.stroke();
      }
    }

    // Obtener el botón de borrar y manejar su clic
    const borrarBtn = document.getElementById('borrarBtn');
    borrarBtn.addEventListener('click', () => {
      borrarTodasLasLineas();
    });

    // Función para borrar todas las líneas y limpiar el canvas
    function borrarTodasLasLineas() {
      lineas = []; // Borra todas las líneas almacenadas en el arreglo
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Borra el contenido del lienzo
      ctx.drawImage(fondoImg, 0, 0, canvas.width, canvas.height); // Restaura la imagen de fondo
    }
  };
});