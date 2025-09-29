<?php
/**
 * Template part for displaying a self-contained loan calculator.
 * This version uses inline CSS and JS for portability.
 */
?>
<style>
  :root {
    --primary-calc: hsl(231, 48%, 48%);
    --primary-text-calc: hsl(0, 0%, 98%);
    --background-calc: hsl(0, 0%, 100%);
    --text-primary-calc: hsl(224, 71.4%, 4.1%);
    --secondary-calc: hsl(220, 14.3%, 95.9%);
    --text-secondary-calc: hsl(220, 8.9%, 46.1%);
    --border-calc: hsl(220, 13%, 91%);
  }

  .calc-body {
    font-family: 'Inter', sans-serif;
    background-color: var(--background-calc);
    color: var(--text-primary-calc);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .calc-container {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    max-width: 960px;
    width: 100%;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }

  .calc-panel {
    padding: 36px;
    flex: 1;
    min-width: 280px;
  }

  .calc-input-panel {
    background: white;
  }
  
  .calc-result-panel {
    background: var(--secondary-calc);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  @media (min-width: 768px) {
    .calc-input-panel {
      border-right: 1px solid var(--border-calc);
    }
  }

  .calc-logo {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary-calc);
    margin-bottom: 8px;
  }

  .calc-logo span {
    color: var(--text-primary-calc);
  }

  .calc-h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 24px;
    color: var(--text-primary-calc);
  }

  .calc-subtitle {
    font-size: 0.95rem;
    color: var(--text-secondary-calc);
    margin-bottom: 28px;
  }

  .calc-label {
    display: block;
    margin-top: 24px;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text-primary-calc);
  }

  .calc-input-group input[type="range"] {
    width: 100%;
    height: 8px;
    background: var(--border-calc);
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    margin-top: 12px;
  }

  .calc-input-group input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    background: var(--primary-calc);
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }

   .calc-input-group input[type="range"]::-moz-range-thumb {
    width: 22px;
    height: 22px;
    background: var(--primary-calc);
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }

  .calc-input-group {
    margin-top: 10px;
  }

  .calc-input-group input[type="number"] {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid var(--border-calc);
    border-radius: 10px;
    font-size: 1.15rem;
    text-align: right;
    font-weight: 600;
    color: var(--text-primary-calc);
    background: white;
  }

  .calc-input-group input[type="number"]:focus {
    border-color: var(--primary-calc);
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 57, 136, 0.15);
  }

  .calc-value-display {
    font-size: 0.85rem;
    color: var(--text-secondary-calc);
    text-align: right;
    margin-top: 6px;
  }

  .calc-result-card {
    background: white;
    padding: 30px;
    border-radius: 18px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    width: 100%;
    max-width: 320px;
  }

  .calc-result-label {
    font-size: 1rem;
    color: var(--text-secondary-calc);
    margin-bottom: 12px;
  }

  .calc-result-value {
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--primary-calc);
    margin: 12px 0;
    font-family: 'Inter', sans-serif;
  }

  .calc-duration-info {
    font-size: 1rem;
    color: var(--text-secondary-calc);
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--border-calc);
  }

  @media (max-width: 768px) {
    .calc-container {
      flex-direction: column;
    }
    .calc-input-panel {
      border-right: none;
      border-bottom: 1px solid var(--border-calc);
    }
    .calc-panel {
      padding: 28px;
    }
  }
