
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
                scale: 3, // Qualité maximale pour la netteté
                useCORS: true,
                logging: false,
                height: input.getBoundingClientRect().height,
                windowHeight: input.getBoundingClientRect().height,
            });

            // Utiliser PNG pour une qualité sans perte
            const imgData = canvas.toDataURL('image/png');
            
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
                let position = 0;
                while(imgHeight > 0) {
                    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfWidth / ratio);
                    imgHeight -= pdfHeight;
                    position -= pdfHeight;
                    if(imgHeight > 0) {
                        pdf.addPage();
                    }
                }
            } else {
                 pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
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
