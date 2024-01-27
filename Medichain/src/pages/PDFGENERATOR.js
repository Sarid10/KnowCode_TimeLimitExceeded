// PDFGenerator.js

import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DataTable from "./DataTable";
// import hospital from "../assets/hospital.png";
import top from "../assets/bg.jpg";
import sign from "../assets/tick.jpg";
import styles from "./HomePage.module.css";

const PDFGenerator = ({ data }) => {
    const pdfRef = useRef();

    const generatePDF = async () => {
        const pdf = new jsPDF();
        const pdfNode = pdfRef.current;

        // Convert the component to an image using html2canvas
        const canvas = await html2canvas(pdfNode);
        const imageData = canvas.toDataURL("image/png");

        // Add the image to the PDF
        // pdf.addImage(hospital, "PNG", 10, 10, 100, 0);
        pdf.addImage(top, "PNG", 10, 10, 190, 0);
        pdf.addImage(imageData, "PNG", 50, 70, 200, 0);
        pdf.addImage(sign, "PNG", 125, 200, 0, 0);

        // Save or display the PDF
        pdf.save("table.pdf");
    };

    return (
        <div>
            <button className={styles.button} onClick={generatePDF}>
                <div className={styles.getStarted}>Generate PDF</div>
              </button>
            <div ref={pdfRef}>
                <DataTable data={data} />
            </div>
        </div>
    );
};

export default PDFGenerator;