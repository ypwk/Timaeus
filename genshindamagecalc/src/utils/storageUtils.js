import localForage from 'localforage';
/**
 * Manages storage utilities using localforage.
 * Github:
 * https://github.com/localForage/localForage
 * 
 * Maintains a representation of the current character data.
 * 
 * Character:
 * list of characters
 *  character attributes:
 *   name
 *   level
 *   ascension
 *   constellation
 *   talents (list)
 *   artifacts (list by id)
 *   id
 * 
 * Artifact:
 *  list of artifacts
 *   artifact attributes:
 *    set
 *    level
 *    rarity
 *    main stat
 *    substats
 *     list of substats, each substat is a list of rolls (0 - 3)
 *    id
 *  
 * Weapon:
 *  list of weapons
 *   weapon attributes:
 *    name
 *    main stat
 *    main stat scaling
 *    level
 *    ascension
 *    refine
 *    id
 */

class storageUtils {
    constructor(){
        //state
        this.characterData = [];
        this.artifactData = [];
        this.weaponData = [];
        this.checkedOut = false;
        //initialize localForage
        localForage.config({ //configure localForage
            driver      : localForage.WEBSQL, // Force WebSQL; same as using setDriver()
            name        : 'TimaeusGenshinDamageCalculator',
            version     : 1.0,
            size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
            description : 'Storage for Timaeus'
        });
    }
    
    /**
     * fetches data from system
     * 
     * @param {*} callback is for a loading spinner
     */
    fetchData(callback){
        //get character data
        localForage.getItem('character')
            .then((value) => {
                this.characterData = value;
            }).catch((error) => {
                throw error;
            });

        //get artifact data
        localForage.getItem('artifact')
            .then((value) => {
                this.artifactData = value;
            }).catch((error) => {
                throw error;
            });
        
        //get weapon data
        localForage.getItem('weapon')
            .then((value) => {
                this.weaponData = value;
            }).catch((error) => {
                throw error;
            });
        this.checkedOut = true;
        callback();
    }

    /**
     * saves data to system
     * 
     * @param {*} callback is for a loading spinner
     */
    saveData(callback){
        if(this.checkedOut === false){ 
            throw 'storageUtils: trying to save data that has not been fetched.';
        }

        //save character data
        localForage.setItem('character', this.characterData)
            .then((value) => {
                this.characterData = [];
            }).catch((error) => {
                throw error;
            });
        
        //save artifact data
        localForage.setItem('artifact', this.artifactData)
            .then((value) => {
                this.artifactData = [];
            }).catch((error) => {
                throw error;
            });
        
        //save weapon data
        localForage.setItem('weapon', this.weaponData)
            .then((value) => {
                this.weaponData = [];
            }).catch((error) => {
                throw error;
            });
        
        this.checkedOut = false;
        callback();
    }
}

export default storageUtils;