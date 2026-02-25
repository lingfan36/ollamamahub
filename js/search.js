document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('page-search-input');
    const searchBtn = document.getElementById('page-search-btn');
    const resultsContainer = document.getElementById('search-results-container');
    const statsContainer = document.getElementById('search-stats');

    if (!searchInput || !resultsContainer) return;

    let searchIndex = [];

    // Load search index
    try {
        const response = await fetch('../_data/search-index.json');
        if (response.ok) {
            searchIndex = await response.json();
        } else {
            console.error("Failed to load search index");
        }
    } catch (err) {
        console.error("Error loading search index:", err);
    }

    // Get URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
        searchInput.value = query;
        performSearch(query);
    }

    // Event listeners
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    function highlightText(text, query) {
        if (!query.trim()) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    function performSearch(query) {
        // Update URL
        const newUrl = new URL(window.location);
        if (query) {
            newUrl.searchParams.set('q', query);
        } else {
            newUrl.searchParams.delete('q');
        }
        window.history.pushState({}, '', newUrl);

        if (!query.trim()) {
            statsContainer.innerHTML = '';
            resultsContainer.innerHTML = `
                <div class="text-center py-12 text-slate-500">
                    <i class="ph ph-magnifying-glass text-4xl mb-3 text-slate-300"></i>
                    <p>Type a query above to search documentation and solutions.</p>
                </div>
            `;
            return;
        }

        const lowerQuery = query.toLowerCase();
        
        // Filter results
        const results = searchIndex.filter(item => {
            return item.title.toLowerCase().includes(lowerQuery) || 
                   item.summary.toLowerCase().includes(lowerQuery) ||
                   item.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
        });

        // Update stats
        statsContainer.innerHTML = `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "<span class="font-semibold text-slate-900">${query}</span>"`;

        // Render results
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="text-center py-12 text-slate-500">
                    <i class="ph ph-warning-circle text-4xl mb-3 text-slate-300"></i>
                    <p>No results found for "${query}". Try adjusting your search terms.</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = results.map(item => {
            const isDoc = item.type === 'doc';
            const icon = isDoc ? '<i class="ph-fill ph-book-open"></i> Documentation' : '<i class="ph-fill ph-check-circle"></i> Solution';
            const badgeClass = isDoc ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800';
            
            const highlightedTitle = highlightText(item.title, query);
            const highlightedSummary = highlightText(item.summary, query);
            
            // Adjust url path because JSON urls start with /pages/
            // we are currently IN /pages/
            const relativeUrl = item.url.replace('/pages/', '');

            const tagsHtml = item.tags.map(tag => `<span class="px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-600">${tag}</span>`).join('');

            return `
            <article class="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <div class="flex items-center gap-2 mb-2">
                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}">
                        ${icon}
                    </span>
                    <span class="text-sm text-slate-500">${item.path}</span>
                </div>
                <h2 class="text-xl font-semibold text-slate-900 mb-2">
                    <a href="${relativeUrl}" class="hover:text-indigo-600">${highlightedTitle}</a>
                </h2>
                <p class="text-slate-600 mb-4 line-clamp-2">
                    ${highlightedSummary}
                </p>
                <div class="flex items-center gap-4 text-sm text-slate-500">
                    <span class="flex items-center gap-1"><i class="ph ph-clock"></i> Updated ${item.updatedAt}</span>
                    <div class="flex gap-2">
                        ${tagsHtml}
                    </div>
                </div>
            </article>
            `;
        }).join('');
    }
});