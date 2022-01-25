import { data_names } from "../data/character/character_name_index";
import { constant_values } from '../data/constant_values'
import { weaponsData } from "../data/weapons";

class calcUtils {
    /**
     * Calculates a character's max HP from their base hp, percent hp, and flat hp, 
     * according to this formula: Max HP = Base HP * (1 + HP Bonus %) + HP Flat Bonus
     * @param {Number} base 
     * @param {Number} percent 
     * @param {Number} flat 
     */
    static hp(base, percent, flat){
        return base * ( 1 + percent / 100 ) + flat;
    }

    /**
     * Calculates a character's ATK from their base atk, weapon's base atk, percent atk, and flat atk, 
     * according to this formula: Max ATK = ( Character Base ATK + Weapon Base ATK ) * (1 + ATK Bonus %) + ATK Flat Bonus
     * @param {*} character 
     * @param {*} weapon 
     * @param {*} percent 
     * @param {*} flat 
     */
    static atk(base, percent, flat){
        return ( base ) * ( 1 + percent / 100 ) + flat;
    }

    /**
     * Calculates a character's DEF from their base DEF, percent DEF, and flat aDEFtk, 
     * according to this formula: Max DEF = ( Character Base DEF + Weapon Base DEF ) * (1 + DEF Bonus %) + DEF Flat Bonus
     * @param {*} character 
     * @param {*} percent 
     * @param {*} flat 
     */
    static def(character, percent, flat){
        return character * ( 1 + percent / 100 ) + flat;
    }

    /**
     * Calculates all of a character's stats, given the character variable and the entire artifact array. 
     * Output is formatted in same order as in constant_values.statConv, except base hp, base atk, and base def, 
     * which are appended to the end of the array. 
     * 
     * @param {*} char_file is the character variable 
     * @param {*} artifacts_file is the entire artifact array
     */
    static calcAll(char_file, artifacts_file){
        //Max HP = Base HP * (1 + HP Bonus %) + HP Flat Bonus
        let stats = Array.from({length: Object.keys(constant_values.statConv).length + 3}, e => 0) 
        let sr = (p, c) => p + c;

        //characters have 50 base crit dmg and 5 base crit rate and 100 ER
        if(Object.keys(data_names[char_file.name])[7] !== "er"){
            stats[6] = 100;
        }
        if(Object.keys(data_names[char_file.name])[7] !== "critDamage"){
            stats[9] = 50;
        }
        if(Object.keys(data_names[char_file.name])[7] !== "critRate"){
            stats[8] = 5;
        }

        console.log(char_file)
        //sum artifact values
        let artifacts = char_file.artifacts.filter(e => e !== -1).map(e => artifacts_file[e]);
        artifacts.forEach(e => {
            stats[constant_values.possibleMainStats[e.type][e.main_stat]] += constant_values.mainStatScaling[e.rarity - 1][constant_values.possibleMainStats[e.type][e.main_stat]][e.level];
            e.substats.forEach(e => {
                stats[e[0]] += e[1].reduce(sr);
            });
        });

        //sum weapon values
        if(Object.keys(char_file.weapon).length > 0){
            let weapon = weaponsData[char_file.weapon.name];
            if(Object.keys(weapon.secondary).length > 0){
                let p_mod = constant_values.notPercentageStats.includes(constant_values.statConv[weapon.secondary.name]) ? 1 : 100
                stats[constant_values.statConv[weapon.secondary.name]] += weapon.secondary.stats[char_file.weapon.level + char_file.weapon.ascension] * p_mod;
            }
            //base atk
            stats[Object.keys(constant_values.statConv).length + 1] += weapon.atk[char_file.weapon.level + char_file.weapon.ascension];
        }

        //sum character base stats
        stats[Object.keys(constant_values.statConv).length] += data_names[char_file.name].hp[char_file.level + char_file.ascension];
        stats[Object.keys(constant_values.statConv).length + 1] += data_names[char_file.name].atk[char_file.level + char_file.ascension];
        stats[Object.keys(constant_values.statConv).length + 2] += data_names[char_file.name].def[char_file.level + char_file.ascension];
        let p_mod = constant_values.notPercentageStats.includes(constant_values.statConv[Object.keys(data_names[char_file.name])[7]]) ? 1 : 100 
        stats[constant_values.statConv[Object.keys(data_names[char_file.name])[7]]] += p_mod * data_names[char_file.name][Object.keys(data_names[char_file.name])[7]][char_file.level + char_file.ascension];
        return stats;
    }

    /**
     * Rounding Utility
     */
    static round(value, sigfig){
        return Number(Math.round( value + 'e' + sigfig ) + 'e-' + sigfig )
    }
}

export default calcUtils;