
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
                scale: 2, // Higher scale for better resolution
                useCORS: true,
                logging: false,
                width: input.scrollWidth,
                height: input.scrollHeight,
                windowWidth: input.scrollWidth,
                windowHeight: input.scrollHeight,
            });
            
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
            
            const pdfAspectRatio = pdfWidth / pdfHeight;
            const canvasAspectRatio = canvasWidth / canvasHeight;

            let renderWidth = pdfWidth;
            let renderHeight = pdfHeight;
            
            if (canvasAspectRatio > pdfAspectRatio) {
                renderHeight = pdfWidth / canvasAspectRatio;
            } else {
                renderWidth = pdfHeight * canvasAspectRatio;
            }

            const x = (pdfWidth - renderWidth) / 2;
            let y = 0; // Start at the top for multi-page
            
            let canvasRemainingHeight = canvasHeight;
            const pageCanvasHeight = (canvasWidth / pdfWidth) * pdfHeight;


            while (canvasRemainingHeight > 0) {
                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = canvasWidth;
                pageCanvas.height = pageCanvasHeight;
                const pageCtx = pageCanvas.getContext('2d');

                if (pageCtx) {
                    pageCtx.drawImage(canvas, 0, y * (canvasWidth/pdfWidth) , canvasWidth, pageCanvasHeight, 0, 0, canvasWidth, pageCanvasHeight);
                    const pageImgData = pageCanvas.toDataURL('image/png');

                    if (y > 0) {
                        pdf.addPage();
                    }
                    pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                }
                
                y += pdfHeight;
                canvasRemainingHeight -= pageCanvasHeight;
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
