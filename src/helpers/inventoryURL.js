//====================
// ACCOUNTING ROUTES
//====================

/**
 * Quotation Pages
 */
export const inventoryPage = "/app/inventory/dashboard";

/**
 * Invoice Pages
 */
export const allCarsPage = "/app/inventory/allcars";

export const allPreownedCarsPage = "/app/inventory/allpreownedcars";
/**
 * Credit Note Pages
 */
export const configurePage = "/app/inventory/configure";

export const skuListPage = "/app/inventory/sku";
export const singleSKU = id => `${skuListPage}/${id}`;
export const skuNewPage = skuListPage + "/new";
