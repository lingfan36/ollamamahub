/**
 * OllamaHub - Component Loader
 * Injects shared header/footer into all pages.
 * Automatically highlights the active nav link based on current URL.
 */

(function () {
    // Determine the root path relative to current page
    function getRootPath() {
        const path = window.location.pathname;
        // Count directory depth relative to /pages/
        const depth = (path.match(/\//g) || []).length;
        // Running from file system or server
        if (path.includes('/pages/docs/') || path.includes('/pages/solutions/')) {
            return '../../';
        } else if (path.includes('/pages/')) {
            return '../';
        }
        return '';
    }

    const root = getRootPath();

    // Load a component into a container element
    async function loadComponent(containerId, componentPath) {
        const el = document.getElementById(containerId);
        if (!el) return;
        try {
            const res = await fetch(root + componentPath);
            if (!res.ok) throw new Error(`Failed to load ${componentPath}`);
            let html = await res.text();
            // Rewrite /pages/ absolute paths to relative paths
            html = html.replace(/href="\/pages\//g, `href="${root}pages/`);
            html = html.replace(/href="\/assets\//g, `href="${root}assets/`);
            el.outerHTML = html;
        } catch (e) {
            console.warn('Component load error:', e);
        }
    }

    // Set active nav link
    function setActiveNav() {
        const path = window.location.pathname;
        let activePage = 'home';
        if (path.includes('/docs/')) activePage = 'docs';
        else if (path.includes('/solutions/')) activePage = 'solutions';
        else if (path.includes('/resources')) activePage = 'resources';
        else if (path.includes('/about')) activePage = 'about';
        else if (path.includes('/search')) activePage = 'search';

        document.querySelectorAll('.nav-link').forEach(link => {
            const page = link.dataset.page;
            if (page === activePage) {
                link.classList.add('text-indigo-600');
                link.classList.remove('text-slate-600');
            } else {
                link.classList.add('text-slate-600', 'hover:text-indigo-600');
                link.classList.remove('text-indigo-600');
            }
        });
    }

    // Wait for DOM, then load components
    document.addEventListener('DOMContentLoaded', async () => {
        const headerPromise = document.getElementById('header-placeholder')
            ? loadComponent('header-placeholder', 'components/header.html')
            : Promise.resolve();
        const footerPromise = document.getElementById('footer-placeholder')
            ? loadComponent('footer-placeholder', 'components/footer.html')
            : Promise.resolve();

        await Promise.all([headerPromise, footerPromise]);

        setActiveNav();

        // Re-dispatch DOMContentLoaded-equivalent event so main.js can attach listeners
        document.dispatchEvent(new Event('components:loaded'));
    });
})();