</style>
<div class="calc-body">
    <div class="calc-container">
    <!-- Formulaire -->
    <div class="calc-panel calc-input-panel">
      <div class="calc-logo">Vyls<span>Fond</span></div>
      <h1 class="calc-h1">Calculateur de Prêt</h1>
      <p class="calc-subtitle">Taux fixe annuel : <strong style="color: var(--primary-calc);">2 %</strong></p>

      <label for="montant" class="calc-label">Montant du prêt (€)</label>
      <div class="calc-input-group">
        <input
          type="number"
          id="montant"
          min="1000"
          max="500000"
          value="150000"
          oninput="updateMontantSlider(); calculateLoan()"
        />
        <input
          type="range"
          id="montantSlider"
          min="1000"
          max="500000"
          value="150000"
          step="1000"
          oninput="updateMontantInput(); calculateLoan()"
        />
        <div class="calc-value-display">
          <span id="montantDisplay">150 000 €</span>
        </div>
      </div>

      <label for="duree" class="calc-label">Durée du prêt (mois)</label>
      <div class="calc-input-group">
        <input
          type="number"
          id="duree"
          min="12"
          max="360"
          value="240"
          oninput="updateDureeSlider(); calculateLoan()"
        />
        <input
          type="range"
          id="dureeSlider"
          min="12"
          max="360"
          value="240"
          step="1"
          oninput="updateDureeInput(); calculateLoan()"
        />
        <div class="calc-value-display">
          <span id="dureeDisplay">240 mois</span>
        </div>
      </div>
    </div>

    <!-- Résultat -->
    <div class="calc-panel calc-result-panel">
      <div class="calc-result-card">
        <div class="calc-result-label">Mensualité estimée</div>
        <div class="calc-result-value" id="mensualite">746,22 €</div>
        <div class="calc-duration-info">
          Durée totale : <strong id="dureeMois">240 mois</strong>
        </div>
      </div>
    </div>
  </div>
</div>

  <script>
    function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function updateMontantSlider() {
      const input = document.getElementById("montant");
      const slider = document.getElementById("montantSlider");
      let value = parseFloat(input.value) || 1000;
      value = Math.min(500000, Math.max(1000, value));
      input.value = Math.round(value);
      slider.value = input.value;
      document.getElementById("montantDisplay").textContent = formatNumber(input.value) + " €";
    }

    function updateMontantInput() {
      const slider = document.getElementById("montantSlider");
      const input = document.getElementById("montant");
      input.value = slider.value;
      document.getElementById("montantDisplay").textContent = formatNumber(slider.value) + " €";
    }

    function updateDureeSlider() {
      const input = document.getElementById("duree");
      const slider = document.getElementById("dureeSlider");
      let value = parseFloat(input.value) || 12;
      value = Math.min(360, Math.max(12, value));
      input.value = Math.round(value);
      slider.value = input.value;
      document.getElementById("dureeDisplay").textContent = input.value + " mois";
    }

    function updateDureeInput() {
      const slider = document.getElementById("dureeSlider");
      const input = document.getElementById("duree");
      input.value = slider.value;
      document.getElementById("dureeDisplay").textContent = slider.value + " mois";
    }

    function calculateLoan() {
      const montant = parseFloat(document.getElementById("montant").value);
      const dureeMois = parseFloat(document.getElementById("duree").value);

      if (
        isNaN(montant) ||
        isNaN(dureeMois) ||
        montant < 1000 ||
        montant > 500000 ||
        dureeMois < 12 ||
        dureeMois > 360
      ) {
        document.getElementById("mensualite").textContent = "— €";
        document.getElementById("dureeMois").textContent = "— mois";
        return;
      }

      const tauxAnnuel = 0.02;
      const tauxMensuel = tauxAnnuel / 12;

      if (tauxMensuel <= 0) {
        const mensualite = montant / dureeMois;
        document.getElementById("mensualite").textContent = mensualite.toFixed(2).replace('.', ',') + " €";
      } else {
        const numerateur = tauxMensuel * Math.pow(1 + tauxMensuel, dureeMois);
        const denominateur = Math.pow(1 + tauxMensuel, dureeMois) - 1;
        const mensualite = montant * (numerateur / denominateur);
        document.getElementById("mensualite").textContent = mensualite.toFixed(2).replace('.', ',') + " €";
      }

      document.getElementById("dureeMois").textContent = Math.round(dureeMois) + " mois";
    }

    document.addEventListener('DOMContentLoaded', function() {
        if(document.getElementById("montant")){
            updateMontantSlider();
            updateDureeSlider();
            calculateLoan();
        }
    });
  </script>
