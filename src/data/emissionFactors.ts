/**
 * EcoPulse AI — Emission Factors Reference Data
 * CO₂ equivalent emission factors for various activities.
 * Sources: EPA, DEFRA, Indian government emission databases.
 */

/** Emission factors in kg CO₂e per unit */
export const EMISSION_FACTORS = {
  /** Transportation (per km per year of daily commute) */
  transport: {
    car_petrol: 0.192,        // kg CO₂e per km
    car_diesel: 0.171,
    electric_vehicle: 0.053,
    motorbike: 0.103,
    bus: 0.089,
    metro: 0.033,
    train: 0.041,
    bicycle: 0,
    walking: 0,
    flight_domestic: 0.255,   // per passenger-km
    flight_international: 0.195,
  },

  /** Electricity (per kWh) */
  electricity: {
    grid_india: 0.82,         // India grid emission factor
    grid_global_avg: 0.475,
    solar: 0.041,
    wind: 0.012,
  },

  /** Food (per kg) */
  food: {
    beef: 27.0,
    lamb: 39.2,
    pork: 12.1,
    chicken: 6.9,
    fish: 6.1,
    eggs_dozen: 4.8,
    milk_liter: 3.2,
    cheese: 13.5,
    rice: 2.7,
    vegetables: 2.0,
    fruit: 1.1,
    bread: 0.8,
    lentils: 0.9,
    tofu: 2.0,
  },

  /** Shopping (per item) */
  shopping: {
    tshirt: 8.0,              // kg CO₂e per garment
    jeans: 33.4,
    dress: 22.0,
    shoes: 14.0,
    smartphone: 70.0,
    laptop: 300.0,
    television: 350.0,
    furniture_piece: 47.0,
  },

  /** Waste (per kg) */
  waste: {
    landfill: 0.587,
    incineration: 0.021,
    recycling: -0.5,
    composting: -0.1,
    plastic_bag: 0.033,       // per bag
    plastic_bottle: 0.082,    // per bottle
  },

  /** Water (per cubic meter) */
  water: {
    supply: 0.344,
    treatment: 0.708,
    heating_gas: 2.0,         // per m³ heated
    heating_electric: 3.3,
  },
} as const;

/** National averages for comparison (annual per person, kg CO₂e) */
export const NATIONAL_AVERAGES = {
  india: 1900,
  china: 7380,
  usa: 15520,
  uk: 5550,
  germany: 8090,
  global: 4700,
} as const;

/** Average household breakdowns by category (% of total) */
export const TYPICAL_BREAKDOWN = {
  transportation: 28,
  electricity: 22,
  food: 25,
  shopping: 12,
  waste: 8,
  water: 5,
} as const;
