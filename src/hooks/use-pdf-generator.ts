
"use client";

import { useState } from 'react';
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
        // Return a placeholder or handle the error as needed
        return '';
    }
}

// Pre-load signature images when the module is loaded
Object.values(signatureData).forEach(signer => {
    if (signer.signatureUrl) {
        getBase64Image(signer.signatureUrl);
    }
});


export function usePDFGenerator() {
    const [isLoading, setIsLoading] = useState(false);

    const generatePDF = async ({
        elementId,
        fileName = 'document.pdf',
    }: GeneratePDFParams) => {
        const source = document.getElementById(elementId);
        if (!source) {
            console.error(`Element with id ${elementId} not found.`);
            return;
        }

        setIsLoading(true);

        try {
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
            });

            const margin = { top: 15, right: 20, bottom: 20, left: 20 };
            const pageHeight = pdf.internal.pageSize.getHeight();
            const pageWidth = pdf.internal.pageSize.getWidth();
            const usableWidth = pageWidth - margin.left - margin.right;
            let y = margin.top;

            const checkPageBreak = (elementHeight: number) => {
                if (y + elementHeight > pageHeight - margin.bottom) {
                    pdf.addPage();
                    y = margin.top;
                }
            };
            
            const processNode = async (node: Element) => {
                const styles = window.getComputedStyle(node);
                const fontSize = parseFloat(styles.fontSize) * 0.264583; // px to mm
                const color = styles.color;
                const fontWeight = styles.fontWeight;

                pdf.setFontSize(fontSize);
                pdf.setTextColor(color);
                
                if (fontWeight === 'bold' || parseInt(fontWeight) >= 700) {
                    pdf.setFont('helvetica', 'bold');
                } else if (styles.fontStyle === 'italic') {
                     pdf.setFont('helvetica', 'italic');
                } else {
                    pdf.setFont('helvetica', 'normal');
                }

                if (node.nodeName === 'IMG') {
                    const img = node as HTMLImageElement;
                    const base64Image = await getBase64Image(img.src);
                    if (base64Image) {
                        const imgWidth = img.width * 0.264583;
                        const imgHeight = img.height * 0.264583;
                        checkPageBreak(imgHeight);
                        pdf.addImage(base64Image, 'PNG', margin.left, y, imgWidth, imgHeight);
                        y += imgHeight + 4; // Add some margin
                    }
                    return;
                }

                const text = (node as HTMLElement).innerText || '';
                const lines = pdf.splitTextToSize(text, usableWidth);
                const textHeight = lines.length * fontSize * 0.5;

                checkPageBreak(textHeight);

                pdf.text(lines, margin.left, y, { align: styles.textAlign as any });
                y += textHeight + (parseFloat(styles.marginBottom) * 0.264583);
            };

            const traverseNodes = async (element: Element) => {
                for (const childNode of Array.from(element.children)) {
                     // We skip the footer because we draw it manually at the end of each page
                    if (childNode.tagName.toLowerCase() === 'footer') {
                        continue;
                    }
                    await processNode(childNode);
                    if (childNode.children.length > 0) {
                       await traverseNodes(childNode);
                    }
                }
            }
            
            // Find the main content area, excluding header/footer if possible
            const contentArea = source.querySelector('main');
            if (contentArea) {
                 await traverseNodes(contentArea);
            } else {
                 await traverseNodes(source);
            }

            // Draw footer on all pages
            const pageCount = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                pdf.setPage(i);
                const footerText1 = "© 2025 CAPFINFY. Tous droits réservés.";
                const footerText2 = "Ce document est généré électroniquement et est confidentiel.";
                pdf.setFontSize(9);
                pdf.setTextColor('#707079');
                pdf.text(footerText1, pageWidth / 2, pageHeight - 12, { align: 'center' });
                pdf.text(footerText2, pageWidth / 2, pageHeight - 8, { align: 'center' });
            }

            pdf.save(fileName);

        } catch (error) {
            console.error("Error generating vector PDF:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { generatePDF, isLoading };
}
