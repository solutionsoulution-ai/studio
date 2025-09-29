document.addEventListener('DOMContentLoaded', function() {
    const calculators = document.querySelectorAll('.loan-calculator');

    calculators.forEach(calculator => {
        const amountSlider = calculator.querySelector('.loan-amount-slider');
        const termSlider = calculator.querySelector('.loan-term-slider');
        const amountValueDisplay = calculator.querySelector('.loan-amount-value');
        const termValueDisplay = calculator.querySelector('.loan-term-value');
        const monthlyPaymentDisplay = calculator.querySelector('.monthly-payment-value');

        const FIXED_INTEREST_RATE = 2;

        function formatCurrency(value) {
            return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
        }

        function calculateAndDisplay() {
            if (!amountSlider || !termSlider || !amountValueDisplay || !termValueDisplay || !monthlyPaymentDisplay) return;

            const amount = parseFloat(amountSlider.value);
            const term = parseInt(termSlider.value, 10);

            // Mettre à jour les affichages
            amountValueDisplay.textContent = formatCurrency(amount);
            termValueDisplay.textContent = `${term} Mois`;

            // Calcul
            const monthlyRate = FIXED_INTEREST_RATE / 100 / 12;
            let payment = 0;
            if (amount > 0 && term > 0 && monthlyRate > 0) {
                 payment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
            } else if (amount > 0 && term > 0) { // Cas où le taux est de 0
                payment = amount / term;
            }

            monthlyPaymentDisplay.textContent = formatCurrency(payment);
        }

        if (amountSlider && termSlider) {
            amountSlider.addEventListener('input', calculateAndDisplay);
            termSlider.addEventListener('input', calculateAndDisplay);
        }

        // Calcul initial
        calculateAndDisplay();
    });
});
