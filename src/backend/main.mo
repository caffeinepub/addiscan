import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  type Additive = {
    id : Nat;
    name : Text;
    eNumber : ?Text;
    category : Text;
    description : Text;
    healthEffects : Text;
    commonProducts : [Text];
    alternatives : [Text];
  };

  let additives = Map.empty<Nat, Additive>();
  var currentId = 0;

  func getNextId() : Nat {
    let id = currentId;
    currentId += 1;
    id;
  };

  func initAdditive(
    name : Text,
    eNum : ?Text,
    cat : Text,
    desc : Text,
    health : Text,
    prods : [Text],
    alts : [Text]
  ) {
    let id = getNextId();
    additives.add(id, {
      id;
      name;
      eNumber = eNum;
      category = cat;
      description = desc;
      healthEffects = health;
      commonProducts = prods;
      alternatives = alts;
    });
  };

  initAdditive("Sodium benzoate", ?"E211", "Preservative",
    "Prevents growth of harmful bacteria and fungi in acidic foods.",
    "May cause allergic reactions in sensitive individuals.",
    ["Soft drinks", "Fruit juices", "Pickles"],
    ["Natural preservatives", "Rosemary extract", "Fermentation", "Citric acid"]);

  initAdditive("Aspartame", ?"E951", "Sweetener",
    "Intense artificial sweetener used in low-calorie foods.",
    "Contradictory research on safety; safe for most except those with phenylketonuria.",
    ["Diet sodas", "Sugar-free gum", "Low-calorie desserts"],
    ["Stevia", "Monk fruit extract", "Erythritol"]);

  initAdditive("Carrageenan", ?"E407", "Stabilizer, thickener",
    "Derived from red seaweed, used to thicken and stabilize foods.",
    "May cause digestive issues in some individuals.",
    ["Dairy products", "Plant-based milks", "Processed meats"],
    ["Agar-agar", "Guar gum", "Xanthan gum"]);

  initAdditive("Tartrazine", ?"E102", "Colorant",
    "Synthetic lemon yellow azo dye used in food coloring.",
    "May cause hyperactivity in children and allergic reactions.",
    ["Candies", "Baked goods", "Soft drinks"],
    ["Turmeric extract", "Beta-carotene", "Annatto"]);

  initAdditive("Sodium nitrate", ?"E251", "Preservative",
    "Prevents growth of bacteria and retains color in processed meats.",
    "Potentially carcinogenic when combined with proteins at high temperatures.",
    ["Cured meats", "Hot dogs", "Bacon"],
    ["Natural curing", "Celery juice powder", "Sea salt"]);

  initAdditive("Monosodium glutamate (MSG)", ?"E621", "Flavor enhancer",
    "Enhances savory taste in foods.",
    "Controversially linked to headaches and allergic reactions.",
    ["Snack foods", "Seasonings", "Prepared soups"],
    ["Mushroom powder", "Tomato paste", "Nutritional yeast"]);

  initAdditive("Polysorbate 80", ?"E433", "Emulsifier, stabilizer",
    "Prevents separation of oil and water in foods.",
    "Generally recognized as safe but may cause digestive issues in high amounts.",
    ["Ice cream", "Salad dressings", "Baked goods"],
    ["Lecithin", "Mustard", "Honey"]);

  initAdditive("Sulfites", ?"E220-E228", "Preservative",
    "Prevents browning and spoilage in foods and beverages.",
    "Can cause allergic reactions, especially in asthmatics.",
    ["Wine", "Dried fruits", "Pickled vegetables"],
    ["Vitamin C", "Ascorbic acid", "Proper refrigeration"]);

  initAdditive("Xanthan gum", ?"E415", "Thickener, stabilizer",
    "Adds viscosity and stability to food products.",
    "Generally recognized as safe but may cause digestive issues in high amounts.",
    ["Gluten-free products", "Salad dressings", "Baked goods"],
    ["Guar gum", "Psyllium husk", "Chia seeds"]);

  initAdditive("Butylated hydroxytoluene (BHT)", ?"E321", "Antioxidant, preservative",
    "Prevents oxidation and spoilage of fats in foods.",
    "Potentially carcinogenic at high levels, but considered safe in low amounts.",
    ["Breakfast cereals", "Snacks", "Chewing gums"],
    ["Vitamin E", "Tocopherols", "Rosemary extract"]);

  public query func parseIngredients(ingredientsText : Text) : async [Additive] {
    let lower = ingredientsText.toLower();
    additives.values().filter(func(a : Additive) : Bool {
      let lowerName = a.name.toLower();
      if (lower.contains(#text lowerName) or lowerName.contains(#text lower)) {
        return true;
      };
      switch (a.eNumber) {
        case (?eNum) {
          let lowerENum = eNum.toLower();
          lower.contains(#text lowerENum);
        };
        case null { false };
      };
    }).toArray();
  };

  public query func getAllAdditives() : async [Additive] {
    additives.values().toArray();
  };

  public query func searchAdditivesByName(searchTerm : Text) : async [Additive] {
    let lower = searchTerm.toLower();
    additives.values().filter(func(a : Additive) : Bool {
      let lowerName = a.name.toLower();
      lowerName.contains(#text lower) or lower.contains(#text lowerName);
    }).toArray();
  };

  public query func filterAdditivesByCategory(category : Text) : async [Additive] {
    let lower = category.toLower();
    additives.values().filter(func(a : Additive) : Bool {
      a.category.toLower().contains(#text lower);
    }).toArray();
  };

  public query func getAdditiveByENumber(eNumber : Text) : async Additive {
    switch (additives.values().find(func(a : Additive) : Bool {
      switch (a.eNumber) {
        case (?en) { Text.equal(en, eNumber) };
        case null { false };
      };
    })) {
      case (?a) { a };
      case null { Runtime.trap("Additive not found") };
    };
  };

  public query func getAdditiveById(id : Nat) : async Additive {
    switch (additives.get(id)) {
      case (?a) { a };
      case null { Runtime.trap("Additive not found") };
    };
  };

  public shared func addAdditive(
    name : Text,
    eNumber : ?Text,
    category : Text,
    description : Text,
    healthEffects : Text,
    commonProducts : [Text],
    alternatives : [Text]
  ) : async Nat {
    let id = getNextId();
    additives.add(id, {
      id; name; eNumber; category; description; healthEffects; commonProducts; alternatives;
    });
    id;
  };

  public shared func updateAdditive(
    id : Nat,
    name : Text,
    eNumber : ?Text,
    category : Text,
    description : Text,
    healthEffects : Text,
    commonProducts : [Text],
    alternatives : [Text]
  ) : async Bool {
    switch (additives.get(id)) {
      case (?_) {
        additives.add(id, {
          id; name; eNumber; category; description; healthEffects; commonProducts; alternatives;
        });
        true;
      };
      case null { false };
    };
  };

  public shared func deleteAdditive(id : Nat) : async Bool {
    if (additives.containsKey(id)) {
      additives.remove(id);
      true;
    } else {
      false;
    };
  };
};
