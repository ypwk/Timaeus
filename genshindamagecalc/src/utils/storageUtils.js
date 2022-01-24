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
 *   weapon (id)
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
        this.envData = [[-1, -1, -1, -1], []];
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
        //check if this is the first time starting up.
        localForage.getItem('firsttimeflag')
            .then((value) => {
                if(value === null){
                    this.init();
                }
            }).catch((error) => {

            })
        
        
    }
    
    /**
     * Initializes items on first startup
     */
    init(){
        console.log("First time, initializing storage components.")
        localForage.setItem('firsttimeflag', true);
        localForage.setItem('character', this.characterData);
        localForage.setItem('artifact', this.artifactData);
        localForage.setItem('weapon', this.weaponData);
        localForage.setItem('environment', this.envData);
    }

    /**
     * fetches data from system
     * 
     * @param {*} callback is for a loading spinner
     */
    async fetchData(){
        try{
            let data = await localForage.getItem('character');
            this.characterData = data;
            data = await localForage.getItem('artifact');
            this.artifactData = data;
            data = await localForage.getItem('weapon');
            this.weaponData = data;
            data = await localForage.getItem('environment');
            this.envData = data;
        } catch (err){
            throw err;
        }
    }

    /**
     * saves data to system and closes editing
     * 
     * @param {*} callback is for a loading spinner
     */
    saveAndClose(callback){
        if(this.checkedOut === false){ 
            console.log('storageUtils: trying to save data that has not been fetched.');
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
        
        //save environment data
        localForage.setItem('weapon', this.weaponData)
            .then((value) => {
                this.envData = [];
            }).catch((error) => {
                throw error;
            });
        this.checkedOut = false;
        callback();
    }

    /**
     * Saves data to system
     * @param {} nameOfData refers to the name of the data type to store (character, weapon, artifact)
     */
    saveData(nameOfData){
        if(nameOfData === "character"){
            localForage.setItem('character', this.characterData)
            .catch((error) => {
                throw error;
            });
        } else if(nameOfData === "weapon"){
            localForage.setItem('weapon', this.weaponData)
            .catch((error) => {
                throw error;
            });
        } else if(nameOfData === "artifact"){
            localForage.setItem('artifact', this.artifactData)
            .catch((error) => {
                throw error;
            });
        } else if(nameOfData === "environment"){
            localForage.setItem('environment', this.envData)
            .catch((error) => {
                throw error;
            });
        } else {
            console.log("storageUtils: Requested data type is not supported. (options are character, weapon, and artifact)");
        }
    }
}

export default storageUtils;