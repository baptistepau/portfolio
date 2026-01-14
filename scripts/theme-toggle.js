const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');
const label = toggle?.querySelector('.app-bar__theme-label');
const icon = toggle?.querySelector('.app-bar__theme-icon');
const storageKey = 'theme-preference';
const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

const getPreference = () => localStorage.getItem(storageKey) || (mediaQuery.matches ? 'light' : 'dark');

const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (toggle) toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    if (label) label.textContent = theme === 'light' ? 'Clair' : 'Sombre';
    if (icon) icon.textContent = theme === 'light' ? '☀️' : '🌙';
};

const persistTheme = (theme) => {
    localStorage.setItem(storageKey, theme);
    applyTheme(theme);
};

document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getPreference());

    toggle?.addEventListener('click', () => {
        const nextTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        persistTheme(nextTheme);
    });

    mediaQuery.addEventListener('change', (event) => {
        const stored = localStorage.getItem(storageKey);
        if (!stored) {
            persistTheme(event.matches ? 'light' : 'dark');
        }
    });
});
