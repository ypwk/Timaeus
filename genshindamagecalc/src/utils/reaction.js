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
    static Swirl = new Reaction("swirl", Reaction.Type.GeneralTrans, [Element.Anemo]);
    static Crystallize = new Reaction("crystallize", Reaction.Type.GeneralTrans, [Element.Geo]);


    /**
     * Constructor for Reaction types.
     * @param {String} name  - Name of reaction
     * @param {Reaction.Type} type - Type of reaction (Amping, etc.)
     * @param {List[Element]} constituents - In order of Aura -> Catalyst
     */
    constructor(name, type, constituents, value) {
        this.name = name
    }
}

export default Reaction;