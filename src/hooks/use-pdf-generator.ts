
"use client";

import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { signatureData } from '@/data/documents/signature-data';

interface GeneratePDFParams {
    elementId: string;
    fileName?: string;
}

const imageCache: { [key: string]: string } = {};

async function getBase64Image(url: string): Promise<string> {
    if (imageCache[url]) {
        return imageCache[url];
    }
    try {
        const response = await fetch(`/api/image-proxy?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch image via proxy: ${response.statusText}`);
        }
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result as string;
                imageCache[url] = base64data;
                resolve(base64data);
            };
            reader.onerror = (error) => {
                console.error('FileReader error:', error);
                reject(error);
            };
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error fetching or processing image for PDF:', error);
        return ''; 
    }
}

export function usePDFGenerator() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Pre-cache signature images on component mount
        Object.values(signatureData).forEach(signer => {
            if (signer.signatureUrl) {
                getBase64Image(signer.signatureUrl);
            }
        });
    }, []);

    const generatePDF = async ({
        elementId,
        fileName = 'document.pdf',
    }: GeneratePDFParams) => {
        const input = document.getElementById(elementId);
        if (!input) {
            console.error(`Element with id '${elementId}' not found.`);
            return;
        }

        setIsLoading(true);

        try {
            // Use PNG for lossless quality and a high scale for sharpness
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
                windowHeight: input.scrollHeight, // Capture the full scrollable height
                scrollY: -window.scrollY,
            });

            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / pdfWidth;
            const imgHeight = canvasHeight / ratio;

            let heightLeft = imgHeight;
            let position = 0;

            // Add the first page
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;

            // Add new pages if content overflows
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
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
