// PDFGenerator.js

import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import DataTable from './DataTable';
import bg from "../assets/bg.jpg";

const PDFGenerator = ({ data }) => {
    const pdfRef = useRef();

    const generatePDF = async () => {
        const pdf = new jsPDF();
        const pdfNode = pdfRef.current;

        // Convert the component to an image using html2canvas
        const canvas = await html2canvas(pdfNode);
        const imageData = canvas.toDataURL('image/png');

        // Add the image to the PDF
        pdf.addImage(bg, 'PNG', 10, 10, 190, 0);

        // Save or display the PDF
        pdf.save('table.pdf');
    };

    return (
        <div>
            <button onClick={generatePDF}>Generate PDF</button>
            <div ref={pdfRef}>
                <DataTable data={data} />
            </div>
        </div>
    );
};

export default PDFGenerator;