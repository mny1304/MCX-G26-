/**
 * MCX G26 - Services Database (v2.0)
 * Architecture: Matin Creator Xperience
 */

window.MCX_SERVICES = [
  {
    "id": "MCX-DES",
    "title": "🎨 MCX Design",
    "sub_categories": [
      {
        "id": "MCX-DES-CORE",
        "title": "طراحی پایه",
        "services": [
          { "sku": "MCX-DES-CORE-001", "name": "طراحی لوگو", "description": "نماد برند", "use_case": "شروع برند", "base_price_usd": 50, "automation": "hybrid" },
          { "sku": "MCX-DES-CORE-002", "name": "لوگوتایپ", "description": "طراحی نام برند", "use_case": "هویت بصری", "base_price_usd": 40, "automation": "ai_auto" },
          { "sku": "MCX-DES-CORE-003", "name": "برندبوک", "description": "راهنمای برند", "use_case": "سازمان‌ها", "base_price_usd": 150, "automation": "human_only" },
          { "sku": "MCX-DES-CORE-004", "name": "کارت ویزیت", "description": "معرفی کسب‌وکار", "use_case": "بازاریابی", "base_price_usd": 20, "automation": "ai_auto" }
        ]
      },
      {
        "id": "MCX-DES-ADS",
        "title": "تبلیغات بصری",
        "services": [
          { "sku": "MCX-DES-ADS-001", "name": "پوستر", "description": "تبلیغات بصری", "use_case": "کمپین تبلیغاتی", "base_price_usd": 30, "automation": "hybrid" },
          { "sku": "MCX-DES-ADS-002", "name": "بنر", "description": "تبلیغات آنلاین", "use_case": "وبسایت", "base_price_usd": 25, "automation": "ai_auto" }
        ]
      }
    ]
  },
  {
    "id": "MCX-WEB",
    "title": "🌐 MCX Web",
    "sub_categories": [
      {
        "id": "MCX-WEB-DESIGN",
        "title": "طراحی وب",
        "services": [
          { "sku": "MCX-WEB-001", "name": "لندینگ پیج", "description": "صفحه فرود", "use_case": "کمپین فروش", "base_price_usd": 100, "automation": "ai_auto" },
          { "sku": "MCX-WEB-002", "name": "سایت شخصی", "description": "معرفی فرد", "use_case": "برند شخصی", "base_price_usd": 150, "automation": "ai_auto" },
          { "sku": "MCX-WEB-003", "name": "سایت شرکتی", "description": "معرفی سازمان", "use_case": "کسب‌وکار", "base_price_usd": 300, "automation": "hybrid" },
          { "sku": "MCX-WEB-004", "name": "فروشگاه آنلاین", "description": "فروش اینترنتی", "use_case": "تجارت الکترونیک", "base_price_usd": 500, "automation": "human_only" }
        ]
      }
    ]
  },
  {
    "id": "MCX-AI",
    "title": "🤖 MCX AI",
    "sub_categories": [
      {
        "id": "MCX-AI-CORE",
        "title": "هوش مصنوعی",
        "services": [
          { "sku": "MCX-AI-001", "name": "چت‌بات", "description": "دستیار گفتگو", "use_case": "پشتیبانی", "base_price_usd": 150, "automation": "hybrid" },
          { "sku": "MCX-AI-002", "name": "AI Agent", "description": "عامل هوشمند", "use_case": "اتوماسیون", "base_price_usd": 500, "automation": "hybrid" },
          { "sku": "MCX-AI-003", "name": "RAG System", "description": "دانش اختصاصی", "use_case": "سازمان‌ها", "base_price_usd": 1000, "automation": "human_only" },
          { "sku": "MCX-AI-004", "name": "Fine-Tuning", "description": "آموزش مدل", "use_case": "شرکت‌ها", "base_price_usd": 2000, "automation": "human_only" }
        ]
      }
    ]
  },
  {
    "id": "MCX-CLOUD",
    "title": "☁️ MCX Cloud",
    "sub_categories": [
      {
        "id": "MCX-CLOUD-INFRA",
        "title": "زیرساخت",
        "services": [
          { "sku": "MCX-CLD-001", "name": "Cloudflare Setup", "description": "راه‌اندازی کلودفلر", "use_case": "امنیت", "base_price_usd": 50, "automation": "ai_auto" },
          { "sku": "MCX-CLD-002", "name": "DNS Management", "description": "مدیریت دامنه", "use_case": "زیرساخت", "base_price_usd": 20, "automation": "ai_auto" },
          { "sku": "MCX-CLD-003", "name": "CDN Setup", "description": "افزایش سرعت", "use_case": "سایت‌ها", "base_price_usd": 30, "automation": "ai_auto" }
        ]
      }
    ]
  }
];
