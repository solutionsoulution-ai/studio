
"use client";

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { signatureData } from '@/data/documents/signature-data';

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
        });
    } catch (error) {
        console.error(`Failed to fetch image directly: ${url}`, error);
        // Fallback or error handling
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
    }: { elementId: string, fileName?: string }) => {
        const input = document.getElementById(elementId);
        if (!input) {
            console.error(`Element with id '${elementId}' not found.`);
            return;
        }

        setIsLoading(true);

        const pdf = new jsPDF('p', 'pt', 'a4');
        const margin = 40;
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const contentWidth = pdfWidth - margin * 2;
        let y = margin;

        const processNode = async (node: Element) => {
            if (y > pdf.internal.pageSize.getHeight() - margin) {
                pdf.addPage();
                y = margin;
            }

            const styles = window.getComputedStyle(node);
            const fontSize = parseFloat(styles.fontSize);
            pdf.setFontSize(fontSize);
            
            const isBold = parseInt(styles.fontWeight) >= 600;
            pdf.setFont(isBold ? 'Helvetica-Bold' : 'Helvetica', isBold ? 'bold' : 'normal');

            let nodeText = node.textContent?.trim() || '';
            const tagName = node.tagName.toLowerCase();

            if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'h5') {
                 y += fontSize / 2;
            }
            
            const splitText = pdf.splitTextToSize(nodeText, contentWidth);
            pdf.text(splitText, margin, y);
            y += (splitText.length * fontSize) * 1.2;

            if(node.children.length > 0) {
                 for (const child of Array.from(node.children)) {
                    await processNode(child as Element);
                 }
            }
        };

        try {
            await processNode(input);
            pdf.save(fileName);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { generatePDF, isLoading };
}
