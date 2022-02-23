
/**
 * A class used to emulate buffs in-game. Such a buff could come from an artifact set effect, 
 * from a weapon effect, or from a character's passive or constellations. 
 */
class Buff{
    /**
     * Characters affected by this buff
     */
    static AffectedChars = {
        Self: "Self",
        Team: "Team",
        SameElement: "SameElement"
    }

    /**
     * Effects not covered by a conventional buff (e.g. healing)
     */
    static Effect = {
        HealPercent: "healPercent",
        HealFlat: "healFlat",
        Damage: "damage" //requires a stat and a percentage
    }

    /**
     * @param {Trigger} trigger is the trigger for this buff
     * @param {AffectedChars} affectedChar is a list containing the character(s) affected by this buff
     * @param {list} value is a list of duples describing the stats conferred by the buff
     * @param {*} duration is the duration of the buff, in frames. 
     */
    constructor(trigger, affectedChars, value, duration){
        this.trigger = trigger;
        if(trigger.type === "instant"){
            this.duration = duration;
        }
        this.affectedChars = affectedChars;
        this.value = value;
    }
}

export default Buff;