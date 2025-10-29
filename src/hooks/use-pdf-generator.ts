
"use client";

import { useState, useEffect } from 'react';
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
        // Use our local image proxy to bypass CORS issues
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
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 15;
            const contentWidth = pdfWidth - margin * 2;

            const processNode = async (node: HTMLElement, currentX: number, currentY: number): Promise<number> => {
                let y = currentY;
                const styles = window.getComputedStyle(node);
                const tagName = node.tagName.toLowerCase();
                const text = node.innerText?.trim();

                const isVisible = styles.display !== 'none' && styles.visibility !== 'hidden' && parseFloat(styles.opacity) > 0;
                if (!isVisible) {
                    return y;
                }

                if (y > pdfHeight - margin - 20) { // Add a buffer
                    pdf.addPage();
                    y = margin;
                }

                if (text && tagName !== 'button' && tagName !== 'label' && tagName !== 'select') {
                    const fontSize = parseFloat(styles.fontSize) * 0.75;
                    const isBold = parseInt(styles.fontWeight) > 500;
                    
                    pdf.setFontSize(fontSize);
                    pdf.setFont('Helvetica', isBold ? 'bold' : 'normal');

                    if (styles.color) {
                      const rgb = styles.color.match(/\d+/g);
                      if (rgb) pdf.setTextColor(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
                    }

                    const splitText = pdf.splitTextToSize(text, contentWidth);
                    pdf.text(splitText, currentX, y);
                    y += pdf.getTextDimensions(splitText).h + (parseFloat(styles.marginBottom) * 0.264);
                }

                if (tagName === 'img') {
                    const img = node as HTMLImageElement;
                    const base64Image = await getBase64Image(img.src);
                    if (base64Image) {
                         const imgWidth = img.width * 0.264 * 0.5; // Scale down image
                         const imgHeight = img.height * 0.264 * 0.5;
                         
                         if (y + imgHeight > pdfHeight - margin) {
                            pdf.addPage();
                            y = margin;
                         }
                         pdf.addImage(base64Image, 'PNG', currentX, y, imgWidth, imgHeight);
                         y += imgHeight + 5;
                    }
                }
                
                for (const child of Array.from(node.children)) {
                    y = await processNode(child as HTMLElement, currentX, y);
                     if (y > pdfHeight - margin - 20) {
                        pdf.addPage();
                        y = margin;
                    }
                }

                return y;
            };

            let y = margin;
            for (const child of Array.from(input.children)) {
                 y = await processNode(child as HTMLElement, margin, y);
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
