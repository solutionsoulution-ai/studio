"use client";

import { useState } from 'react';

export function usePDFGenerator() {
    const [isLoading, setIsLoading] = useState(false);

    const generatePDF = async ({
        elementId,
        fileName = 'document.pdf',
    }: { elementId: string, fileName?: string }) => {
        const input = document.getElementById(elementId);
        if (!input) {
            console.error(`Element with id '${elementId}' not found.`);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            // Dynamically import libraries only when the function is called
            const { default: jsPDF } = await import('jspdf');
            const { default: html2canvas } = await import('html2canvas');

            const canvas = await html2canvas(input, {
                scale: 2, // Use a higher scale for better quality
                useCORS: true,
                logging: false,
            });
            
            const imgData = canvas.toDataURL('image/jpeg', 0.95); // Use JPEG for better compression

            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'pt',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            // Calculate the height of the image in the PDF to maintain aspect ratio
            const imgHeightInPdf = (canvasHeight * pdfWidth) / canvasWidth;

            let heightLeft = imgHeightInPdf;
            let position = 0;
            let page = 1;

            // Add the first page
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeightInPdf);
            heightLeft -= pdfHeight;

            // Add new pages if content overflows
            while (heightLeft > 0) {
              position = -heightLeft;
              pdf.addPage();
              pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeightInPdf);
              heightLeft -= pdfHeight;
              page++;
              // Safety break to prevent infinite loops in case of miscalculation
              if (page > 20) {
                console.error("PDF generation exceeded 20 pages, stopping.");
                break;
              }
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
