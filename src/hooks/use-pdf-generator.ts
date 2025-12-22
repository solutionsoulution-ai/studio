
"use client";

import { useState } from 'react';
import jsPDF from 'jspdf';

export function usePDFGenerator() {
    const [isLoading, setIsLoading] = useState(false);

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

        try {
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'pt',
                format: 'a4',
                putOnlyUsedFonts: true,
                floatPrecision: 16
            });

            const page_A4_width = 595; // A4 width in pt

            await pdf.html(input, {
                callback: function (doc) {
                    doc.save(fileName);
                },
                x: 0,
                y: 0,
                autoPaging: 'text',
                width: page_A4_width, 
                windowWidth: input.scrollWidth,
                margin: 0
            });

        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { generatePDF, isLoading };
}
