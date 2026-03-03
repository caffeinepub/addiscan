import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
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
  var nextId = 1;
  var seeded = false;

  // Public query functions
  public func parseIngredients(text : Text) : async [Additive] {
    let lowerSearchText = text.toLower();
    let filteredAdditives = additives.values().filter(
      func(additive) {
        matchesIngredient(lowerSearchText, additive);
      }
    );
    filteredAdditives.toArray();
  };

  func matchesIngredient(lowerSearchText : Text, additive : Additive) : Bool {
    let additiveName = additive.name.toLower();
    if (
      lowerSearchText.contains(#text additiveName) or
      additiveName.contains(#text lowerSearchText)
    ) {
      return true;
    };

    switch (additive.eNumber) {
      case (?eNum) {
        let lowerENum = eNum.toLower();
        lowerSearchText.contains(#text lowerENum);
      };
      case (null) { false };
    };
  };

  public func getAllAdditives() : async [Additive] {
    additives.values().toArray();
  };

  public func searchAdditivesByName(searchTerm : Text) : async [Additive] {
    let lowerSearchTerm = searchTerm.toLower();
    let filteredAdditives = additives.values().filter(
      func(additive) {
        let additiveName = additive.name.toLower();
        additiveName.contains(#text lowerSearchTerm) or
        lowerSearchTerm.contains(#text additiveName)
      }
    );
    filteredAdditives.toArray();
  };

  public func filterAdditivesByCategory(category : Text) : async [Additive] {
    let lowerCategory = category.toLower();
    let filteredAdditives = additives.values().filter(
      func(additive) {
        additive.category.toLower().contains(#text lowerCategory)
      }
    );
    filteredAdditives.toArray();
  };

  public func getAdditiveByENumber(eNumber : Text) : async Additive {
    let additivesIterator = additives.values();
    switch (additivesIterator.find(func(additive) { hasENumber(additive, eNumber) })) {
      case (?additive) { additive };
      case (null) { Runtime.trap("Additive not found") };
    };
  };

  func hasENumber(additive : Additive, eNumber : Text) : Bool {
    switch (additive.eNumber) {
      case (?en) { Text.equal(en, eNumber) };
      case (null) { false };
    };
  };

  public func getAdditiveById(id : Nat) : async Additive {
    switch (additives.get(id)) {
      case (?additive) { additive };
      case (null) { Runtime.trap("Additive not found") };
    };
  };

  // Public update functions
  public func addAdditive(
    name : Text,
    eNumber : ?Text,
    category : Text,
    description : Text,
    healthEffects : Text,
    commonProducts : [Text],
    alternatives : [Text]
  ) : async Nat {
    let id = nextId;
    additives.add(
      id,
      {
        id;
        name;
        eNumber;
        category;
        description;
        healthEffects;
        commonProducts;
        alternatives;
      },
    );
    nextId += 1;
    id;
  };

  public func updateAdditive(
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
        additives.add(
          id,
          {
            id;
            name;
            eNumber;
            category;
            description;
            healthEffects;
            commonProducts;
            alternatives;
          },
        );
        true;
      };
      case (null) { false };
    };
  };

  public func deleteAdditive(id : Nat) : async Bool {
    if (additives.containsKey(id)) {
      additives.remove(id);
      true;
    } else {
      false;
    };
  };
};

