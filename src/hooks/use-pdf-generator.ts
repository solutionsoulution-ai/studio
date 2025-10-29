
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
            // Force html2canvas to capture the full scrollable height
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                logging: false,
                // These are the key properties to capture full content
                windowHeight: input.scrollHeight,
                scrollY: -window.scrollY, 
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.98);
            const pdf = new jsPDF(orientation, 'mm', 'a4');
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            
            const ratio = canvasWidth / pdfWidth;
            const imgHeight = canvasHeight / ratio;

            let heightLeft = imgHeight;
            let position = 0;

            // Add the first page
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;

            // Add new pages if content is longer than one page
            while (heightLeft > 0) {
                position = heightLeft - imgHeight; // Recalculate position for the new page
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
