const promotionsDB = [
  { title: 'SALE 10%', code: 'SALE10', discountPercent: 10, active: true },
  { title: 'SALE 20%', code: 'SALE20', discountPercent: 20, active: false },
];

export function findPromotion(code) {
  return promotionsDB.find(p => p.code === code && p.active);
}

export function getActivePromotions() {
  return promotionsDB.filter(p => p.active);
}
