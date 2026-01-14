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

    // Menu hamburger
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-menu]');
    const menuClose = document.querySelector('[data-menu-close]');
    const menuLinks = menu?.querySelectorAll('a');

    const closeMenu = () => {
        menuToggle?.classList.remove('active');
        menu?.classList.remove('active');
        document.body.style.overflow = '';
    };

    const openMenu = () => {
        menuToggle?.classList.add('active');
        menu?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    menuToggle?.addEventListener('click', () => {
        if (menu?.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Bouton de fermeture
    menuClose?.addEventListener('click', closeMenu);

    // Fermer le menu lors du clic sur un lien
    menuLinks?.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fermer le menu avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu?.classList.contains('active')) {
            closeMenu();
        }
    });
});
