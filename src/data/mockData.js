export const farmer = {
  name: 'pranav daure', initials: 'RP', location: 'Nashik, Maharashtra', village: 'nashik', crop: 'Onion', quantity: 5000, quality: 'Grade A',
}

export const marketPrices = [
  { market: 'Nashik', min: 23, max: 27, modal: 25, change: 4.3, transport: 0 },
  { market: 'Pune', min: 25, max: 29, modal: 27, change: 3.4, transport: 1.4 },
  { market: 'Mumbai', min: 27, max: 31, modal: 29, change: 4.9, transport: 2 },
]

export const priceTrend = [
  { day: '22 Aug', price: 21.8, forecast: null },
  { day: '23 Aug', price: 22.4, forecast: null },
  { day: '24 Aug', price: 22.1, forecast: null },
  { day: '25 Aug', price: 23.2, forecast: null },
  { day: '26 Aug', price: 23.8, forecast: null },
  { day: '27 Aug', price: 24.3, forecast: null },
  { day: '28 Aug', price: 25, forecast: 25 },
  { day: '29 Aug', price: null, forecast: 26.1 },
  { day: '30 Aug', price: null, forecast: 27.2 },
]

export const marketSnapshot = [
  { crop: 'Onion', price: 25, mandi: 'Nashik Mandi', change: 4.3, direction: 'up', tone: 'emerald' },
  { crop: 'Tomato', price: 31, mandi: 'Nashik Mandi', change: 2.1, direction: 'up', tone: 'orange' },
  { crop: 'Wheat', price: 26, mandi: 'Pune Mandi', change: 1.2, direction: 'down', tone: 'amber' },
]

export const buyers = [
  {
    id: 'abc-foods', name: 'ABC Foods Pvt. Ltd.', shortName: 'ABC Foods', match: 95, price: 29, quantity: 5000, capacity: 'Up to 10,000 kg', location: 'Pune, Maharashtra', city: 'Pune', distance: 145, payment: 'Within 3 days', rating: 4.8, transactions: 124, reliability: 96, verified: true,
    reasons: ['Matches crop requirements', 'Grade A quality accepted', 'Ideal quantity range', '₹1/kg above your expectation', 'Reasonable transport distance', 'Excellent payment reliability'],
  },
  { id: 'freshmart', name: 'FreshMart Retail', shortName: 'FreshMart', match: 88, price: 28, quantity: 3000, capacity: 'Up to 6,000 kg', location: 'Mumbai, Maharashtra', city: 'Mumbai', distance: 170, payment: 'Within 5 days', rating: 4.6, transactions: 86, reliability: 92, verified: true },
  { id: 'agrofresh', name: 'AgroFresh Produce', shortName: 'AgroFresh', match: 82, price: 27, quantity: 4000, capacity: 'Up to 5,000 kg', location: 'Nashik, Maharashtra', city: 'Nashik', distance: 19, payment: 'Within 3 days', rating: 4.4, transactions: 53, reliability: 90, verified: true },
]

export const matchingFactors = [
  ['Crop Compatibility', 30, 100], ['Quality Match', 20, 100], ['Quantity Match', 15, 93], ['Price Compatibility', 20, 96], ['Distance', 10, 88], ['Buyer Reliability', 5, 96],
]

export const logistics = [
  { id: 'truck-a', name: 'Truck A', capacity: '5 Ton', price: 8000, eta: '4 hrs', driver: 'Suresh Logistics', tag: 'Recommended' },
  { id: 'truck-b', name: 'Truck B', capacity: '7 Ton', price: 10500, eta: '5 hrs', driver: 'Maharashtra Haulage', tag: null },
]
