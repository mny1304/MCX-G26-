hereconst mcxServicesDB = [
  {
    "id": "MCX-DES",
    "title": "🎨 MCX Design (طراحی گرافیک و هویت بصری)",
    "sub_categories": [
      {
        "id": "MCX-DES-LOG",
        "title": "طراحی لوگو",
        "services": [
          {
            "sku": "MCX-DES-LOG-001",
            "name": "طراحی لوگو نئونی",
            "base_price_usd": 50,
            "delivery_time": "3 روز",
            "automation": "hybrid",
            "requirements": ["نام برند", "حوزه فعالیت", "لوگوی قدیمی (اختیاری)"],
            "addons": [
              { "sku": "ADD-NEO-01", "name": "افکت درخشش نئون", "price_usd": 15 },
              { "sku": "ADD-ANI-01", "name": "انیمیشن لوگو (GIF)", "price_usd": 25 }
            ]
          },
          {
            "sku": "MCX-DES-LOG-002",
            "name": "طراحی لوگوتایپ",
            "base_price_usd": 40,
            "delivery_time": "2 روز",
            "automation": "ai_auto",
            "requirements": ["نام برند", "سبک مورد نظر"],
            "addons": []
          }
        ]
      },
      {
        "id": "MCX-DES-BRD",
        "title": "برندینگ و هویت",
        "services": [
          {
            "sku": "MCX-DES-BRD-001",
            "name": "طراحی برندبوک",
            "base_price_usd": 150,
            "delivery_time": "7 روز",
            "automation": "human_only",
            "requirements": ["لوگو", "رنگ سازمانی", "تایپوگرافی"],
            "addons": []
          }
        ]
      }
    ]
  },
  {
    "id": "MCX-AI",
    "title": "🤖 MCX AI (هوش مصنوعی)",
    "sub_categories": [
      {
        "id": "MCX-AI-AGT",
        "title": "ایجنت‌های هوشمند",
        "services": [
          {
            "sku": "MCX-AI-AGT-001",
            "name": "AI Agent اختصاصی",
            "base_price_usd": 500,
            "delivery_time": "14 روز",
            "automation": "hybrid",
            "requirements": ["هدف ایجنت", "اتصال به دیتابیس", "APIهای مورد نیاز"],
            "addons": [
              { "sku": "ADD-AGT-RAG", "name": "اتصال به RAG (دیتابیس برداری)", "price_usd": 300 }
            ]
          }
        ]
      }
    ]
  }
];
