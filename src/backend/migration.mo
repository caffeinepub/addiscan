import Nat "mo:core/Nat";
import Map "mo:core/Map";

module {
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

  type OldActor = {
    additives : Map.Map<Nat, Additive>;
    nextId : Nat;
    seeded : Bool;
  };

  type NewActor = {
    additives : Map.Map<Nat, Additive>;
    nextId : Nat;
    seeded : Bool;
  };

  public func run(old : OldActor) : NewActor {
    {
      additives = old.additives;
      nextId = old.nextId;
      seeded = old.seeded;
    };
  };
};
