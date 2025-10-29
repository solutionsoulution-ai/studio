
"use client";

import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface GeneratePDFParams {
    elementId: string;
    fileName?: string;
    orientation?: 'p' | 'portrait' | 'l' | 'landscape';
}

export function usePDFGenerator() {
    const [isLoading, setIsLoading] = useState(false);

    const generatePDF = async ({
        elementId,
        fileName = 'document.pdf',
        orientation = 'p',
    }: GeneratePDFParams) => {
        const input = document.getElementById(elementId);
        if (!input) {
            console.error(`Element with id ${elementId} not found.`);
            return;
        }

        setIsLoading(true);

        try {
            const canvas = await html2canvas(input, {
                scale: 3, // Augmentation de l'échelle pour une meilleure netteté
                useCORS: true,
                logging: false,
                height: input.scrollHeight, // Utiliser la hauteur totale du contenu
                windowHeight: input.scrollHeight,
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0); // Qualité JPEG maximale
            
            const pdf = new jsPDF({
                orientation,
                unit: 'mm',
                format: 'a4',
                compress: true,
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;

            let imgHeight = pdfWidth / ratio;
            let heightLeft = imgHeight;
            let position = 0;

            // N'ajoute qu'une seule page, et laisse le lecteur PDF gérer le défilement si nécessaire
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
              position = -pdfHeight * (Math.ceil(imgHeight / pdfHeight) - Math.ceil(heightLeft / pdfHeight));
              pdf.addPage();
              pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
              heightLeft -= pdfHeight;
            }


            pdf.save(fileName);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { generatePDF, isLoading };
}
