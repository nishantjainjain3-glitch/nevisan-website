"""Compatibility entry point: product SEO now uses the verified catalog.

Update content/product-catalog.json and run either catalog sync command.
"""
from sync_product_catalog import main

if __name__ == '__main__':
    main()
