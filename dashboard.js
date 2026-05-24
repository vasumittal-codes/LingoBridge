const totalTranslations = document.getElementById('totalTranslations');
const mostUsedLanguage = document.getElementById('mostUsedLanguage');
const activityList = document.getElementById('activityList');

async function loadAnalytics() {
    try {
        const response = await fetch('/analytics');
        const data = await response.json();

        totalTranslations.innerText = data.total_translations;
        mostUsedLanguage.innerText = data.most_used_language;

        if (!data.recent_activity.length) {
            activityList.innerHTML = '<p class="muted-text">No recent activity found.</p>';
            return;
        }

        activityList.innerHTML = data.recent_activity.map(item => `
            <div class="activity-item">
                <p><strong>${item.source_lang}</strong> → <strong>${item.target_lang}</strong></p>
                <p class="mini-label">${item.created_at}</p>
            </div>
        `).join('');
    } catch (error) {
        activityList.innerHTML = '<p class="muted-text">Could not load analytics data.</p>';
    }
}

loadAnalytics();
