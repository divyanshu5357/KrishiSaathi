// Dynamic UI Translation Script
// This script adds data-i18n attributes to UI elements dynamically

document.addEventListener('DOMContentLoaded', () => {
    // Sidebar menu items
    const menuItems = {
        dashboard: 'dashboard',
        weather: 'weather',
        suggestions: 'suggestions',
        market: 'marketPrices',
        techniques: 'techniques',
        marketplace: 'marketplace',
        equipment: 'equipment',
        schemes: 'schemes'
    };
    
    // Add data-i18n to sidebar items
    document.querySelectorAll('.sidebar-item').forEach(item => {
        const content = item.dataset.content;
        const span = item.querySelector('span');
        if (span && menuItems[content]) {
            span.setAttribute('data-i18n', menuItems[content]);
        }
    });
    
    // Add data-i18n to bottom nav items
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        const content = item.dataset.content;
        const span = item.querySelector('span');
        if (span && menuItems[content]) {
            span.setAttribute('data-i18n', menuItems[content]);
        }
    });
    
    // Add to other elements
    const elementMappings = [
        { selector: '#logoutButton', key: 'logout' },
        { selector: '[data-content="smartFarming"]', key: 'smartFarming' },
        { selector: '.help-text', key: 'help' }
    ];
    
    elementMappings.forEach(({ selector, key }) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute('data-i18n', key);
    });
});
