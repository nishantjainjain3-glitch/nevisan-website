#!/usr/bin/env python3
"""
Update Nevisan product page titles, meta descriptions, OpenGraph tags,
Product schema descriptions, and inject FAQPage structured data
to capture high-intent Indian search queries.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PRODUCTS_SEO = {
    "chamomile-green-tea": {
        "title": "Chamomile Green Tea for Sleep & Stress Relief | Nevisan Tea",
        "description": "Natural whole-leaf Assam green tea blended with pure chamomile flowers. Soothing bedtime brew for deep sleep, stress relief, and calm evenings. Order 50g loose leaf.",
        "product_description": "Whole-leaf Assam green tea blended with pure chamomile flowers for bedtime relaxation, deep sleep support, and stress relief.",
        "faqs": [
            {
                "q": "Is Chamomile green tea good for sleep and relaxation?",
                "a": "Yes. Chamomile flowers contain apigenin, an antioxidant that binds to specific receptors in the brain to promote calm, reduce stress, and support deep, natural sleep."
            },
            {
                "q": "Does Chamomile green tea contain caffeine?",
                "a": "It contains a low amount of caffeine from the whole green tea leaves, balanced by the relaxing properties of chamomile flowers."
            },
            {
                "q": "How do I brew Chamomile green tea?",
                "a": "Steep 2 grams of whole leaves in 85°C water for 2 minutes. Strain and enjoy warm before winding down."
            }
        ]
    },
    "gaba-oolong-tea": {
        "title": "GABA Oolong Tea for Focus, Stress Relief & Sleep | Nevisan Tea",
        "description": "Single-origin Assam GABA oolong tea naturally rich in GABA. Calms the mind, relieves stress, and sharpens mental focus without jitters. Order 50g whole leaf.",
        "product_description": "Single-origin Assam GABA oolong tea naturally enriched with GABA for stress relief, calm focus, and restorative sleep.",
        "faqs": [
            {
                "q": "What makes GABA oolong tea special?",
                "a": "GABA oolong undergoes a specialized nitrogen-rich anaerobic oxidation process that naturally converts glutamic acid into high concentrations of gamma-aminobutyric acid (GABA), known to calm the central nervous system."
            },
            {
                "q": "What are the main benefits of GABA tea?",
                "a": "GABA tea helps lower stress, ease mental tension, enhance focused concentration, and support relaxed evening sleep without morning grogginess."
            },
            {
                "q": "How does GABA oolong taste?",
                "a": "It offers a rich, smooth cup with notes of toasty amber, ripe stone fruit, and delicate wild honey."
            }
        ]
    },
    "spearmint-green-tea": {
        "title": "Spearmint Green Tea for PCOS, Hormonal Balance & Acne | Nevisan Tea",
        "description": "Pure whole-leaf green tea with Egyptian spearmint leaves. Formulated for women's hormonal balance, PCOS support, and clear skin. Order fresh 50g loose leaf.",
        "product_description": "Whole-leaf Assam green tea blended with natural spearmint leaves for PCOS support, hormonal balance, and clear skin.",
        "faqs": [
            {
                "q": "Does spearmint tea help with PCOS and hormonal acne?",
                "a": "Research indicates that spearmint tea can help lower free testosterone and reduce androgen levels in women, helping balance hormones and reduce hormonal acne and hirsutism."
            },
            {
                "q": "How often should I drink spearmint tea for PCOS support?",
                "a": "Most clinical studies recommend drinking 1 to 2 cups daily consistently over several weeks for optimal hormonal and skin wellness."
            },
            {
                "q": "How should I brew Nevisan Spearmint green tea?",
                "a": "Steep 2 grams of loose leaves in hot water (85°C) for 2 to 3 minutes to extract the fragrant spearmint essential oils."
            }
        ]
    },
    "blue-flower-green-tea": {
        "title": "Blue Flower Green Tea — Butterfly Pea / Aparajita | Nevisan Tea",
        "description": "Vibrant blue tea with Butterfly Pea (Aparajita) flowers and whole-leaf Assam green tea. Rich in antioxidants for glowing skin, hair health, and mocktails. 50g.",
        "product_description": "Whole-leaf Assam green tea with Butterfly Pea (Aparajita) flowers. Rich in anthocyanin antioxidants for skin glow, hair health, and color-changing tea.",
        "faqs": [
            {
                "q": "What is Blue Flower tea made from?",
                "a": "Nevisan Blue Flower Green Tea blends natural whole-leaf Assam green tea with whole dried Butterfly Pea flowers (Clitoria ternatea), also known as Aparajita or Shankhpushpi."
            },
            {
                "q": "Does the tea change color?",
                "a": "Yes. The vibrant blue color naturally turns rich purple or violet when you add a few drops of lemon juice or citrus due to the pH change of the anthocyanin antioxidants."
            },
            {
                "q": "What are the health benefits of Butterfly Pea flower tea?",
                "a": "It is rich in proanthocyanidins and flavonoids that support skin collagen, hair strength, and overall antioxidant defense."
            }
        ]
    },
    "ginger-green-tea": {
        "title": "Ginger Green Tea for Digestion, Bloating & Cold Relief | Nevisan Tea",
        "description": "Zesty sun-dried ginger root with whole-leaf Assam green tea. Natural digestive aid for bloating relief, soothing sore throat, and morning metabolism. 50g.",
        "product_description": "Whole-leaf Assam green tea blended with dried ginger root for digestive wellness, metabolism support, and throat comfort.",
        "faqs": [
            {
                "q": "What are the benefits of Ginger green tea?",
                "a": "Ginger green tea combines the gingerol of real ginger with the catechins of whole-leaf green tea to aid digestion, ease bloating, soothe sore throats, and support immune defense."
            },
            {
                "q": "Can I drink Ginger green tea on an empty stomach?",
                "a": "It makes a warm, invigorating morning drink. If you have a sensitive stomach, enjoying it after breakfast or meals is best to aid digestion."
            },
            {
                "q": "Does Nevisan use artificial ginger flavoring?",
                "a": "No. We use 100% natural sun-dried ginger pieces combined with single-origin whole Assam green tea leaves."
            }
        ]
    },
    "lemongrass-green-tea": {
        "title": "Lemongrass Green Tea for Morning Detox & Digestion | Nevisan Tea",
        "description": "Crisp, citrusy Assam green tea infused with aromatic lemongrass. Refreshing morning detox tea supporting healthy digestion and clean energy. 50g.",
        "product_description": "Whole-leaf Assam green tea with fragrant lemongrass for clean morning energy, detox, and digestive comfort.",
        "faqs": [
            {
                "q": "What are the health benefits of Lemongrass green tea?",
                "a": "Lemongrass contains citral and essential oils that promote healthy digestion, relieve fluid retention, and support daily body detox and clean alertness."
            },
            {
                "q": "When is the best time to drink Lemongrass green tea?",
                "a": "It is ideal as a morning or mid-day beverage for a refreshing citrus lift and clean energy boost."
            },
            {
                "q": "Can Lemongrass green tea be enjoyed iced?",
                "a": "Brew hot for 3 minutes, allow to cool, and pour over ice with a slice of lemon for a crisp, refreshing iced tea."
            }
        ]
    },
    "tulsi-green-tea": {
        "title": "Tulsi Green Tea for Immunity & Respiratory Defense | Nevisan Tea",
        "description": "Sacred Holy Basil (Rama, Krishna & Vana Tulsi) blended with whole-leaf Assam green tea. Daily adaptogenic brew for immune defense and stress relief. 50g.",
        "product_description": "Whole-leaf Assam green tea with sacred Holy Basil (Tulsi) for daily immune support, respiratory defense, and stress relief.",
        "faqs": [
            {
                "q": "What makes Tulsi an effective adaptogen?",
                "a": "Tulsi (Holy Basil) has been revered in Ayurveda for thousands of years as an adaptogenic herb that helps the body adapt to physical and mental stress while bolstering respiratory health."
            },
            {
                "q": "Does Tulsi green tea help with cough and seasonal colds?",
                "a": "Yes. The natural eugenol and bioflavonoids in Tulsi leaves help soothe the respiratory tract and clear congestion when consumed warm."
            },
            {
                "q": "Can I drink Tulsi green tea every day?",
                "a": "Yes, it is designed as a daily wellness tea to strengthen baseline immunity and maintain steady energy throughout the day."
            }
        ]
    },
    "organic-green-tea": {
        "title": "Organic Green Tea — Pure Whole Leaf Assam Tea for Metabolism | Nevisan Tea",
        "description": "Certified organic single-origin whole-leaf green tea from Upper Assam. Rich in catechins and EGCG for natural metabolism, daily detox, and active wellness. 50g.",
        "product_description": "Certified organic single-origin whole-leaf green tea from Upper Assam. High in natural antioxidants and EGCG for daily metabolism and wellness.",
        "faqs": [
            {
                "q": "Why choose whole-leaf green tea over tea bags?",
                "a": "Whole-leaf green tea contains intact, unbroken tea leaves that release full catechins, antioxidants, and nuanced flavor without the bitterness and dust found in conventional tea bags."
            },
            {
                "q": "Does organic green tea help with weight management and metabolism?",
                "a": "Green tea contains epigallocatechin gallate (EGCG) and mild natural caffeine, which have been shown to help support healthy metabolic rate and fat oxidation when combined with a balanced diet."
            },
            {
                "q": "Where is Nevisan Organic Green Tea sourced from?",
                "a": "It is grown organically and harvested directly from certified high-elevation tea estates in Upper Assam, India."
            }
        ]
    },
    "whiskey-green-tea": {
        "title": "Whiskey Green Tea — Non-Alcoholic Smoky Oak Artisan Blend | Nevisan Tea",
        "description": "Handcrafted artisan green tea with charred oak and peated malt aromas. Zero alcohol, bold smoky character, and smooth finish. Premium 50g loose leaf.",
        "product_description": "Artisan whole-leaf Assam green tea infused with charred oak and peated malt aromas. Zero alcohol, bold smoky flavor profile.",
        "faqs": [
            {
                "q": "Does Whiskey Green Tea contain alcohol?",
                "a": "No. It is 100% non-alcoholic. The smoky, peated malt and charred oak profile is crafted entirely using natural botanical infusions and oak wood aromatics."
            },
            {
                "q": "What is the flavor profile of Whiskey Green Tea?",
                "a": "It delivers a bold, warming cup reminiscent of single-malt scotch with smoky peat, warm vanilla oak, and the smooth vegetal base of whole Assam green tea."
            },
            {
                "q": "Is this blend suitable for gifting?",
                "a": "Yes. It is popular among tea connoisseurs, whiskey enthusiasts, and those looking for an innovative alcohol-free evening sipping ritual."
            }
        ]
    },
    "rum-green-tea": {
        "title": "Rum Green Tea — Non-Alcoholic Spiced Caramel Artisan Blend | Nevisan Tea",
        "description": "Warm sugarcane notes, warm festive spices, and rich whole-leaf Assam green tea. Zero alcohol, naturally fragrant, and smooth. Luxury 50g loose leaf.",
        "product_description": "Artisan whole-leaf Assam green tea with sugarcane notes, warm spices, and oak aromatics. 100% non-alcoholic.",
        "faqs": [
            {
                "q": "Does Rum Green Tea contain alcohol?",
                "a": "No. It is 100% non-alcoholic, delivering the festive aroma of spiced dark rum, molasses, and warm cinnamon using pure botanicals without alcohol."
            },
            {
                "q": "How should I enjoy Rum Green Tea?",
                "a": "Brew with freshly boiled water (85°C) for 2 to 3 minutes. It can be enjoyed hot on cool evenings or sweetened lightly with honey."
            },
            {
                "q": "What ingredients are in this blend?",
                "a": "Whole Assam green tea leaves blended with natural botanical spices and sugarcane aromatics."
            }
        ]
    }
}


def update_page(slug, data):
    html_path = ROOT / "products" / slug / "index.html"
    if not html_path.exists():
        print(f"Skipping missing: {html_path}")
        return

    content = html_path.read_text(encoding="utf-8")

    # 1. Update <title>
    content = re.sub(r"<title>.*?</title>", f"<title>{data['title']}</title>", content)

    # 2. Update <meta name="description" content="...">
    content = re.sub(
        r'<meta name="description" content=".*?">',
        f'<meta name="description" content="{data["description"]}">',
        content,
    )

    # 3. Update OpenGraph and Twitter tags
    content = re.sub(
        r'<meta property="og:title" content=".*?">',
        f'<meta property="og:title" content="{data["title"]}">',
        content,
    )
    content = re.sub(
        r'<meta property="og:description" content=".*?">',
        f'<meta property="og:description" content="{data["description"]}">',
        content,
    )
    content = re.sub(
        r'<meta name="twitter:title" content=".*?">',
        f'<meta name="twitter:title" content="{data["title"]}">',
        content,
    )
    content = re.sub(
        r'<meta name="twitter:description" content=".*?">',
        f'<meta name="twitter:description" content="{data["description"]}">',
        content,
    )

    # 4. Update Product JSON-LD description
    def update_product_json(match):
        raw = match.group(1)
        try:
            parsed = json.loads(raw)
            if parsed.get("@type") == "Product":
                parsed["description"] = data["product_description"]
                return f'<script type="application/ld+json">\n{json.dumps(parsed, indent=2, ensure_ascii=False)}\n</script>'
        except Exception:
            pass
        return match.group(0)

    content = re.sub(
        r'<script type="application/ld\+json">\s*(\{\s*"@context":\s*"https://schema\.org/?",\s*"@type":\s*"Product".*?\})\s*</script>',
        update_product_json,
        content,
        flags=re.DOTALL,
    )

    # 5. Inject or update FAQPage schema
    faq_schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": item["q"],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item["a"]
                }
            }
            for item in data["faqs"]
        ]
    }
    faq_script = f'<script type="application/ld+json">\n{json.dumps(faq_schema, indent=2, ensure_ascii=False)}\n</script>'

    # Remove existing FAQPage schema if already present to avoid duplication
    content = re.sub(
        r'<script type="application/ld\+json">\s*\{\s*"@context":\s*"https://schema\.org",\s*"@type":\s*"FAQPage".*?\}\s*</script>\s*',
        "",
        content,
        flags=re.DOTALL,
    )

    # Inject FAQPage schema right after BreadcrumbList schema before <style>
    breadcrumb_pattern = r'(</script>\s*)(<style>)'
    if re.search(breadcrumb_pattern, content):
        content = re.sub(
            breadcrumb_pattern,
            rf'\1\n    {faq_script}\n\n    \2',
            content,
            count=1
        )

    # Ensure exact CRLF line endings matching working tree
    content = content.replace('\r\n', '\n').replace('\n', '\r\n')
    html_path.write_bytes(content.encode('utf-8'))
    print(f"Updated {slug}: SEO Title & Description + FAQ Schema applied.")


def main():
    for slug, data in PRODUCTS_SEO.items():
        update_page(slug, data)
    print("All 10 product pages updated successfully.")


if __name__ == "__main__":
    main()
