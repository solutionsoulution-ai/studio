
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
        // Use a CORS proxy to bypass browser security restrictions
        const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
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
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts: true,
                floatPrecision: 16
            });
            
            const processNode = async (node: Element, currentX: number, currentY: number) => {
                // Implement logic to parse different HTML nodes and add them to the PDF
                // This is a simplified example
                const styles = window.getComputedStyle(node);
                const tagName = node.tagName.toLowerCase();

                if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'p' || tagName === 'li') {
                    const fontSize = parseFloat(styles.fontSize);
                    pdf.setFontSize(fontSize * 0.75); // Convert px to pt
                    const text = (node as HTMLElement).innerText;
                    
                    const splitText = pdf.splitTextToSize(text, 180);
                    pdf.text(splitText, currentX, currentY);
                    currentY += (splitText.length * fontSize * 0.35);
                } else if (tagName === 'img') {
                    const img = node as HTMLImageElement;
                    const base64Image = await getBase64Image(img.src);
                    if (base64Image) {
                         pdf.addImage(base64Image, 'PNG', currentX, currentY, img.width * 0.26, img.height * 0.26);
                         currentY += (img.height * 0.26) + 5;
                    }
                }

                 // Recursively process children
                 for (let i = 0; i < node.children.length; i++) {
                    currentY = await processNode(node.children[i], currentX, currentY);
                    if (currentY > 280) { // Check for page break
                        pdf.addPage();
                        currentY = 10;
                    }
                }

                return currentY;
            };

            await processNode(input, 15, 15);

            pdf.save(fileName);

        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { generatePDF, isLoading };
}
