import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import List "mo:core/List";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

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

  // Prepopulate with common additives
  func initialize() {
    let additiveList = List.empty<Additive>();

    additiveList.add({
      id = getNextId();
      name = "Sodium benzoate";
      eNumber = ?"E211";
      category = "Preservative";
      description = "Prevents growth of harmful bacteria and fungi in acidic foods.";
      healthEffects = "May cause allergic reactions in sensitive individuals.";
      commonProducts = ["Soft drinks", "Fruit juices", "Pickles"];
      alternatives = [
        "Natural preservatives",
        "rosemary extract",
        "Fermentation",
        "Citric acid",
      ];
    });

    additiveList.add({
      id = getNextId();
      name = "Aspartame";
      eNumber = ?"E951";
      category = "Sweetener";
      description = "Intense artificial sweetener used in low-calorie foods.";
      healthEffects = "Contradictory research on safety; safe for most except those with phenylketonuria.";
      commonProducts = ["Diet sodas", "Sugar-free gum", "Low-calorie desserts"];
      alternatives = ["Stevia", "Monk fruit extract", "Erythritol"];
    });

    additiveList.add({
      id = getNextId();
      name = "Carrageenan";
      eNumber = ?"E407";
      category = "Stabilizer, thickener";
      description = "Derived from red seaweed, used to thicken and stabilize foods.";
      healthEffects = "May cause digestive issues in some individuals.";
      commonProducts = ["Dairy products", "Plant-based milks", "Processed meats"];
      alternatives = ["Agar-agar", "Guar gum", "Xanthan gum"];
    });

    additiveList.add({
      id = getNextId();
      name = "Tartrazine";
      eNumber = ?"E102";
      category = "Colorant";
      description = "Synthetic lemon yellow azo dye used in food coloring.";
      healthEffects = "May cause hyperactivity in children and allergic reactions.";
      commonProducts = ["Candies", "Baked goods", "Soft drinks"];
      alternatives = ["Turmeric extract", "Beta-carotene", "Annatto"];
    });

    additiveList.add({
      id = getNextId();
      name = "Sodium nitrate";
      eNumber = ?"E251";
      category = "Preservative";
      description = "Prevents growth of bacteria and retains color in processed meats.";
      healthEffects = "Potentially carcinogenic when combined with proteins at high temperatures.";
      commonProducts = ["Cured meats", "Hot dogs", "Bacon"];
      alternatives = ["Natural curing", "celery juice powder", "Sea salt"];
    });

    additiveList.add({
      id = getNextId();
      name = "Monosodium glutamate (MSG)";
      eNumber = ?"E621";
      category = "Flavor enhancer";
      description = "Enhances savory taste in foods.";
      healthEffects = "Controversially linked to headaches and allergic reactions.";
      commonProducts = ["Snack foods", "Seasonings", "Prepared soups"];
      alternatives = ["Mushroom powder", "Tomato paste", "Nutritional yeast"];
    });

    additiveList.add({
      id = getNextId();
      name = "Polysorbate 80";
      eNumber = ?"E433";
      category = "Emulsifier, stabilizer";
      description = "Prevents separation of oil and water in foods.";
      healthEffects = "Generally recognized as safe but may cause digestive issues in high amounts.";
      commonProducts = ["Ice cream", "Salad dressings", "Baked goods"];
      alternatives = ["Lecithin", "soy or sunflower", "Mustard", "Honey"];
    });

    additiveList.add({
      id = getNextId();
      name = "Sulfites";
      eNumber = ?"E220-E228";
      category = "Preservative";
      description = "Prevents browning and spoilage in foods and beverages.";
      healthEffects = "Can cause allergic reactions, especially in asthmatics.";
      commonProducts = ["Wine", "Dried fruits", "Pickled vegetables"];
      alternatives = ["Vitamin C", "ascorbic acid", "Proper refrigeration"];
    });

    additiveList.add({
      id = getNextId();
      name = "Xanthan gum";
      eNumber = ?"E415";
      category = "Thickener, stabilizer";
      description = "Adds viscosity and stability to food products.";
      healthEffects = "Generally recognized as safe but may cause digestive issues in high amounts.";
      commonProducts = ["Gluten-free products", "Salad dressings", "Baked goods"];
      alternatives = ["Guar gum", "Psyllium husk", "Chia seeds"];
    });

    additiveList.add({
      id = getNextId();
      name = "Butylated hydroxytoluene (BHT)";
      eNumber = ?"E321";
      category = "Antioxidant, preservative";
      description = "Prevents oxidation and spoilage of fats in foods.";
      healthEffects = "Potentially carcinogenic at high levels, but considered safe in low amounts.";
      commonProducts = ["Breakfast cereals", "Snacks", "Chewing gums"];
      alternatives = ["Vitamin E", "tocopherols", "Rosemary extract"];
    });

    let initialAdditives = additiveList.toArray();
    for (additive in initialAdditives.values()) {
      additives.add(additive.id, additive);
    };
  };

  // Function to parse raw ingredient lists and extract recognized additives
  public query ({ caller }) func parseIngredients(ingredientsText : Text) : async [Additive] {
    let lowerIngredientsText = ingredientsText.toLower();
    let matched = List.empty<Additive>();
    for (additive in additives.values()) {
      let lowerAdditiveName = additive.name.toLower();
      if (lowerIngredientsText.contains(#text (lowerAdditiveName)) or lowerAdditiveName.contains(#text (lowerIngredientsText))) {
        matched.add(additive);
      } else if (switch (additive.eNumber) {
        case (?eNum) {
          let lowerENumber = eNum.toLower();
          lowerIngredientsText.contains(#text (lowerENumber));
        };
        case (null) { false };
      }) {
        matched.add(additive);
      };
    };
    matched.toArray();
  };

  // Get all additives
  public query ({ caller }) func getAllAdditives() : async [Additive] {
    additives.values().toArray();
  };

  // Search additives by name
  public query ({ caller }) func searchAdditivesByName(searchTerm : Text) : async [Additive] {
    additives.values().toArray().filter(
      func(additive) {
        additive.name.toLower().contains(#text (searchTerm.toLower()));
      }
    );
  };

  // Filter additives by category
  public query ({ caller }) func filterAdditivesByCategory(category : Text) : async [Additive] {
    additives.values().toArray().filter(
      func(additive) {
        additive.category.toLower().contains(#text (category.toLower()));
      }
    );
  };

  // Get additive by E-number
  public query ({ caller }) func getAdditiveByENumber(eNumber : Text) : async Additive {
    switch (additives.values().find(
      func(additive) {
        switch (additive.eNumber) {
          case (?en) { Text.equal(en, eNumber) };
          case (null) { false };
        };
      }
    )) {
      case (?additive) { additive };
      case (null) { Runtime.trap("Additive not found") };
    };
  };

  // Get additive by id
  public query ({ caller }) func getAdditiveById(id : Nat) : async Additive {
    switch (additives.get(id)) {
      case (?additive) { additive };
      case (null) { Runtime.trap("Additive not found") };
    };
  };

  // Add new additive
  public shared ({ caller }) func addAdditive(
    name : Text,
    eNumber : ?Text,
    category : Text,
    description : Text,
    healthEffects : Text,
    commonProducts : [Text],
    alternatives : [Text]
  ) : async Nat {
    let newId = getNextId();
    let additive : Additive = {
      id = newId;
      name;
      eNumber;
      category;
      description;
      healthEffects;
      commonProducts;
      alternatives;
    };
    additives.add(newId, additive);
    newId;
  };

  // Update existing additive
  public shared ({ caller }) func updateAdditive(
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
        let updatedAdditive : Additive = {
          id;
          name;
          eNumber;
          category;
          description;
          healthEffects;
          commonProducts;
          alternatives;
        };
        additives.add(id, updatedAdditive);
        true;
      };
      case (null) { false };
    };
  };

  // Delete additive
  public shared ({ caller }) func deleteAdditive(id : Nat) : async Bool {
    if (additives.containsKey(id)) {
      additives.remove(id);
      true;
    } else {
      false;
    };
  };

  // Initialize with predefined additives
  initialize();
};
