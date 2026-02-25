/**
 * OllamaHub - Main JavaScript
 * Handles: mobile menu, TOC scroll spy, copy buttons, search redirect, keyboard shortcuts
 */

function initMain() {
    // ── Mobile Menu ──────────────────────────────────────────────────────────
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = !mobileNav.classList.contains('hidden');
            mobileNav.classList.toggle('hidden', isOpen);
            if (mobileMenuIcon) {
                mobileMenuIcon.className = isOpen
                    ? 'ph ph-list text-2xl'
                    : 'ph ph-x text-2xl';
            }
        });
        // Close mobile nav on link click
        mobileNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                mobileNav.classList.add('hidden');
                if (mobileMenuIcon) mobileMenuIcon.className = 'ph ph-list text-2xl';
            });
        });
    }

    // ── Search Input → Redirect to search page ────────────────────────────
    function attachSearchRedirect(input) {
        if (!input) return;
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                const q = encodeURIComponent(input.value.trim());
                
                // Determine path to search.html based on current depth
                const depth = window.location.pathname.split('/').length - 2;
                let prefix = '';
                
                if (window.location.pathname.endsWith('index.html') && window.location.pathname.split('/').length === 2) {
                    // Root index.html
                    prefix = 'pages/';
                } else if (window.location.pathname.includes('/pages/')) {
                    // Inside pages dir
                    const parts = window.location.pathname.split('/pages/')[1].split('/');
                    const upCount = parts.length - 1;
                    if (upCount > 0) {
                        prefix = '../'.repeat(upCount);
                    }
                } else {
                    prefix = '';
                }
                
                window.location.href = `${prefix}search.html?q=${q}`;
            }
        });
    }

    attachSearchRedirect(document.getElementById('header-search-input'));
    attachSearchRedirect(document.getElementById('mobile-search-input'));

    // ── ⌘K / Ctrl+K focus search ─────────────────────────────────────────
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            const si = document.getElementById('header-search-input');
            if (si) { si.focus(); si.select(); }
        }
    });

    // ── TOC Scroll Spy ────────────────────────────────────────────────────
    const tocLinks = document.querySelectorAll('[data-toc] a, aside a[href^="#"]');
    if (tocLinks.length > 0) {
        const headings = Array.from(document.querySelectorAll('article h2[id], article h3[id]'));

        const onScroll = () => {
            let current = '';
            headings.forEach(h => {
                if (window.scrollY >= h.offsetTop - 120) current = h.id;
            });
            tocLinks.forEach(link => {
                const href = link.getAttribute('href');
                const active = href === `#${current}`;
                link.classList.toggle('text-indigo-600', active);
                link.classList.toggle('font-medium', active);
                link.classList.toggle('text-slate-600', !active);
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ── Code Block Copy Buttons ───────────────────────────────────────────
    document.querySelectorAll('article pre, .code-block pre').forEach(pre => {
        if (pre.querySelector('.copy-btn')) return; // already has one
        const btn = document.createElement('button');
        btn.className = 'copy-btn absolute top-3 right-3 p-1.5 text-slate-400 bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:text-white focus:opacity-100';
        btn.title = 'Copy to clipboard';
        btn.innerHTML = '<i class="ph ph-copy text-sm"></i>';
        btn.addEventListener('click', () => {
            const code = pre.querySelector('code')?.innerText || pre.innerText;
            navigator.clipboard.writeText(code).then(() => {
                btn.innerHTML = '<i class="ph ph-check text-sm text-green-400"></i>';
                setTimeout(() => { btn.innerHTML = '<i class="ph ph-copy text-sm"></i>'; }, 2000);
            });
        });

        // Ensure parent is positioned
        const wrapper = pre.parentElement;
        if (wrapper && !wrapper.classList.contains('relative')) {
            wrapper.classList.add('relative', 'group');
        }
        pre.parentElement.appendChild(btn);
    });

    // ── Solutions page: category filter ───────────────────────────────────
    const categoryLinks = document.querySelectorAll('[data-category-filter]');
    const solutionItems = document.querySelectorAll('[data-category]');

    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const cat = link.dataset.categoryFilter;

                // Update active state
                categoryLinks.forEach(l => {
                    l.classList.remove('text-indigo-600', 'bg-indigo-50', 'font-medium');
                    l.classList.add('text-slate-600');
                });
                link.classList.add('text-indigo-600', 'bg-indigo-50', 'font-medium');
                link.classList.remove('text-slate-600');

                // Show/hide items
                solutionItems.forEach(item => {
                    const show = cat === 'all' || item.dataset.category === cat;
                    item.style.display = show ? '' : 'none';
                });
            });
        });
    }

    // ── Resources page: Grid/List view toggle ─────────────────────────────
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const resourceGrid = document.getElementById('resource-grid');

    if (gridViewBtn && listViewBtn && resourceGrid) {
        gridViewBtn.addEventListener('click', () => {
            resourceGrid.className = resourceGrid.className
                .replace('grid-cols-1 gap-4', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6');
            gridViewBtn.classList.add('bg-slate-100', 'text-slate-900');
            listViewBtn.classList.remove('bg-slate-100', 'text-slate-900');
            listViewBtn.classList.add('bg-white', 'text-slate-400');
        });

        listViewBtn.addEventListener('click', () => {
            resourceGrid.className = resourceGrid.className
                .replace('grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6', 'grid-cols-1 gap-4');
            listViewBtn.classList.add('bg-slate-100', 'text-slate-900');
            gridViewBtn.classList.remove('bg-slate-100', 'text-slate-900');
            gridViewBtn.classList.add('bg-white', 'text-slate-400');
        });
    }
}

// Initialize on DOMContentLoaded (inline pages) or after components are loaded
document.addEventListener('DOMContentLoaded', initMain);
document.addEventListener('components:loaded', initMain);
