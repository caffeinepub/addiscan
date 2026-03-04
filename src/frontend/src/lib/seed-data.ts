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
  {
    name: "Potassium sorbate",
    eNumber: "E202" as string | null,
    category: "Preservative",
    description:
      "Inhibits mold and yeast growth; widely used in dairy and baked goods.",
    healthEffects:
      "Generally recognized as safe; rarely causes skin irritation.",
    commonProducts: ["Cheese", "Yogurt", "Bread", "Wine"],
    alternatives: ["Vinegar", "Salt", "Natural fermentation"],
  },
  {
    name: "Calcium propionate",
    eNumber: "E282" as string | null,
    category: "Preservative",
    description: "Prevents mold growth in bread and other baked goods.",
    healthEffects:
      "Some studies link it to behavioral changes in children at high doses.",
    commonProducts: ["Commercial bread", "Rolls", "Cakes"],
    alternatives: ["Acetic acid", "Sourdough fermentation", "Vinegar"],
  },
  {
    name: "Sorbic acid",
    eNumber: "E200" as string | null,
    category: "Preservative",
    description:
      "Natural organic compound that prevents mold and yeast spoilage.",
    healthEffects:
      "Considered safe; may cause mild skin reactions in rare cases.",
    commonProducts: ["Cheese", "Dried fruits", "Fruit juices"],
    alternatives: ["Potassium sorbate", "Salt", "Refrigeration"],
  },
  {
    name: "Acesulfame potassium",
    eNumber: "E950" as string | null,
    category: "Sweetener",
    description:
      "Heat-stable artificial sweetener, often combined with other sweeteners.",
    healthEffects:
      "Considered safe by regulatory agencies; some animal studies raised concerns at very high doses.",
    commonProducts: ["Diet beverages", "Sugar-free products", "Baked goods"],
    alternatives: ["Stevia", "Monk fruit extract", "Sucralose"],
  },
  {
    name: "Sucralose",
    eNumber: "E955" as string | null,
    category: "Sweetener",
    description: "Chlorinated sugar derivative with no calories.",
    healthEffects:
      "Generally recognized as safe; some studies suggest it may affect gut microbiome.",
    commonProducts: ["Diet drinks", "Sugar-free products", "Protein bars"],
    alternatives: ["Stevia", "Erythritol", "Xylitol"],
  },
  {
    name: "Lecithin",
    eNumber: "E322" as string | null,
    category: "Emulsifier",
    description:
      "Natural phospholipid derived from soy or sunflower; blends water and fat.",
    healthEffects:
      "Generally safe; those with soy allergies should check the source.",
    commonProducts: ["Chocolate", "Margarine", "Dressings", "Baked goods"],
    alternatives: ["Sunflower lecithin", "Mustard", "Egg yolk"],
  },
  {
    name: "Citric acid",
    eNumber: "E330" as string | null,
    category: "Acidity regulator, preservative",
    description: "Organic acid that adds tartness and prevents spoilage.",
    healthEffects:
      "Generally safe; may erode tooth enamel with excessive consumption.",
    commonProducts: ["Soft drinks", "Canned fruits", "Sweets", "Cosmetics"],
    alternatives: ["Lemon juice", "Vinegar", "Tartaric acid"],
  },
  {
    name: "Ascorbic acid (Vitamin C)",
    eNumber: "E300" as string | null,
    category: "Antioxidant",
    description: "Vitamin C used to prevent oxidation and color loss in foods.",
    healthEffects: "Safe; high doses may cause digestive upset.",
    commonProducts: ["Juices", "Cereals", "Cured meats", "Baked goods"],
    alternatives: [
      "Natural vitamin C",
      "Rosemary extract",
      "Green tea extract",
    ],
  },
  {
    name: "Propylene glycol",
    eNumber: "E1520" as string | null,
    category: "Humectant, carrier",
    description: "Retains moisture and carries flavors in processed foods.",
    healthEffects:
      "Considered safe in food-grade amounts; accumulates in the body in rare conditions.",
    commonProducts: ["Salad dressings", "Flavorings", "Ice cream"],
    alternatives: ["Vegetable glycerin", "Honey", "Sorbitol"],
  },
  {
    name: "Carmine",
    eNumber: "E120" as string | null,
    category: "Colorant",
    description: "Red dye derived from cochineal insects.",
    healthEffects:
      "Can cause severe allergic reactions; not suitable for vegans.",
    commonProducts: ["Yogurts", "Juices", "Sweets", "Cosmetics"],
    alternatives: ["Beet juice powder", "Elderberry extract", "Anthocyanins"],
  },
  {
    name: "Annatto",
    eNumber: "E160b" as string | null,
    category: "Colorant",
    description:
      "Natural orange-yellow dye from the seeds of the achiote tree.",
    healthEffects: "Generally safe; rare allergic reactions reported.",
    commonProducts: ["Cheese", "Butter", "Snacks", "Rice dishes"],
    alternatives: ["Turmeric", "Beta-carotene", "Paprika extract"],
  },
  {
    name: "Brilliant Blue FCF",
    eNumber: "E133" as string | null,
    category: "Colorant",
    description: "Synthetic blue dye used in confectionery and beverages.",
    healthEffects:
      "May cause hyperactivity in children when combined with other dyes.",
    commonProducts: ["Sweets", "Sports drinks", "Ice cream", "Frostings"],
    alternatives: [
      "Spirulina extract",
      "Butterfly pea flower",
      "Blueberry juice",
    ],
  },
  {
    name: "Calcium chloride",
    eNumber: "E509" as string | null,
    category: "Firming agent",
    description:
      "Maintains firmness and texture in canned vegetables and cheese.",
    healthEffects:
      "Safe at normal levels; excessive intake may affect mineral balance.",
    commonProducts: ["Canned tomatoes", "Pickles", "Cheese", "Sports drinks"],
    alternatives: ["Vinegar", "Lemon juice"],
  },
  {
    name: "Guar gum",
    eNumber: "E412" as string | null,
    category: "Thickener, stabilizer",
    description:
      "Natural polysaccharide from guar beans used to thicken foods.",
    healthEffects:
      "Generally safe; very high amounts may cause digestive discomfort.",
    commonProducts: ["Ice cream", "Sauces", "Gluten-free products", "Soups"],
    alternatives: ["Xanthan gum", "Psyllium husk", "Cornstarch"],
  },
  {
    name: "Butylated hydroxyanisole (BHA)",
    eNumber: "E320" as string | null,
    category: "Antioxidant, preservative",
    description: "Prevents rancidity and oxidation in fatty foods.",
    healthEffects:
      "Listed as possibly carcinogenic; considered safe in small quantities by most agencies.",
    commonProducts: ["Cereals", "Chips", "Instant noodles", "Lard"],
    alternatives: ["Vitamin E", "Rosemary extract", "BHT replacement blends"],
  },
  {
    name: "Modified starch",
    eNumber: "E1400-E1450" as string | null,
    category: "Thickener, stabilizer",
    description:
      "Chemically or physically treated starch for improved texture.",
    healthEffects: "Generally considered safe; may affect blood sugar.",
    commonProducts: ["Baby foods", "Sauces", "Instant soups", "Dressings"],
    alternatives: ["Arrowroot", "Tapioca starch", "Natural cornstarch"],
  },
  {
    name: "Ammonium carbonate",
    eNumber: "E503" as string | null,
    category: "Leavening agent",
    description: "Releases carbon dioxide to make baked goods rise.",
    healthEffects: "Considered safe in food use.",
    commonProducts: ["Crackers", "Cookies", "Flat breads"],
    alternatives: ["Baking powder", "Baking soda", "Yeast"],
  },
  {
    name: "Acetic acid",
    eNumber: "E260" as string | null,
    category: "Acidity regulator, preservative",
    description:
      "The main component of vinegar; acidifies and preserves foods.",
    healthEffects:
      "Safe at normal levels; may aggravate acid reflux in sensitive individuals.",
    commonProducts: ["Pickles", "Condiments", "Chips", "Bread"],
    alternatives: ["Citric acid", "Lemon juice", "Fermentation"],
  },
  {
    name: "Sodium lauryl sulfate (SLS)",
    eNumber: "E487" as string | null,
    category: "Emulsifier",
    description: "Surfactant used in foods to improve texture and mixing.",
    healthEffects: "May irritate the digestive tract at high doses.",
    commonProducts: ["Marshmallows", "Dried egg whites", "Some sauces"],
    alternatives: ["Lecithin", "Polysorbate 80", "Natural emulsifiers"],
  },
  {
    name: "Caramel color",
    eNumber: "E150" as string | null,
    category: "Colorant",
    description:
      "Brown coloring made by heating sugar; widely used in beverages.",
    healthEffects:
      "Class IV caramel contains 4-MEI, which is a potential carcinogen at high doses.",
    commonProducts: ["Cola drinks", "Beer", "Sauces", "Baked goods"],
    alternatives: ["Coffee extract", "Cocoa powder", "Natural brown coloring"],
  },
  // Flavoring Agents
  {
    name: "Vanillin",
    eNumber: "E160" as string | null,
    category: "Flavoring agent",
    description:
      "Synthetic vanilla flavor compound used as a substitute for natural vanilla extract.",
    healthEffects:
      "Generally recognized as safe; may cause allergic reactions in rare cases.",
    commonProducts: ["Baked goods", "Chocolates", "Ice cream", "Beverages"],
    alternatives: ["Natural vanilla extract", "Vanilla bean paste"],
  },
  {
    name: "Ethyl maltol",
    eNumber: "E637" as string | null,
    category: "Flavoring agent",
    description:
      "Flavor enhancer with a sweet, caramel-like taste, intensifies sweetness in foods.",
    healthEffects:
      "Considered safe at normal levels; minimal adverse effects reported.",
    commonProducts: ["Candies", "Baked goods", "Beverages", "Ice cream"],
    alternatives: ["Natural caramel", "Malt extract"],
  },
  {
    name: "Diacetyl",
    eNumber: null as string | null,
    category: "Flavoring agent",
    description:
      "Buttery flavoring compound used to mimic the taste of butter in various foods.",
    healthEffects:
      "Inhalation (occupational exposure) linked to serious lung disease; safe in food at approved levels.",
    commonProducts: [
      "Microwave popcorn",
      "Margarine",
      "Snack foods",
      "Baked goods",
    ],
    alternatives: [
      "Real butter",
      "Natural butter extract",
      "Plant-based butter",
    ],
  },
  {
    name: "Benzaldehyde",
    eNumber: null as string | null,
    category: "Flavoring agent",
    description:
      "Almond-cherry flavoring agent used in confectionery and beverages.",
    healthEffects:
      "Generally recognized as safe in small amounts used for flavoring.",
    commonProducts: [
      "Almond-flavored products",
      "Cherries in brine",
      "Liqueurs",
    ],
    alternatives: [
      "Almond extract",
      "Cherry extract",
      "Natural bitter almond oil",
    ],
  },
  {
    name: "Isoamyl acetate",
    eNumber: null as string | null,
    category: "Flavoring agent",
    description:
      "Banana-like fruity aroma compound widely used in artificial banana flavoring.",
    healthEffects: "Considered safe at food-grade concentrations.",
    commonProducts: ["Banana-flavored candies", "Beverages", "Baked goods"],
    alternatives: ["Natural banana extract", "Fruit concentrates"],
  },
  {
    name: "Maltol",
    eNumber: "E636" as string | null,
    category: "Flavoring agent",
    description:
      "Naturally occurring flavor enhancer that imparts a sweet, caramel-like aroma.",
    healthEffects:
      "Generally recognized as safe; found naturally in roasted malt and pine needles.",
    commonProducts: ["Bread", "Coffee", "Chocolate", "Cereals"],
    alternatives: ["Natural malt extract", "Caramelized sugar"],
  },
  {
    name: "Cinnamaldehyde",
    eNumber: null as string | null,
    category: "Flavoring agent",
    description:
      "Main chemical compound responsible for cinnamon flavor and aroma.",
    healthEffects:
      "Generally safe in small amounts; may cause contact allergy or irritation in sensitive individuals.",
    commonProducts: [
      "Cinnamon-flavored products",
      "Candies",
      "Chewing gum",
      "Beverages",
    ],
    alternatives: ["Natural cinnamon extract", "Cassia extract"],
  },
  // Bulking Agents
  {
    name: "Microcrystalline cellulose",
    eNumber: "E460" as string | null,
    category: "Bulking agent",
    description:
      "Purified form of plant fiber used to add bulk and improve texture without adding calories.",
    healthEffects:
      "Generally recognized as safe; provides dietary fiber with no known adverse effects.",
    commonProducts: [
      "Diet foods",
      "Tablets",
      "Low-calorie baked goods",
      "Dairy products",
    ],
    alternatives: ["Oat fiber", "Wheat bran", "Psyllium husk"],
  },
  {
    name: "Polydextrose",
    eNumber: "E1200" as string | null,
    category: "Bulking agent",
    description:
      "Synthetic polymer of glucose used to replace sugar and fat while providing bulk.",
    healthEffects:
      "May cause digestive discomfort (bloating, gas) in large amounts.",
    commonProducts: [
      "Low-calorie foods",
      "Diet desserts",
      "Sugar-free confectionery",
    ],
    alternatives: ["Inulin", "Resistant starch", "Soluble corn fiber"],
  },
  {
    name: "Inulin",
    eNumber: "E415" as string | null,
    category: "Bulking agent",
    description:
      "Natural prebiotic fiber from chicory root, adds bulk and feeds beneficial gut bacteria.",
    healthEffects:
      "Generally safe and beneficial; may cause gas or bloating in sensitive individuals.",
    commonProducts: [
      "Yogurt",
      "Fiber-enriched cereals",
      "Protein bars",
      "Diet drinks",
    ],
    alternatives: ["Pectin", "Beta-glucan", "Resistant starch"],
  },
  {
    name: "Sorbitol",
    eNumber: "E420" as string | null,
    category: "Bulking agent, sweetener",
    description:
      "Sugar alcohol used as a low-calorie sweetener and bulking agent in sugar-free products.",
    healthEffects:
      "May cause laxative effects and digestive discomfort in large amounts.",
    commonProducts: [
      "Sugar-free sweets",
      "Chewing gum",
      "Diet foods",
      "Oral care products",
    ],
    alternatives: ["Erythritol", "Xylitol", "Maltitol"],
  },
  {
    name: "Maltodextrin",
    eNumber: "E1400" as string | null,
    category: "Bulking agent, thickener",
    description:
      "Starch-derived carbohydrate used to add bulk, improve texture, and extend shelf life.",
    healthEffects: "High glycemic index; may raise blood sugar levels rapidly.",
    commonProducts: [
      "Instant foods",
      "Sports drinks",
      "Processed snacks",
      "Sauces",
    ],
    alternatives: ["Arrowroot starch", "Tapioca starch", "Whole grain flours"],
  },
  {
    name: "Mannitol",
    eNumber: "E421" as string | null,
    category: "Bulking agent, sweetener",
    description:
      "Sugar alcohol with low caloric value used as a bulking agent and anti-caking additive.",
    healthEffects:
      "May cause laxative effects in large quantities; generally well tolerated.",
    commonProducts: [
      "Sugar-free candies",
      "Chewing gum",
      "Pharmaceuticals",
      "Powdered foods",
    ],
    alternatives: ["Erythritol", "Sorbitol", "Isomalt"],
  },
  {
    name: "Calcium carbonate",
    eNumber: "E170" as string | null,
    category: "Bulking agent, acidity regulator",
    description:
      "Mineral used as a bulking agent, calcium supplement, and acidity regulator in foods.",
    healthEffects:
      "Generally safe and beneficial as a calcium source; excessive intake may cause constipation.",
    commonProducts: [
      "Bread",
      "Cereals",
      "Antacids",
      "Some cheeses",
      "Chewing gum",
    ],
    alternatives: ["Calcium lactate", "Calcium citrate", "Natural chalk"],
  },
];
