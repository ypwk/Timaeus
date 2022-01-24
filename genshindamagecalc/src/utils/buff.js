/**
 * A class used to emulate buffs in-game. Such a buff could come from an artifact set effect, 
 * from a weapon effect, or from a character's passive or constellations. 
 */
class Buff{
    /**
     * @param {number} startInterval - The beginning of the buff's duration, measured in milliseconds.
     * @param {number} endInterval - The end of the buff's duration, measured in milliseconds. 
     * @param {Array} affectedChars - An array containing the IDs of the characters in the party that the buff affects.  
     * @param {Array} values - An array containing duples of values, the first being the number of the buff given, and the 
     * second being the numerical value of the buff given. 
     */
    constructor(startInterval, endInterval, affectedChars, values){

    }
}

export default Buff;