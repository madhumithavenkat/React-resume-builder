import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PdfDownloader = ({rootElementId , downloadFileName}) => {

    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId);
        console.log(input)
        html2canvas(input)
            .then((canvas) => {
                const pdfImage= canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(pdfImage, 'JPEG', -10, -10);
                pdf.save(`${downloadFileName}.pdf`);
            })
    }

    return <button onClick={downloadPdfDocument}>To Pdf</button>

}

export default PdfDownloader;