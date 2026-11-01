document.addEventListener("DOMContentLoaded", () => {
    // المان‌ها
    const categoryList = document.getElementById('category-list');
    const servicesGrid = document.getElementById('services-grid');
    const searchInput = document.getElementById('search-input');
    const categoryTitle = document.getElementById('current-category-title');
    const emptyState = document.getElementById('empty-state');
    const cartCountEl = document.getElementById('cart-count');

    // استیت سبد خرید
    let cart = JSON.parse(localStorage.getItem('mcx_cart')) || [];

    // --- 1. توابع سبد خرید ---
    window.addToCart = function(sku, name, price) {
        if (price <= 0) return alert("قیمت این خدمت هنوز تعیین نشده، سردار! 🫡");
        
        const existing = cart.find(item => item.sku === sku);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ sku, name, price, qty: 1 });
        }
        
        localStorage.setItem('mcx_cart', JSON.stringify(cart));
        updateCartUI();
        
        // افکت بصری روی دکمه (اختیاری)
        alert(`✅ "${name}" به سبد خرید اضافه شد!`);
    };

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountEl.textContent = totalItems;
        cartCountEl.style.background = totalItems > 0 ? 'var(--neon-purple)' : '#000';
    }

    // --- 2. رندر شاخه‌ها ---
    function renderCategories() {
        if (!window.MCX_SERVICES) return console.error("دیتابیس لود نشد!");
        
        let html = '';
        window.MCX_SERVICES.forEach(cat => {
            html += `<li data-id="${cat.id}">${cat.title}</li>`;
        });
        categoryList.innerHTML = html;

        categoryList.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
                e.target.classList.add('active');
                loadCategory(e.target.getAttribute('data-id'));
            }
        });
    }

    // --- 3. لود خدمات شاخه ---
    function loadCategory(catId) {
        emptyState.classList.add('hidden');
        categoryTitle.classList.remove('hidden');
        servicesGrid.classList.remove('hidden');

        const category = window.MCX_SERVICES.find(c => c.id === catId);
        if(!category) return;

        categoryTitle.innerText = category.title;
        
        let servicesToRender = [];
        category.sub_categories.forEach(sub => {
            servicesToRender.push(...sub.services);
        });

        renderServices(servicesToRender);
    }

    // --- 4. رندر کارت‌ها ---
    function renderServices(services) {
        if (services.length === 0) {
            servicesGrid.innerHTML = `<p style="color:#888; grid-column: 1/-1;">خدمتی یافت نشد.</p>`;
            return;
        }

        let html = '';
        services.forEach(srv => {
            let badgeClass = srv.automation;
            let badgeText = 'ترکیبی 🤝';
            if (srv.automation === 'ai_auto') badgeText = 'اتوماتیک 🤖';
            if (srv.automation === 'human_only') badgeText = 'انسانی 👤';

            html += `
                <div class="service-card">
                    <div>
                        <h4>${srv.name}</h4>
                        <p class="service-desc">${srv.description || 'بدون توضیحات'}</p>
                        <div class="service-sku">SKU: ${srv.sku}</div>
                    </div>
                    <div>
                        <div class="card-footer">
                            <span class="badge ${badgeClass}">${badgeText}</span>
                            <span class="price">${srv.base_price_usd > 0 ? '$'+srv.base_price_usd : 'تماس بگیرید'}</span>
                        </div>
                        <button class="btn-add" onclick="addToCart('${srv.sku}', '${srv.name}', ${srv.base_price_usd})">افزودن به سبد 🛒</button>
                    </div>
                </div>
            `;
        });
        servicesGrid.innerHTML = html;
    }

    // --- 5. جستجو (Debounce) ---
    let timeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const query = e.target.value.trim().toLowerCase();
            
            if (query.length < 2) {
                emptyState.classList.remove('hidden');
                categoryTitle.classList.add('hidden');
                servicesGrid.classList.add('hidden');
                // پاک کردن حالت اکتیو سایدبار
                document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
                return;
            }

            emptyState.classList.add('hidden');
            categoryTitle.classList.remove('hidden');
            servicesGrid.classList.remove('hidden');

            let results = [];
            window.MCX_SERVICES.forEach(cat => {
                cat.sub_categories.forEach(sub => {
                    sub.services.forEach(srv => {
                        if (srv.name.toLowerCase().includes(query) || srv.sku.toLowerCase().includes(query)) {
                            results.push(srv);
                        }
                    });
                });
            });
            
            categoryTitle.innerText = `نتایج جستجو برای: "${query}" (${results.length} مورد)`;
            renderServices(results);
        }, 300); 
    });

    // شروع
    renderCategories();
    updateCartUI();
});
