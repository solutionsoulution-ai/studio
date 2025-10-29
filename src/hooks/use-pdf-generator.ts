
"use client";

import { useState } from 'react';
import jsPDF from 'jspdf';

interface GeneratePDFParams {
    elementId: string;
    fileName?: string;
}

export function usePDFGenerator() {
    const [isLoading, setIsLoading] = useState(false);

    const generatePDF = async ({
        elementId,
        fileName = 'document.pdf',
    }: GeneratePDFParams) => {
        const input = document.getElementById(elementId);
        if (!input) {
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

            await pdf.html(input, {
                callback: function (doc) {
                    doc.save(fileName);
                },
                x: 10,
                y: 10,
                width: 190, // Largeur du contenu dans le PDF (A4 = 210mm, moins les marges)
                windowWidth: input.scrollWidth, // Utiliser la largeur de défilement pour une capture complète
                autoPaging: 'text', // Permettre à jspdf de gérer les sauts de page
            });
            
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { generatePDF, isLoading };
}
