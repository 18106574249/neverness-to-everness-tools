// Material Calculator for Wuthering Waves
(function() {
    const form = document.getElementById('mat-calc');
    if (!form) return;

    // Material data: character -> [ascension mats, skill mats]
    // Ascension: boss mat qty, weekly boss qty
    // Skill: forage, elite, weekly
    const mats = {
        'camellya': {boss: 46, weekly: 26, chest: 36, skill: 108, element: 'Havoc'},
        'shorekeeper': {boss: 46, weekly: 26, chest: 36, skill: 108, element: 'Spectro'},
        'jinhsi': {boss: 46, weekly: 26, chest: 36, skill: 108, element: 'Spectro'},
        'changli': {boss: 46, weekly: 26, chest: 36, skill: 108, element: 'Fusion'},
        'xiangli-yao': {boss: 46, weekly: 26, chest: 36, skill: 108, element: 'Electro'},
        'carlotta': {boss: 46, weekly: 26, chest: 36, skill: 108, element: 'Glacio'},
        'zani': {boss: 46, weekly: 26, chest: 36, skill: 108, element: 'Havoc'},
        'verina': {boss: 46, weekly: 26, chest: 36, skill: 108, element: 'Spectro'},
        'yinlin': {boss: 46, weekly: 26, chest: 36, skill: 108, element: 'Electro'},
        'sanhua': {boss: 46, weekly: 26, chest: 36, skill: 108, element: 'Glacio'},
    };

    const levelExp = {
        90: {boss: 46, weekly: 26, chest: 36, skill: 108, exp: 0},
        80: {boss: 26, weekly: 12, chest: 20, skill: 60, exp: 0},
        70: {boss: 12, weekly: 6, chest: 10, skill: 30, exp: 0},
        60: {boss: 6, weekly: 3, chest: 5, skill: 12, exp: 0},
    };

    const chestByLevel = {
        '1-40': '4 Crude / 4 Basic',
        '1-50': '4 Crude / 8 Basic',
        '1-60': '4 Crude / 12 Basic',
        '1-70': '4 Crude / 12 Basic / 4 Improved',
        '1-80': '4 Crude / 12 Basic / 8 Improved',
        '1-90': '4 Crude / 12 Basic / 12 Improved / 8 Tailored',
    };

    const bossByLevel = {
        40: 3, 50: 6, 60: 12, 70: 20, 80: 26, 90: 46
    };

    const selectChar = document.getElementById('mat-char');
    const currentLv = document.getElementById('current-lv');
    const targetLv = document.getElementById('target-lv');
    const resultEl = document.getElementById('mat-result');

    function calc() {
        const char = selectChar.value;
        const from = parseInt(currentLv.value) || 1;
        const to = parseInt(targetLv.value) || 90;

        if (!char || from >= to) {
            resultEl.innerHTML = '<p style="color:var(--text-dim);">Select a character and set target level higher than current.</p>';
            return;
        }

        const data = mats[char];
        if (!data) {
            resultEl.innerHTML = '<p style="color:var(--text-dim);">Character data not loaded.</p>';
            return;
        }

        // Simple estimation based on level ranges
        let bossTotal = 0;
        let weeklyTotal = 0;
        let expBooks = 0;
        let credits = 0;

        // Boss mats
        const lvRanges = [90, 80, 70, 60, 50, 40];
        for (const lv of lvRanges) {
            if (to >= lv && from < lv) {
                bossTotal += bossByLevel[lv];
            }
        }

        // Rough skill mat estimate (10 skills, ~90% of max)
        const skillRatio = (to - from) / 90;
        weeklyTotal = Math.round(26 * skillRatio);
        expBooks = Math.round(422 * skillRatio); // ~422 purple books to 90
        credits = Math.round(2500000 * skillRatio / 10000) * 10000;

        const charName = selectChar.options[selectChar.selectedIndex].text;

        resultEl.innerHTML = `
            <div class="calc-results" style="text-align:left;">
                <h4 style="color:var(--hl);margin-bottom:1rem;">${charName}: Level ${from} → ${to}</h4>
                <div class="calc-breakdown">
                    <div class="calc-row"><span>🎯 Boss Material Drops</span><span><strong>${bossTotal}</strong> × boss</span></div>
                    <div class="calc-row"><span>📚 Weekly Boss</span><span><strong>${weeklyTotal}</strong> runs</span></div>
                    <div class="calc-row"><span>📖 Purple EXP Books</span><span><strong>${expBooks}</strong></span></div>
                    <div class="calc-row"><span>💰 Shell Credits</span><span><strong>${credits.toLocaleString()}</strong></span></div>
                    <div class="calc-row"><span>⏱️ Estimated Waveplate</span><span><strong>~${Math.round((bossTotal/2.2 + weeklyTotal*3 + expBooks*10) * 40)}</strong></span></div>
                </div>
                <p style="margin-top:1rem;font-size:0.75rem;color:var(--text-dim);">* Estimates assume 2.2 boss drops per 40 waveplate. Actual costs vary.</p>
            </div>
        `;
    }

    selectChar?.addEventListener('change', calc);
    currentLv?.addEventListener('input', calc);
    targetLv?.addEventListener('input', calc);

    // Initial calc
    if (selectChar?.value) calc();
})();
