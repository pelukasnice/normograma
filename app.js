const canvas = document.getElementById('lienzo');
      const ctx = canvas.getContext('2d');
      let dibujando = false;
      let x = 0;
      let y = 0;

      canvas.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        dibujando = true;
      });

      canvas.addEventListener('mousemove', e => {
        if (dibujando === true) {
          dibujarLinea(x, y, e.offsetX, e.offsetY);
          x = e.offsetX;
          y = e.offsetY;
        }
      });

      canvas.addEventListener('mouseup', e => {
        if (dibujando === true) {
          dibujarLinea(x, y, e.offsetX, e.offsetY);
          x = 0;
          y = 0;
          dibujando = false;
        }
      });

      function dibujarLinea(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }