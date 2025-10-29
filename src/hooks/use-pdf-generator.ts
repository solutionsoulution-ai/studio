
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
                scale: 2.5, // Échelle élevée pour une haute résolution
                useCORS: true,
                logging: false,
                height: input.scrollHeight, // Capturer la hauteur totale du contenu
                windowHeight: input.scrollHeight, // S'assurer que tout est rendu
            });

            // Utiliser JPEG avec une très haute qualité pour un bon compromis taille/qualité
            const imgData = canvas.toDataURL('image/jpeg', 0.98);
            
            const pdf = new jsPDF({
                orientation,
                unit: 'mm',
                format: 'a4',
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;

            let imgHeight = pdfWidth / ratio;
            
            if (imgHeight > pdfHeight) {
                // Pour les documents longs, on ajoute des pages
                let position = 0;
                let heightLeft = imgHeight;

                pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }
            } else {
                 // Pour les documents courts (comme le reçu), une seule page suffit
                 pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
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
