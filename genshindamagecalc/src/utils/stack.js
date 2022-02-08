/**
 * A class used to emulate stacks in-game. Such a stack could come from an artifact set effect, 
 * from a weapon effect, or from a character's passive or constellations. 
 */
 class Stack{
    static AffectedChars = {
        Self: "Self",
        Team: "Team",
        SameElement: "SameElement"
    }
    /**
     * @param {list} triggers - A list of triggers
     * @param {list} durations - A list of stack durations
     * @param {Array} affectedChars - An AffectedChars value 
     * @param {list of list} values - a list of list of values denoting the buff conferred at the specific stack number.
     */
    constructor(triggers, durations, affectedChars, values){
        this.triggers = triggers;
        this.durations = durations;
        this.affectedChars = affectedChars;
        this.values = values;
    }
}

export default Stack;