document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('lienzo');
    const pdfBtn = document.getElementById('pdfBtn');
  
    pdfBtn.addEventListener('click', () => {
      generarPDF(canvas);
    });
  
    function generarPDF(canvas) {
      const canvasImage = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('landscape', 'pt','legal'); // Hoja horizontal, tamaño legal
      pdf.setFontSize(18);
      pdf.text('Tanatología', 450, 35); // Título en el centro del encabezado
  
      // Agregar imagen del canvas a la derecha
      pdf.addImage(canvasImage, 'jpg', 450, 50, 500, 500);
  
      // Agregar datos a la izquierda
      const datos = [
        'Legajo: 12345',
        'Expediente: 67890',
        'Nombre Apellido: Juan Pérez',
        'Ingreso: 29/08/23 10:00 AM',
        'Temperatura Rectal: 37.5°C'
      ];
  
      pdf.setFontSize(20);
      let y = 100;
      datos.forEach(dato => {
        pdf.text(dato, 50, y);
        y += 30;
      });
  
      // Guardar el PDF
      pdf.save('informe_tanatologia.pdf');
    }
  });
  