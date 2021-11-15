const os = require('os');
const storage = require('electron-json-storage');
/**
 * Manages storage utilities using electron-json-storage.
 * Github:
 * https://github.com/electron-userland/electron-json-storage
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
        storage.setDataPath(os.tmpdir());
    }
    
    /**
     * fetches data from system
     * 
     * @param {*} callback is for a loading spinner
     */
    fetchData(callback){
        //get character data
        storage.getMany(['character', 'artifact', 'weapon'], function(error, data){
            if (error) throw error;
            this.characterData = data.character;
            this.artifactData = data.artifact;
            this.weaponData = data.weapon;
        })
        this.checkedOut = true;
        callback();
    }

    /**
     * fetches data from system
     * 
     * @param {*} callback is for a loading spinner
     */
    saveData(callback){
        if(checkedOut === false){
            throw 'storageUtils: cannot save data that has not yet been fetched.';
        }
        storage.set('character', this.characterData, function(error){
            if (error) throw error;
            this.characterData = [];
        });
        storage.set('artifact', this.artifactData, function(error){
            if (error) throw error;
            this.artifactData = [];
        });
        storage.set('weapon', this.weaponData, function(error){
            if (error) throw error;
            this.weaponData = [];
        });
        this.checkedOut = false;
        callback();
    }
}

export default storageUtils;