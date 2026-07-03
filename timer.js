// WuWa Reset Timer - displays daily & weekly reset countdown
// Server time: UTC+8, Daily reset: 04:00, Weekly reset: Monday 04:00

(function() {
    const timerContainers = document.querySelectorAll('.wuwa-timer');
    if (!timerContainers.length) return;

    function pad(n) { return String(n).padStart(2, '0'); }

    function updateTimers() {
        const now = new Date();
        // Current time in UTC+8
        const serverOffset = 8 * 60 * 60 * 1000;
        const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
        const serverNow = new Date(utc + serverOffset);

        // Server time display
        const serverTimeStr = pad(serverNow.getUTCHours()) + ':' + pad(serverNow.getUTCMinutes()) + ':' + pad(serverNow.getUTCSeconds());

        // Daily reset: next 04:00 UTC+8
        const dailyReset = new Date(serverNow);
        dailyReset.setUTCHours(4, 0, 0, 0);
        if (serverNow >= dailyReset) {
            dailyReset.setUTCDate(dailyReset.getUTCDate() + 1);
        }
        const dailyMs = dailyReset.getTime() - serverNow.getTime();
        const dailyH = Math.floor(dailyMs / (60*60*1000));
        const dailyM = Math.floor((dailyMs % (60*60*1000)) / (60*1000));
        const dailyS = Math.floor((dailyMs % (60*1000)) / 1000);

        // Weekly reset: next Monday 04:00 UTC+8
        const weeklyReset = new Date(serverNow);
        weeklyReset.setUTCHours(4, 0, 0, 0);
        const dayOfWeek = serverNow.getUTCDay(); // 0=Sun
        let daysUntilMonday = (8 - dayOfWeek) % 7;
        if (daysUntilMonday === 0 && serverNow >= weeklyReset) daysUntilMonday = 7;
        weeklyReset.setUTCDate(weeklyReset.getUTCDate() + daysUntilMonday);
        if (daysUntilMonday === 0) {
            weeklyReset.setUTCDate(weeklyReset.getUTCDate() + 7);
        }
        const weeklyMs = weeklyReset.getTime() - serverNow.getTime();
        const weeklyD = Math.floor(weeklyMs / (24*60*60*1000));
        const weeklyH = Math.floor((weeklyMs % (24*60*60*1000)) / (60*60*1000));
        const weeklyM = Math.floor((weeklyMs % (60*60*1000)) / (60*1000));

        // Update all timers
        timerContainers.forEach(el => {
            el.querySelector('.timer-server') && (el.querySelector('.timer-server').textContent = serverTimeStr + ' (UTC+8)');
            el.querySelector('.timer-daily') && (el.querySelector('.timer-daily').textContent = pad(dailyH) + ':' + pad(dailyM) + ':' + pad(dailyS));
            el.querySelector('.timer-weekly') && (el.querySelector('.timer-weekly').textContent = weeklyD + 'd ' + weeklyH + 'h ' + weeklyM + 'm');
            el.querySelector('.timer-daily-label') && (el.querySelector('.timer-daily-label').textContent = dailyH > 0 ? dailyH + 'h ' + dailyM + 'm' : dailyM + 'm ' + dailyS + 's');
        });
    }

    updateTimers();
    setInterval(updateTimers, 1000);
})();
