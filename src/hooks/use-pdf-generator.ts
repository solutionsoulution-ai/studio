
"use client";

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { signatureData } from '@/data/documents/signature-data';

interface GeneratePDFParams {
    elementId: string;
    fileName?: string;
}

// Function to fetch and cache base64 image data
const imageCache: { [key: string]: string } = {};

async function getBase64Image(url: string): Promise<string> {
    if (imageCache[url]) {
        return imageCache[url];
    }
    try {
        // Use a CORS proxy if available, or ensure the image server allows cross-origin requests.
        // For development, a simple proxy can be used. For production, the image host needs to be configured.
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result as string;
                imageCache[url] = base64data;
                resolve(base64data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error fetching image for PDF:', error);
        return '';
    }
}

export function usePDFGenerator() {
    const [isLoading, setIsLoading] = useState(false);

    // Pre-load signature images on component mount (client-side)
    useEffect(() => {
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
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
            });

            // Use html-to-pdfmake or a similar library for better results if direct html render has issues.
            // For now, let's use the built-in jspdf html method.
             await pdf.html(input, {
                callback: function (doc) {
                    doc.save(fileName);
                },
                x: 0,
                y: 0,
                width: 210, // A4 width in mm
                windowWidth: input.scrollWidth,
                html2canvas: {
                    scale: 2.5, 
                    useCORS: true,
                },
            });

        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { generatePDF, isLoading };
}
