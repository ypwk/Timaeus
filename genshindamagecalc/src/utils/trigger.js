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
            OnDealDMG : "OnDealDMG", // On deal damage
            OnElemDMG : "OnElemDMG", // On deal elemental damage
            OnAttackAffected : "OnAttackAffected",
            OnHitA : "OnHitA", // On hit normal attack or charged attack
            OnHitNA : "OnHitNA", // On hit normal attack
            OnHitCA : "OnHitCA",// On hit charged attack
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
            NearbyEnemies : "NearbyEnemies",
            StackCount : "StackCount"
        }
    }

    /**
     * Constructor for Triggers. 
     * - Type.Instant Triggers have three options - the second option indicates the chance of the buff occuring. 
     * - Type.Conditional Triggers have three options. 
     * @param {Type} type 
     * @param {Integer} value 
     * @param {Integer} valid_chars
     * @param {Integer} cooldown
     */
    constructor(type, value, valid_chars, cooldown){
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
        this.cooldown = cooldown;
    }
}

export default Trigger;