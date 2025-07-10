/**
 * Attaches event listeners for the sidebar toggle functionality.
 */
function initializeSidebarToggle() {
    const sidebar = document.getElementById('app-sidebar');
    const mainContent = document.querySelector('.main-content');
    const desktopToggle = document.getElementById('sidebar-toggle');
    const mobileToggle = document.getElementById('global-mobile-sidebar-toggle');

    if (!sidebar || !mainContent) {
        console.error("Sidebar or Main Content element not found. Cannot initialize toggle.");
        return;
    }

    const toggleSidebar = () => {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        const isExpanded = !isCollapsed;
        
        if (desktopToggle) {
            desktopToggle.setAttribute('aria-expanded', isExpanded);
        }

        // Adjust the margin of the main content area to match the sidebar state
        if (isCollapsed) {
            mainContent.style.marginLeft = '3.5rem';
        } else {
            mainContent.style.marginLeft = '14rem';
        }
    };

    if (desktopToggle) {
        desktopToggle.addEventListener('click', toggleSidebar);
    }
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleSidebar);
    }
}

/**
 * Sets the 'active' class on the current page's navigation link in the sidebar.
 */
function setActiveNavLink() {
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1);

    const navLinks = document.querySelectorAll('.sidebar-menu-item a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');

        // Handle the case where the root page is index.html but the link is dashboard.html
        const isDashboard = linkPage === 'dashboard.html' && (currentPage === 'index.html' || currentPage === '');

        if (isDashboard || linkPage === currentPage) {
            link.classList.add('active');
            // Add aria-current for better accessibility
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Initializes tooltips for sidebar navigation links.
 * It reads the text from the link's span and sets it as a 'data-tooltip' attribute
 * on the anchor tag, so CSS can display it.
 */
function initializeSidebarTooltips() {
    const navLinks = document.querySelectorAll('.sidebar-menu a');
    navLinks.forEach(link => {
        const span = link.querySelector('span');
        if (span) {
            link.setAttribute('data-tooltip', span.textContent.trim());
        }
    });
}

/**
 * Updates the page header's title, subtitle, and tag based on the current page.
 * This makes the reusable header component dynamic.
 */
function updatePageHeader() {
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    const titleEl = document.getElementById('page-title');
    const subtitleEl = document.getElementById('page-subtitle');
    const tagEl = document.getElementById('page-tag');

    if (!titleEl || !subtitleEl || !tagEl) {
        // Elements might not be loaded yet, or not on this page.
        return;
    }

    let title = 'Page Not Found';
    let subtitle = 'Please check the URL and try again.';
    let showTag = false;

    // Define content for each page
    const pageDetails = {
        'index.html': { title: 'Dashboard', subtitle: 'Manage your crypto and fiat balances', showTag: true },
        'dashboard.html': { title: 'Dashboard', subtitle: 'Manage your crypto and fiat balances', showTag: true },
        'balances.html': { title: 'Balances', subtitle: 'View your asset distribution', showTag: false },
        'convert.html': { title: 'Convert', subtitle: 'Swap your assets with zero fees', showTag: false },
        'withdraw.html': { title: 'Withdraw', subtitle: 'Send your assets to an external wallet', showTag: false },
        'cards.html': { title: 'Cards', subtitle: 'Manage your virtual and physical cards', showTag: false },
        'transaction-history.html': { title: 'Transaction History', subtitle: 'Review your past account activity', showTag: false },
        'security-center.html': { title: 'Security Center', subtitle: 'Manage your account security settings', showTag: false },
        'settings.html': { title: 'Settings', subtitle: 'Configure your application preferences', showTag: false },
        'profile.html': { title: 'Profile', subtitle: 'View and edit your personal information', showTag: false },
    };

    const details = pageDetails[currentPage] || { title, subtitle, showTag };

    titleEl.textContent = details.title;
    subtitleEl.textContent = details.subtitle;
    tagEl.classList.toggle('hidden', !details.showTag);
}

/**
 * Initializes the user profile dropdown menu functionality.
 * Toggles visibility on button click and closes when clicking outside.
 */
function initializeUserProfileDropdown() {
    const wrapper = document.getElementById('user-profile-dropdown-wrapper');
    const toggleButton = document.getElementById('user-profile-button');
    const dropdownMenu = document.getElementById('user-profile-dropdown');

    if (!wrapper || !toggleButton || !dropdownMenu) {
        // Silently return if the elements aren't on the page.
        return;
    }

    toggleButton.addEventListener('click', (event) => {
        // Stop the click from immediately propagating to the document listener
        event.stopPropagation();
        const isHidden = dropdownMenu.classList.toggle('hidden');
        toggleButton.setAttribute('aria-expanded', !isHidden);
    });

    // Close the dropdown if the user clicks outside of it
    document.addEventListener('click', (event) => {
        if (!wrapper.contains(event.target) && !dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.add('hidden');
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Close the dropdown with the Escape key for accessibility
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.add('hidden');
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Initializes the application by loading components and setting up scripts.
 */
function initializeApp() {
    // Initialize scripts for the loaded components
    initializeSidebarToggle();
    setActiveNavLink();
    initializeSidebarTooltips();
    updatePageHeader();
    initializeUserProfileDropdown();
    
    // All other page-specific initializations can go here.
}

document.addEventListener('DOMContentLoaded', initializeApp);