/** 
 * Represents a trigger for an effect. 
 * 
 * Triggers fall into two categories: 
 *  - Instant - Effect is applied once an action occurs (opening a chest, hitting an opponent, defeating an opponent)
 *  - Conditional - Effect is applied once conditions are met (HP below 50%, protected by a shield)
 */
class Trigger {
    static Type = {
        Instant: {
            OnDealDMG : "OnDealDMG",
            OnElemDMG : "OnElemDMG",
            OnAttackAffected : "OnAttackAffected",
            OnHitNA : "OnHitNA",
            OnHitCA : "OnHitCA",
            OnCastSkill : "OnCastSkill",
            OnHitSkill : "OnHitSkill",
            OnCastBurst : "OnCastBurst",
            OnHitBurst : "OnHitBurst",
            OnTakeDMG : "OnTakeDMG",
            OnTakeElemDMG : "OnTakeElemDMG",
            OnEnemyDefeat : "OnEnemyDefeat",
            OnCRIT : "OnCRIT",
            OnCausedReaction : "OnCausedReaction",
            OnHeal : "OnHeal",
            OnPickUpMora : "OnPickUpMora",
            OnOpenChest : "OnOpenChest",
            OnObtainGeoShard : "OnObtainGeoShard",
            OnAlternateSprint : "OnAlternateSprint",
            OnTakeField : "OnTakeField",
            OnLeaveField : "OnLeaveField",
            OnPickUpEnergy : "OnPickUpEnergy"
        },
        Conditional: {
            HPThreshold : "HPThreshold",
            TimeOnField : "TimeOnField",
            TimeOffField : "TimeOffField",
            ProtectedbyShield : "ProtectedbyShield",
            TeamElement : "TeamElement",
            TeamCountry : "TeamCountry",
            UseWeapon : "UseWeapon",
            NearbyEnemies : "NearbyEnemies"
        }
    }

    /**
     * Constructor for Triggers. 
     * - Type.Instant Triggers have one option
     * - Type.Conditional Triggers have two options. 
     * @param {Type} type 
     * @param {Integer} value 
     * @param {Integer} valid_chars
     */
    constructor(type, value, valid_chars){
        if(Trigger.Type.Passive[type] !== undefined) {
            this.type = "passive";
        } else if(Trigger.Type.Conditional[type] !== undefined) {
            this.type = "conditional";
        } else {
            this.type = "instant";
        }
        this.action = type;
        this.value = value;
        this.valid_chars = valid_chars;
    }
}

export default Trigger;