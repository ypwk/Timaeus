import Element from "./element";

class Reaction {
    /**
     * Abstraction of amping/transformative/aura reactions. Examples:
     *  - Amping: Melt
     *  - Transformative: Superconduct
     *  - Aura: Electrocharged
     *  - GeneralTrans: Swirl
     */
    static Type = {
        Amping: "amping",
        Transformative: "transformative",
        Aura: "aura",
        GeneralTrans: "generalTransformative"
    }

    //application order --> (aura, trigger)

    //amping
    static Melt = new Reaction("melt", Reaction.Type.Amping, [Element.Cryo, Element.Pyro]);
    static RMelt = new Reaction("reverseMelt", Reaction.Type.Amping, [Element.Pyro, Element.Cryo]);
    static Vaporize = new Reaction("vaporize", Reaction.Type.Amping, [Element.Pyro, Element.Hydro]);
    static RVaporize = new Reaction("reverseVaporize", Reaction.Type.Amping, [Element.Hydro, Element.Pyro]);

    //transformative
    static Overload = new Reaction("overload", Reaction.Type.Transformative, [Element.Pyro, Element.Electro]);
    static Superconduct = new Reaction("superconduct", Reaction.Type.Transformative, [Element.Cryo, Element.Electro]);
    
    //aura
    static Electrocharged = new Reaction("electrocharged", Reaction.Type.Aura, [Element.Hydro, Element.Electro]);
    static Frozen = new Reaction("frozen", Reaction.Type.Aura, [Element.Hydro, Element.Cryo]);
    static Burning = new Reaction("burning", Reaction.Type.Aura, [Element.Pyro, Element.Dendro]);

    //general transformative
    static RSwirl = {
        Pyro: new Reaction("swirl", Reaction.Type.GeneralTrans, [Element.Anemo, Element.Pyro]),
        Hydro: new Reaction("swirl", Reaction.Type.GeneralTrans, [Element.Anemo, Element.Hydro]),
        Dendro: new Reaction("swirl", Reaction.Type.GeneralTrans, [Element.Anemo, Element.Dendro]),
        Electro: new Reaction("swirl", Reaction.Type.GeneralTrans, [Element.Anemo, Element.Electro]),
        Cryo: new Reaction("swirl", Reaction.Type.GeneralTrans, [Element.Anemo, Element.Cryo])
    };
    static Swirl = {
        Pyro: new Reaction("swirl", Reaction.Type.GeneralTrans, [Element.Pyro, Element.Anemo]),
        Hydro: new Reaction("swirl", Reaction.Type.GeneralTrans, [Element.Hydro, Element.Anemo]),
        Dendro: new Reaction("swirl", Reaction.Type.GeneralTrans, [Element.Dendro, Element.Anemo]),
        Electro: new Reaction("swirl", Reaction.Type.GeneralTrans, [Element.Electro, Element.Anemo]),
        Cryo: new Reaction("swirl", Reaction.Type.GeneralTrans, [Element.Cryo, Element.Anemo])
    };
    static RCrystallize  = {
        Pyro: new Reaction("crystallize", Reaction.Type.GeneralTrans, [Element.Geo, Element.Pyro]),
        Hydro: new Reaction("crystallize", Reaction.Type.GeneralTrans, [Element.Geo, Element.Hydro]),
        Dendro: new Reaction("crystallize", Reaction.Type.GeneralTrans, [Element.Geo, Element.Dendro]),
        Electro: new Reaction("crystallize", Reaction.Type.GeneralTrans, [Element.Geo, Element.Electro]),
        Cryo: new Reaction("crystallize", Reaction.Type.GeneralTrans, [Element.Geo, Element.Cryo])
    };
    static Crystallize  = {
        Pyro: new Reaction("crystallize", Reaction.Type.GeneralTrans, [Element.Pyro, Element.Geo]),
        Hydro: new Reaction("crystallize", Reaction.Type.GeneralTrans, [Element.Hydro, Element.Geo]),
        Dendro: new Reaction("crystallize", Reaction.Type.GeneralTrans, [Element.Dendro, Element.Geo]),
        Electro: new Reaction("crystallize", Reaction.Type.GeneralTrans, [Element.Electro, Element.Geo]),
        Cryo: new Reaction("crystallize", Reaction.Type.GeneralTrans, [Element.Cryo, Element.Geo])
    };


    /**
     * Constructor for Reaction types.
     * @param {String} name  - Name of reaction
     * @param {Reaction.Type} type - Type of reaction (Amping, etc.)
     * @param {List[Element]} constituents - In order of Aura -> Catalyst
     */
    constructor(name, type, constituents) {
        this.name = name;
        this.type = type;
        this.constituents = constituents;
    }
}

export default Reaction;