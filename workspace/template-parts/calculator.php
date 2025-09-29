<?php
/**
 * Template part for displaying a self-contained loan calculator.
 * This version uses inline CSS and JS for portability.
 * It accepts arguments via `set_query_var`.
 *
 * @package vyls
 */

$args = get_query_var('calculator_args', [
    'title' => 'Calculateur de Prêt',
    'description' => 'Estimez vos mensualités.',
    'default_amount' => 50000,
    'max_amount' => 500000,
    'default_term' => 120,
    'max_term' => 360,
]);
$unique_id = spl_object_hash((object)$args);
?>
<style>
  .calc-container-outer {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  .calc-container {
    display: flex;
    flex-wrap: wrap;
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
    flex-basis: 60%;
    background: white;
  }

  .calc-result-panel {
    flex-basis: 40%;
    background: hsl(220, 14.3%, 95.9%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .calc-logo {
    font-size: 1.8rem;
    font-weight: 700;
    color: hsl(231, 48%, 48%);
    margin-bottom: 8px;
  }

  .calc-logo span {
    color: hsl(224, 71.4%, 4.1%);
  }

  .calc-h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: hsl(224, 71.4%, 4.1%);
    font-family: 'Inter', sans-serif;
  }
  
  .calc-subtitle {
    font-size: 0.95rem;
    color: hsl(220, 8.9%, 46.1%);
    margin-bottom: 28px;
    max-width: 500px;
  }

  .calc-label {
    display: block;
    margin-top: 24px;
    font-weight: 600;
    font-size: 0.95rem;
    color: hsl(224, 71.4%, 4.1%);
  }

  .calc-input-group input[type="range"] {
    width: 100%;
    height: 8px;
    background: hsl(220, 13%, 91%);
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
    background: hsl(231, 48%, 48%);
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }

   .calc-input-group input[type="range"]::-moz-range-thumb {
    width: 22px;
    height: 22px;
    background: hsl(231, 48%, 48%);
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
    border: 1px solid hsl(220, 13%, 91%);
    border-radius: 10px;
    font-size: 1.15rem;
    text-align: right;
    font-weight: 600;
    color: hsl(224, 71.4%, 4.1%);
    background: white;
  }

  .calc-input-group input[type="number"]:focus {
    border-color: hsl(231, 48%, 48%);
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 57, 136, 0.15);
  }

  .calc-value-display {
    font-size: 0.85rem;
    color: hsl(220, 8.9%, 46.1%);
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
    color: hsl(220, 8.9%, 46.1%);
    margin-bottom: 12px;
  }

  .calc-result-value {
    font-size: 2.4rem;
    font-weight: 700;
    color: hsl(231, 48%, 48%);
    margin: 12px 0;
    font-family: 'Inter', sans-serif;
  }

  .calc-duration-info {
    font-size: 1rem;
    color: hsl(220, 8.9%, 46.1%);
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid hsl(220, 13%, 91%);
  }

  @media (max-width: 768px) {
    .calc-container {
      flex-direction: column;
    }
    .calc-input-panel {
      border-right: none;
    }
    .calc-panel {
      padding: 28px;
    }
  }
</style>
<div class="calc-container-outer">
    <div class="calc-container">
        <div class="calc-panel calc-input-panel">
            <div class="calc-logo">Vyls<span>Fond</span></div>
            <h2 class="calc-h2"><?php echo esc_html($args['title']); ?></h2>
            <p class="calc-subtitle"><?php echo esc_html($args['description']); ?> Taux fixe annuel : <strong style="color: hsl(231, 48%, 48%);">2 %</strong></p>

            <label for="montant-<?php echo esc_attr($unique_id); ?>" class="calc-label">Montant du prêt (€)</label>
            <div class="calc-input-group">
                <input type="number" id="montant-<?php echo esc_attr($unique_id); ?>" min="1000" max="<?php echo esc_attr($args['max_amount']); ?>" value="<?php echo esc_attr($args['default_amount']); ?>" oninput="updateMontantSlider_<?php echo esc_attr($unique_id); ?>(); calculate_<?php echo esc_attr($unique_id); ?>()" />
                <input type="range" id="montantSlider-<?php echo esc_attr($unique_id); ?>" min="1000" max="<?php echo esc_attr($args['max_amount']); ?>" value="<?php echo esc_attr($args['default_amount']); ?>" step="1000" oninput="updateMontantInput_<?php echo esc_attr($unique_id); ?>(); calculate_<?php echo esc_attr($unique_id); ?>()" />
                <div class="calc-value-display"><span id="montantDisplay-<?php echo esc_attr($unique_id); ?>">... €</span></div>
            </div>

            <label for="duree-<?php echo esc_attr($unique_id); ?>" class="calc-label">Durée du prêt (mois)</label>
            <div class="calc-input-group">
                <input type="number" id="duree-<?php echo esc_attr($unique_id); ?>" min="12" max="<?php echo esc_attr($args['max_term']); ?>" value="<?php echo esc_attr($args['default_term']); ?>" oninput="updateDureeSlider_<?php echo esc_attr($unique_id); ?>(); calculate_<?php echo esc_attr($unique_id); ?>()" />
                <input type="range" id="dureeSlider-<?php echo esc_attr($unique_id); ?>" min="12" max="<?php echo esc_attr($args['max_term']); ?>" value="<?php echo esc_attr($args['default_term']); ?>" step="1" oninput="updateDureeInput_<?php echo esc_attr($unique_id); ?>(); calculate_<?php echo esc_attr($unique_id); ?>()" />
                <div class="calc-value-display"><span id="dureeDisplay-<?php echo esc_attr($unique_id); ?>">... mois</span></div>
            </div>
        </div>

        <div class="calc-panel calc-result-panel">
            <div class="calc-result-card">
                <div class="calc-result-label">Mensualité estimée</div>
                <div class="calc-result-value" id="mensualite-<?php echo esc_attr($unique_id); ?>">... €</div>
                <div class="calc-duration-info">Durée totale : <strong id="dureeMois-<?php echo esc_attr($unique_id); ?>">... mois</strong></div>
            </div>
        </div>
    </div>
</div>

<script>
    function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function updateMontantSlider_<?php echo esc_attr($unique_id); ?>() {
      const input = document.getElementById("montant-<?php echo esc_attr($unique_id); ?>");
      const slider = document.getElementById("montantSlider-<?php echo esc_attr($unique_id); ?>");
      let value = parseFloat(input.value) || 1000;
      value = Math.min(<?php echo esc_attr($args['max_amount']); ?>, Math.max(1000, value));
      input.value = Math.round(value);
      slider.value = input.value;
      document.getElementById("montantDisplay-<?php echo esc_attr($unique_id); ?>").textContent = formatNumber(input.value) + " €";
    }

    function updateMontantInput_<?php echo esc_attr($unique_id); ?>() {
      const slider = document.getElementById("montantSlider-<?php echo esc_attr($unique_id); ?>");
      const input = document.getElementById("montant-<?php echo esc_attr($unique_id); ?>");
      input.value = slider.value;
      document.getElementById("montantDisplay-<?php echo esc_attr($unique_id); ?>").textContent = formatNumber(slider.value) + " €";
    }

    function updateDureeSlider_<?php echo esc_attr($unique_id); ?>() {
      const input = document.getElementById("duree-<?php echo esc_attr($unique_id); ?>");
      const slider = document.getElementById("dureeSlider-<?php echo esc_attr($unique_id); ?>");
      let value = parseFloat(input.value) || 12;
      value = Math.min(<?php echo esc_attr($args['max_term']); ?>, Math.max(12, value));
      input.value = Math.round(value);
      slider.value = input.value;
      document.getElementById("dureeDisplay-<?php echo esc_attr($unique_id); ?>").textContent = input.value + " mois";
    }

    function updateDureeInput_<?php echo esc_attr($unique_id); ?>() {
      const slider = document.getElementById("dureeSlider-<?php echo esc_attr($unique_id); ?>");
      const input = document.getElementById("duree-<?php echo esc_attr($unique_id); ?>");
      input.value = slider.value;
      document.getElementById("dureeDisplay-<?php echo esc_attr($unique_id); ?>").textContent = slider.value + " mois";
    }

    function calculate_<?php echo esc_attr($unique_id); ?>() {
      const montant = parseFloat(document.getElementById("montant-<?php echo esc_attr($unique_id); ?>").value);
      const dureeMois = parseFloat(document.getElementById("duree-<?php echo esc_attr($unique_id); ?>").value);

      const mensualiteDisplay = document.getElementById("mensualite-<?php echo esc_attr($unique_id); ?>");
      const dureeMoisDisplay = document.getElementById("dureeMois-<?php echo esc_attr($unique_id); ?>");

      if (isNaN(montant) || isNaN(dureeMois) || montant < 1000 || dureeMois < 12) {
        mensualiteDisplay.textContent = "— €";
        dureeMoisDisplay.textContent = "— mois";
        return;
      }

      const tauxAnnuel = 0.02;
      const tauxMensuel = tauxAnnuel / 12;

      let mensualite;
      if (tauxMensuel <= 0) {
        mensualite = montant / dureeMois;
      } else {
        const numerateur = tauxMensuel * Math.pow(1 + tauxMensuel, dureeMois);
        const denominateur = Math.pow(1 + tauxMensuel, dureeMois) - 1;
        mensualite = montant * (numerateur / denominateur);
      }

      mensualiteDisplay.textContent = mensualite.toFixed(2).replace('.', ',') + " €";
      dureeMoisDisplay.textContent = Math.round(dureeMois) + " mois";
    }

    document.addEventListener('DOMContentLoaded', function() {
        updateMontantSlider_<?php echo esc_attr($unique_id); ?>();
        updateDureeSlider_<?php echo esc_attr($unique_id); ?>();
        calculate_<?php echo esc_attr($unique_id); ?>();
    });
</script>
