const DocsMap = [
    {
        category: "Getting Started",
        items: [
            { id: "getting-started/installation", title: "Installation" },
            { id: "getting-started/quickstart", title: "Quickstart" },
            { id: "getting-started/configuration", title: "Configuration" }
        ]
    },
    {
        category: "Models",
        items: [
            { id: "models/model-library", title: "Model Library" },
            { id: "models/custom-models", title: "Custom Models" },
            { id: "models/import-gguf", title: "Import GGUF" }
        ]
    },
    {
        category: "API & Libraries",
        items: [
            { id: "api/rest-api", title: "REST API" },
            { id: "api/python-library", title: "Python Library" },
            { id: "api/javascript-library", title: "JavaScript Library" }
        ]
    },
    {
        category: "Advanced",
        items: [
            { id: "advanced/docker-deployment", title: "Docker Deployment" },
            { id: "advanced/gpu-acceleration", title: "GPU Acceleration" },
            { id: "advanced/multi-gpu", title: "Multi-GPU" },
            { id: "advanced/quantization", title: "Quantization" }
        ]
    }
];

const SolutionsMap = [
    {
        category: "Installation & Setup",
        items: [
            { id: "installation/gpu-not-detected", title: "GPU Not Detected" },
            { id: "installation/install-script-fails-linux", title: "Install Script Fails on Linux" },
            { id: "installation/llama-runner-terminated", title: "Llama Runner Terminated" }
        ]
    },
    {
        category: "Configuration",
        items: [
            { id: "docker/cannot-connect-from-container", title: "Cannot Connect from Container" },
            { id: "docker/gpu-in-docker", title: "GPU in Docker" },
            { id: "configuration/boolwithdefault-env-var-bug", title: "BoolWithDefault Bug" }
        ]
    },
    {
        category: "Performance",
        items: [
            { id: "performance/high-cpu-idle-windows", title: "High CPU Idle on Windows" },
            { id: "performance/slow-inference", title: "Slow Inference" }
        ]
    },
    {
        category: "Models",
        items: [
            { id: "models/gguf-import-failed", title: "GGUF Import Failed" },
            { id: "models/model-download-slow", title: "Model Download Slow" },
            { id: "models/qwen2-vl-gguf-image-recognition", title: "Qwen2-VL Image Recognition" }
        ]
    },
    {
        category: "API",
        items: [
            { id: "api/cors-error", title: "CORS Error" }
        ]
    }
];

// Flat maps for quick lookup
const flatDocs = DocsMap.flatMap(c => c.items);
const flatSolutions = SolutionsMap.flatMap(c => c.items);

async function loadMarkdownContent(type, id) {
    // default
    if (!id) {
        id = type === 'docs' ? 'getting-started/installation' : 'installation/gpu-not-detected';
    }
    
    // validate
    const map = type === 'docs' ? flatDocs : flatSolutions;
    const docItem = map.find(item => item.id === id);
    if (!docItem) {
        return { error: true, content: "<h1>404 - Not Found</h1><p>The requested document could not be found.</p>" };
    }
    
    try {
        const response = await fetch(`/knowledge-base/${type}/${id}.md`);
        if (!response.ok) throw new Error("Failed to load markdown file.");
        const text = await response.text();
        return { error: false, content: marked.parse(text), title: docItem.title, id: id };
    } catch (e) {
        console.error(e);
        return { error: true, content: `<h1>Error loading document</h1><p>${e.message}</p>` };
    }
}

function renderSidebar(type, currentId) {
    const map = type === 'docs' ? DocsMap : SolutionsMap;
    const container = document.getElementById('sidebar-nav');
    if (!container) return;
    
    let html = '';
    map.forEach(category => {
        html += `<div>
            <h3 class="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">${category.category}</h3>
            <ul class="space-y-1">`;
            
        category.items.forEach(item => {
            const isActive = item.id === currentId;
            const activeClasses = isActive 
                ? "text-indigo-600 font-medium bg-indigo-50" 
                : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50";
            
            // Generate link
            const baseUrl = type === 'docs' ? '/pages/docs/index.html' : '/pages/solutions/detail.html';
            html += `<li><a href="${baseUrl}?id=${item.id}" class="block text-sm py-1 px-2 rounded transition-colors ${activeClasses}">${item.title}</a></li>`;
        });
        
        html += `</ul></div>`;
    });
    
    container.innerHTML = html;
}

window.loadPage = async function(type) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    // Load and render markdown
    const result = await loadMarkdownContent(type, id);
    const article = document.getElementById('markdown-content');
    if (article) {
        article.innerHTML = result.content;
        
        // Process code blocks for syntax highlighting
        if (window.Prism) {
            Prism.highlightAllUnder(article);
        }
    }
    
    if (!result.error) {
        document.title = `${result.title} - ${type === 'docs' ? 'Docs' : 'Solutions'} - OllamaHub`;
    }
    
    // Render sidebar
    renderSidebar(type, result.id || id);
    
    // Generate TOC
    generateTOC();
    
    // Setup Navigation Buttons
    setupNavigation(type, result.id || id);
};

function generateTOC() {
    const article = document.getElementById('markdown-content');
    const tocContainer = document.getElementById('toc-container');
    if (!article || !tocContainer) return;
    
    const headings = article.querySelectorAll('h2, h3');
    if (headings.length === 0) {
        tocContainer.innerHTML = '<p class="text-sm text-slate-500">No headings.</p>';
        return;
    }
    
    let html = '<h4 class="font-semibold text-slate-900 mb-3 text-sm">On this page</h4><ul class="space-y-2 text-sm">';
    
    headings.forEach((h, index) => {
        if (!h.id) h.id = 'heading-' + index;
        const level = h.tagName.toLowerCase() === 'h2' ? 2 : 3;
        const pl = level === 3 ? 'pl-3 border-l border-slate-100 mt-1 space-y-1 text-xs' : '';
        const color = level === 3 ? 'text-slate-500' : 'text-slate-600';
        
        html += `<li class="${level === 3 ? 'ml-2' : ''}"><a href="#${h.id}" class="block ${color} hover:text-indigo-600 py-0.5">${h.textContent}</a></li>`;
    });
    
    html += '</ul>';
    tocContainer.innerHTML = html;
}

function setupNavigation(type, currentId) {
    const map = type === 'docs' ? flatDocs : flatSolutions;
    const currentIndex = map.findIndex(item => item.id === currentId);
    
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        if (currentIndex > 0) {
            const prev = map[currentIndex - 1];
            prevBtn.href = `?id=${prev.id}`;
            prevBtn.innerHTML = `← <span class="ml-1">${prev.title}</span>`;
            prevBtn.style.display = 'block';
        } else {
            prevBtn.style.display = 'none';
        }
    }
    
    if (nextBtn) {
        if (currentIndex < map.length - 1) {
            const next = map[currentIndex + 1];
            nextBtn.href = `?id=${next.id}`;
            nextBtn.innerHTML = `
                <div class="text-right">
                    <div class="text-xs text-slate-500 font-normal">Next</div>
                    <div>${next.title}</div>
                </div>
                <i class="ph ph-arrow-right"></i>
            `;
            nextBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'none';
        }
    }
}
