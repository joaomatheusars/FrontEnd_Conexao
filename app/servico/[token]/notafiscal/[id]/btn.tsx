'use client'
import { jsPDF,  } from "jspdf";
import html2canvas from 'html2canvas';

interface BTNProps{
    id: string
}

const BTN = ({id}: BTNProps) => {
    const generatorPDF = () => {
        const htmlSource = document.getElementById('nota')
        const filename = `nota ${id}`
        if (!htmlSource) {
          return;
        }
    
        html2canvas(htmlSource).then(function (canvas) {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 185;
          const pageHeight = 297
    
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0
          const pdf = new jsPDF('p', 'mm')
    
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
          heightLeft -= pageHeight;
    
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
    
          pdf.save(filename);
    
        })
      }
    return (
        <button className="bg-table mb-4 p-2 rounded-sm font-bold" onClick={() => generatorPDF()}>Gerar PDF</button>
    );
}
 
export default BTN;