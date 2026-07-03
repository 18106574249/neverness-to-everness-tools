// WuWa Pull Calculator - Calculate how many pulls you can get this patch
(function() {
    const form = document.getElementById('pull-calc');
    if (!form) return;

    const inputs = form.querySelectorAll('input[type="number"], input[type="checkbox"]');
    const resultEl = document.getElementById('pull-result');

    function calc() {
        // Manual inputs
        const currentAstrite = parseInt(document.getElementById('current-astrite')?.value) || 0;
        const currentLustrous = parseInt(document.getElementById('current-lustrous')?.value) || 0;
        const currentRadiant = parseInt(document.getElementById('current-radiant')?.value) || 0;

        // Patch income sources (estimated values for a typical 6-week patch)
        const daily = document.getElementById('daily-active')?.checked ? 42 * 60 : 0; // 60 astrite/day
        const abyss = document.getElementById('abyss')?.checked ? 1600 : 0; // ToA reset
        const abyssCount = parseInt(document.getElementById('abyss-count')?.value) || 0;
        const abyssTotal = abyss * abyssCount;
        const events = document.getElementById('patch-events')?.checked ? 2500 : 0;
        const livestream = document.getElementById('livestream')?.checked ? 300 : 0;
        const maintenance = document.getElementById('maintenance')?.checked ? 600 : 0;
        const bp = document.getElementById('battle-pass')?.checked ? 1600 : 0;
        const shop = document.getElementById('shop-tides')?.checked ? 5 : 0; // 5 radiant from shop
        const mail = document.getElementById('patch-mail')?.checked ? 800 : 0;
        const web = document.getElementById('web-events')?.checked ? 200 : 0;
        const exploration = parseInt(document.getElementById('exploration-value')?.value) || 0;

        // Total astrite
        const totalAstrite = currentAstrite + daily + abyssTotal + events + livestream + maintenance + bp + mail + web + exploration;
        const totalLustrous = currentLustrous; // + any from events/bp if tracked
        const totalRadiant = currentRadiant + shop;
        
        // Convert to pulls (160 astrite = 1 pull)
        const astritePulls = Math.floor(totalAstrite / 160);
        const totalPulls = astritePulls + totalLustrous + totalRadiant;
        
        // Soft pity: ~75 on character banner, ~65 on weapon
        const charPulls = astritePulls + totalLustrous; // radiant is for weapon
        const guaranteeChar = charPulls >= 160; // hard pity = 80, guarantee = 160
        const guaranteeWeapon = totalRadiant >= 160; // hard pity = 80, guarantee 2x = 160

        // Display results
        resultEl.innerHTML = `
            <div class="calc-results">
                <div class="calc-total"><span class="calc-number">${totalPulls}</span> Total Pulls</div>
                <div class="calc-breakdown">
                    <div class="calc-row"><span>Astrite to Convert</span><span>${totalAstrite.toLocaleString()} (${astritePulls} pulls)</span></div>
                    <div class="calc-row"><span>Lustrous Tides (character)</span><span>${totalLustrous}</span></div>
                    <div class="calc-row"><span>Radiant Tides (weapon)</span><span>${totalRadiant}</span></div>
                    <div class="calc-row highlight"><span>Character Banner Pity Progress</span><span>${charPulls} / 160 → ${guaranteeChar ? '✅ Guaranteed' : charPulls >= 80 ? '⚡ Soft Pity' : charPulls >= 60 ? '⚡ Approaching Pity' : '📊 Building Pity'}</span></div>
                    <div class="calc-row highlight"><span>Weapon Banner Pity Progress</span><span>${totalRadiant} / 160 → ${guaranteeWeapon ? '✅ Guaranteed' : totalRadiant >= 80 ? '⚡ Soft Pity' : '📊 Building Pity'}</span></div>
                </div>
                <details style="margin-top:1.5rem;font-size:0.85rem;">
                    <summary style="cursor:pointer;color:var(--hl);">📋 Income Breakdown</summary>
                    <div class="calc-breakdown" style="margin-top:0.5rem;">
                        <div class="calc-row"><span>Current Astrite</span><span>${currentAstrite.toLocaleString()}</span></div>
                        <div class="calc-row"><span>Daily Activities (${daily > 0 ? '42 × 60' : '0'})</span><span>${daily.toLocaleString()}</span></div>
                        <div class="calc-row"><span>ToA Resets (${abyssCount > 0 ? abyssCount + ' × ' + abyss : '0'})</span><span>${abyssTotal.toLocaleString()}</span></div>
                        <div class="calc-row"><span>Patch Events</span><span>${events.toLocaleString()}</span></div>
                        <div class="calc-row"><span>Livestream Codes</span><span>${livestream.toLocaleString()}</span></div>
                        <div class="calc-row"><span>Maintenance Compensation</span><span>${maintenance.toLocaleString()}</span></div>
                        <div class="calc-row"><span>Battle Pass</span><span>${bp.toLocaleString()}</span></div>
                        <div class="calc-row"><span>Mail Rewards</span><span>${mail.toLocaleString()}</span></div>
                        <div class="calc-row"><span>Web Events</span><span>${web.toLocaleString()}</span></div>
                        <div class="calc-row"><span>Exploration / Other</span><span>${exploration.toLocaleString()}</span></div>
                    </div>
                </details>
                <p style="margin-top:1rem;font-size:0.75rem;color:var(--text-dim);">* Estimates based on typical patch income. Actual values may vary.</p>
            </div>
        `;
    }

    // Auto-calculate on any input change
    inputs.forEach(el => el.addEventListener('input', calc));
    inputs.forEach(el => el.addEventListener('change', calc));
    
    // Initial calculation
    calc();
})();
