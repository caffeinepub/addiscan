import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

actor {
  type Additive = {
    id : Nat;
    name : Text;
    eNumber : ?Text;
    category : Text;
    description : Text;
    healthEffects : Text;
    commonProducts : [Text];
  };

  module Additive {
    public func equal(additive1 : Additive, additive2 : Additive) : Bool {
      switch (Text.equal(additive1.name, additive2.name)) {
        case (true) {
          switch (additive1.eNumber, additive2.eNumber) {
            case (?en1, ?en2) { Text.equal(en1, en2) };
            case (null, null) { true };
            case (_) { false };
          };
        };
        case (false) { false };
      };
    };
  };

  let additives = Map.empty<Nat, Additive>();

  // Prepopulate with common additives
  func initialize() {
    let additiveList = List.empty<Additive>();

    additiveList.add({
      id = 0;
      name = "Sodium benzoate";
      eNumber = ?"E211";
      category = "Preservative";
      description = "Prevents growth of harmful bacteria and fungi in acidic foods.";
      healthEffects = "May cause allergic reactions in sensitive individuals.";
      commonProducts = ["Soft drinks", "Fruit juices", "Pickles"];
    });

    additiveList.add({
      id = 1;
      name = "Aspartame";
      eNumber = ?"E951";
      category = "Sweetener";
      description = "Intense artificial sweetener used in low-calorie foods.";
      healthEffects = "Contradictory research on safety; safe for most except those with phenylketonuria.";
      commonProducts = ["Diet sodas", "Sugar-free gum", "Low-calorie desserts"];
    });

    additiveList.add({
      id = 2;
      name = "Carrageenan";
      eNumber = ?"E407";
      category = "Stabilizer, thickener";
      description = "Derived from red seaweed, used to thicken and stabilize foods.";
      healthEffects = "May cause digestive issues in some individuals.";
      commonProducts = ["Dairy products", "Plant-based milks", "Processed meats"];
    });

    additiveList.add({
      id = 3;
      name = "Tartrazine";
      eNumber = ?"E102";
      category = "Colorant";
      description = "Synthetic lemon yellow azo dye used in food coloring.";
      healthEffects = "May cause hyperactivity in children and allergic reactions.";
      commonProducts = ["Candies", "Baked goods", "Soft drinks"];
    });

    additiveList.add({
      id = 4;
      name = "Sodium nitrate";
      eNumber = ?"E251";
      category = "Preservative";
      description = "Prevents growth of bacteria and retains color in processed meats.";
      healthEffects = "Potentially carcinogenic when combined with proteins at high temperatures.";
      commonProducts = ["Cured meats", "Hot dogs", "Bacon"];
    });

    additiveList.add({
      id = 5;
      name = "Monosodium glutamate (MSG)";
      eNumber = ?"E621";
      category = "Flavor enhancer";
      description = "Enhances savory taste in foods.";
      healthEffects = "Controversially linked to headaches and allergic reactions.";
      commonProducts = ["Snack foods", "Seasonings", "Prepared soups"];
    });

    additiveList.add({
      id = 6;
      name = "Polysorbate 80";
      eNumber = ?"E433";
      category = "Emulsifier, stabilizer";
      description = "Prevents separation of oil and water in foods.";
      healthEffects = "Generally recognized as safe but may cause digestive issues in high amounts.";
      commonProducts = ["Ice cream", "Salad dressings", "Baked goods"];
    });

    additiveList.add({
      id = 7;
      name = "Sulfites";
      eNumber = ?"E220-E228";
      category = "Preservative";
      description = "Prevents browning and spoilage in foods and beverages.";
      healthEffects = "Can cause allergic reactions, especially in asthmatics.";
      commonProducts = ["Wine", "Dried fruits", "Pickled vegetables"];
    });

    additiveList.add({
      id = 8;
      name = "Xanthan gum";
      eNumber = ?"E415";
      category = "Thickener, stabilizer";
      description = "Adds viscosity and stability to food products.";
      healthEffects = "Generally recognized as safe but may cause digestive issues in high amounts.";
      commonProducts = ["Gluten-free products", "Salad dressings", "Baked goods"];
    });

    additiveList.add({
      id = 9;
      name = "Butylated hydroxytoluene (BHT)";
      eNumber = ?"E321";
      category = "Antioxidant, preservative";
      description = "Prevents oxidation and spoilage of fats in foods.";
      healthEffects = "Potentially carcinogenic at high levels, but considered safe in low amounts.";
      commonProducts = ["Breakfast cereals", "Snacks", "Chewing gums"];
    });

    let initialAdditives = additiveList.toArray();
    for (additive in initialAdditives.values()) {
      additives.add(additive.id, additive);
    };
  };

  // Initialize with predefined additives
  initialize();

  // Function to parse raw ingredient lists and extract recognized additives
  public query ({ caller }) func parseIngredients(ingredientsText : Text) : async [Additive] {
    let matched = List.empty<Additive>();
    for (additive in additives.values()) {
      if (ingredientsText.contains(#text (additive.name))) {
        matched.add(additive);
      } else if (switch (additive.eNumber) {
        case (?eNum) { ingredientsText.contains(#text (eNum)) };
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
};
