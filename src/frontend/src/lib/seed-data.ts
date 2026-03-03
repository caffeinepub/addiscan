/**
 * Default additives to seed into the database when it's empty.
 */
export const DEFAULT_ADDITIVES = [
  {
    name: "Sodium benzoate",
    eNumber: "E211" as string | null,
    category: "Preservative",
    description:
      "Prevents growth of harmful bacteria and fungi in acidic foods.",
    healthEffects: "May cause allergic reactions in sensitive individuals.",
    commonProducts: ["Soft drinks", "Fruit juices", "Pickles"],
    alternatives: [
      "Natural preservatives",
      "Rosemary extract",
      "Fermentation",
      "Citric acid",
    ],
  },
  {
    name: "Aspartame",
    eNumber: "E951" as string | null,
    category: "Sweetener",
    description: "Intense artificial sweetener used in low-calorie foods.",
    healthEffects:
      "Contradictory research on safety; safe for most except those with phenylketonuria.",
    commonProducts: ["Diet sodas", "Sugar-free gum", "Low-calorie desserts"],
    alternatives: ["Stevia", "Monk fruit extract", "Erythritol"],
  },
  {
    name: "Carrageenan",
    eNumber: "E407" as string | null,
    category: "Stabilizer, thickener",
    description:
      "Derived from red seaweed, used to thicken and stabilize foods.",
    healthEffects: "May cause digestive issues in some individuals.",
    commonProducts: ["Dairy products", "Plant-based milks", "Processed meats"],
    alternatives: ["Agar-agar", "Guar gum", "Xanthan gum"],
  },
  {
    name: "Tartrazine",
    eNumber: "E102" as string | null,
    category: "Colorant",
    description: "Synthetic lemon yellow azo dye used in food coloring.",
    healthEffects:
      "May cause hyperactivity in children and allergic reactions.",
    commonProducts: ["Candies", "Baked goods", "Soft drinks"],
    alternatives: ["Turmeric extract", "Beta-carotene", "Annatto"],
  },
  {
    name: "Sodium nitrate",
    eNumber: "E251" as string | null,
    category: "Preservative",
    description:
      "Prevents growth of bacteria and retains color in processed meats.",
    healthEffects:
      "Potentially carcinogenic when combined with proteins at high temperatures.",
    commonProducts: ["Cured meats", "Hot dogs", "Bacon"],
    alternatives: ["Natural curing", "Celery juice powder", "Sea salt"],
  },
  {
    name: "Monosodium glutamate (MSG)",
    eNumber: "E621" as string | null,
    category: "Flavor enhancer",
    description: "Enhances savory taste in foods.",
    healthEffects:
      "Controversially linked to headaches and allergic reactions.",
    commonProducts: ["Snack foods", "Seasonings", "Prepared soups"],
    alternatives: ["Mushroom powder", "Tomato paste", "Nutritional yeast"],
  },
  {
    name: "Polysorbate 80",
    eNumber: "E433" as string | null,
    category: "Emulsifier, stabilizer",
    description: "Prevents separation of oil and water in foods.",
    healthEffects:
      "Generally recognized as safe but may cause digestive issues in high amounts.",
    commonProducts: ["Ice cream", "Salad dressings", "Baked goods"],
    alternatives: ["Lecithin", "Mustard", "Honey"],
  },
  {
    name: "Sulfites",
    eNumber: "E220-E228" as string | null,
    category: "Preservative",
    description: "Prevents browning and spoilage in foods and beverages.",
    healthEffects: "Can cause allergic reactions, especially in asthmatics.",
    commonProducts: ["Wine", "Dried fruits", "Pickled vegetables"],
    alternatives: ["Vitamin C", "Ascorbic acid", "Proper refrigeration"],
  },
  {
    name: "Xanthan gum",
    eNumber: "E415" as string | null,
    category: "Thickener, stabilizer",
    description: "Adds viscosity and stability to food products.",
    healthEffects:
      "Generally recognized as safe but may cause digestive issues in high amounts.",
    commonProducts: ["Gluten-free products", "Salad dressings", "Baked goods"],
    alternatives: ["Guar gum", "Psyllium husk", "Chia seeds"],
  },
  {
    name: "Butylated hydroxytoluene (BHT)",
    eNumber: "E321" as string | null,
    category: "Antioxidant, preservative",
    description: "Prevents oxidation and spoilage of fats in foods.",
    healthEffects:
      "Potentially carcinogenic at high levels, but considered safe in low amounts.",
    commonProducts: ["Breakfast cereals", "Snacks", "Chewing gums"],
    alternatives: ["Vitamin E", "Tocopherols", "Rosemary extract"],
  },
];
