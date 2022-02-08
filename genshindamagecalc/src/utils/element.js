
class Element {
    static Type = {
        Aura: "aura",
        Transient: "transient"
    }

    static Pyro = new Element("pyro", Element.Type.Aura);
    static Hydro = new Element("hydro", Element.Type.Aura);
    static Dendro = new Element("dendro", Element.Type.Aura);
    static Electro = new Element("electro", Element.Type.Aura);
    static Anemo = new Element("anemo", Element.Type.Transient);
    static Cryo = new Element("cryo", Element.Type.Aura);
    static Geo = new Element("geo", Element.Type.Transient);

    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

export default Element;