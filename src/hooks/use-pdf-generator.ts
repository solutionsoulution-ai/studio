
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
        // Fetch the image with 'no-cors' mode to bypass browser security restrictions
        const response = await fetch(url, { mode: 'no-cors' });
        
        // no-cors mode results in an opaque response, so we can't check response.ok
        // We proceed assuming the fetch was successful, and handle blob conversion errors if any.

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
        // Return a placeholder or empty string to avoid breaking the PDF generation
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
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 15;
            const contentWidth = pdfWidth - margin * 2;

            const processNode = async (node: HTMLElement, currentX: number, currentY: number): Promise<number> => {
                let y = currentY;
                const styles = window.getComputedStyle(node);
                const tagName = node.tagName.toLowerCase();
                const text = node.innerText?.trim();

                if (y > pdfHeight - margin) { // Check for page break before adding content
                    pdf.addPage();
                    y = margin;
                }

                if (text) {
                    const fontSize = parseFloat(styles.fontSize) * 0.75; // Convert px to pt
                    const isBold = parseInt(styles.fontWeight) > 500;
                    
                    pdf.setFontSize(fontSize);
                    pdf.setFont(isBold ? 'Helvetica' : 'Helvetica', isBold ? 'bold' : 'normal');

                    if (styles.color) {
                      const rgb = styles.color.match(/\d+/g);
                      if (rgb) pdf.setTextColor(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
                    }

                    const splitText = pdf.splitTextToSize(text, contentWidth);
                    pdf.text(splitText, x, y);
                    y += pdf.getTextDimensions(splitText).h + (parseFloat(styles.marginBottom) * 0.264);
                }

                if (tagName === 'img') {
                    const img = node as HTMLImageElement;
                    const base64Image = await getBase64Image(img.src);
                    if (base64Image) {
                         const imgWidth = img.width * 0.264; // mm
                         const imgHeight = img.height * 0.264; // mm
                         
                         if (y + imgHeight > pdfHeight - margin) {
                            pdf.addPage();
                            y = margin;
                         }
                         pdf.addImage(base64Image, 'PNG', x, y, imgWidth, imgHeight);
                         y += imgHeight + 5;
                    }
                }
                
                for (const child of Array.from(node.children)) {
                    y = await processNode(child as HTMLElement, x, y);
                     if (y > pdfHeight - margin) {
                        pdf.addPage();
                        y = margin;
                    }
                }

                return y;
            };

            // Simplified approach - just iterate direct children for now
            let x = margin;
            let y = margin;
            for (const child of Array.from(input.children)) {
                 y = await processNode(child as HTMLElement, x, y);
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
