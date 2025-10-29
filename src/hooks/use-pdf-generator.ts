
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
                scale: 2,
                useCORS: true,
                logging: false,
                // Assurer que la capture se fait sur toute la hauteur du contenu
                windowHeight: input.scrollHeight,
                scrollY: -window.scrollY,
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.98);
            
            const pdfWidth = 210; // A4 width in mm
            const pdfHeight = 297; // A4 height in mm

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            
            // Calculer le ratio pour maintenir les proportions de l'image
            const canvasAspectRatio = canvasWidth / canvasHeight;
            const pdfAspectRatio = pdfWidth / pdfHeight;

            let finalImgWidth = pdfWidth;
            let finalImgHeight = pdfWidth / canvasAspectRatio;

            // Si l'image est plus haute que la page, on la fait déborder sur plusieurs pages
            if (finalImgHeight > pdfHeight) {
                finalImgHeight = pdfHeight;
                finalImgWidth = finalImgHeight * canvasAspectRatio;
            }

            const pdf = new jsPDF(orientation, 'mm', 'a4');
            let heightLeft = canvasHeight * (pdfWidth / canvasWidth); // Hauteur totale de l'image en mm
            let position = 0;

            // Ajouter la première page
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, heightLeft);
            heightLeft -= pdfHeight;

            // Ajouter des pages supplémentaires si nécessaire
            while (heightLeft > 0) {
                position -= pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, canvasHeight * (pdfWidth / canvasWidth));
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
