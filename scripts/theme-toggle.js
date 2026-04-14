const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');
const label = toggle?.querySelector('.app-bar__theme-label');
const icon = toggle?.querySelector('.app-bar__theme-icon');
const storageKey = 'theme-preference';

const applyTheme = () => {
    root.setAttribute('data-theme', 'dark');
    if (toggle) toggle.setAttribute('aria-pressed', 'false');
    if (label) label.textContent = 'Sombre';
    if (icon) icon.textContent = '🌙';
};

document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem(storageKey, 'dark');
    applyTheme();

    if (toggle) {
        toggle.disabled = true;
        toggle.setAttribute('title', 'Theme sombre uniquement');
    }

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
