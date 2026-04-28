//==========================================================================
// Eli_CustomParameter.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderBefore EliMZ_ClassCurves
@orderAfter EliMZ_EnemyClass

@plugindesc ♦2.0.3♦ Adds new custom parameters to battlers!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-custom-parameters-for-rpg-maker/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

● Add new custom parameters to actors and enemies!
● Manipulate these parameters with note tags and script calls!
● Add buffs, debuffs, and grow effect to these parameters!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1nyYAcxRa9wUdZbtMOIGZkcS2ocjqVWTPySeTN1Jh7SU/edit?usp=sharing

============================================================================

@param list
@text New parameters
@type struct<stCustomParam>[]
@desc Set here all your custom parameters.
@default ["{\"shortName\":\"per\",\"name\":\"Perception\",\"isHp\":\"false\"}","{\"shortName\":\"crm\",\"name\":\"Charm\",\"isHp\":\"false\"}","{\"shortName\":\"wis\",\"name\":\"Wisdom\",\"isHp\":\"false\"}","{\"shortName\":\"rep\",\"name\":\"Reputation\",\"isHp\":\"true\"}"]

@param templates
@text Templates
@type struct<templateST>[]
@desc Set here all your custom parameters.
@default ["{\"name\":\"TemplateExample\",\"list\":\"[\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"5\\\\\\\"}\\\",\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"rep\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"10\\\\\\\"}\\\",\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"7\\\\\\\"}\\\",\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"3\\\\\\\"}\\\"]\"}"]

@param buffIcon
@text Buff Icon
@type text
@desc Select the start icon index for buff.
Press right click and select Iconset viewer.
@default 32

@param debuffIcon
@text Debuff Icon
@type text
@desc Select the start icon index for debuff.
Press right click and select Iconset viewer.
@default 48

@command changeParam
@text Add/Remove/Set (Change Parameter)
@desc This works like the event command change parameter. So you can change maxHp params values too.

    @arg battlerType
    @text Battler type
    @type select
    @option actor
    @option party
    @option enemy
    @option troop
    @desc The enemy/troop only work on battle. 
    Actor/Enemy = battler Id || Party/Troop = Member Index
    @default party

    @arg battlerId
    @text Battler Id/Index
    @type text
    @desc The index position of the party/troop(id for Enemy/Actor). Separate each one with a comma. Use -1 for all.
    @default 1

    @arg id
    @text Custom Param Id
    @type text
    @desc The custom parameter Id(or short name) to change
    @default 0

    @arg operation
    @text Operation Type
    @type select
    @option Add/Remove
    @option Set
    @desc The type of operation you want to do with the parameter.
    @default Add/Remove

    @arg value
    @text Value to remove or add
    @type multiline_string
    @desc The value to remove/add/set. Can use \v[id].
    @default 0

@command changeHpParam
@text Add/Remove/Set (change HP/MP/TP)
@desc This works like the event command change HP/MP/TP

    @arg battlerType
    @text Battler type
    @type select
    @option actor
    @option party
    @option enemy
    @option troop
    @desc The enemy/troop only work on battle. 
    Actor/Enemy = battler Id || Party/Troop = Member Index
    @default party

    @arg battlerId
    @text Battler Id/Index
    @type text
    @desc The index position of the party/troop(id for Enemy/Actor). Separate each one with a comma. Use -1 for all.
    @default 1

    @arg id
    @text Custom Param Id
    @type text
    @desc The custom parameter Id(or short name) to change
    @default 0

    @arg operation
    @text Operation Type
    @type select
    @option Add/Remove
    @option Set
    @desc The type of operation you want to do with the parameter.
    @default Add/Remove

    @arg value
    @text Value
    @type multiline_string
    @desc The value to remove/add/set. Can use \v[id].
    @default 0

*/

/* ------------------------------ CUSTOM PARAM ------------------------------ */
{
/*~struct~stCustomParam:

@param shortName
@text Short Name
@type text
@desc The short name to be used as an object on the battlers and referenced in script calls.
@default per

@param name
@text Full Name
@type text
@desc The full name to show in menus.
@default Perception

@param isHp
@text Is HP/MP/TP type
@type boolean
@desc If true, this parameter will work like HP/MP/TP that will have a max and current value.
@default false

*/
}

/* --------------------------- CHANGE CUSTOM PARAM -------------------------- */
{
/*~struct~changeCustomParamSt:

@param id
@text Custom Param Id
@type text
@desc The custom parameter Id(or short name) to change
@default 0

@param value
@text Value to remove or add
@type text
@desc The value to remove or add.
Use \v[id] to reference a variable value.
@default 0

@param battlerType
@text The battler type
@type select
@option actor
@option party
@option enemy
@option troop
@desc The enemy/troop only work on battle. 
Actor/Enemy = battler Id || Party/Troop = Member Index
@default party

@param battlerId
@text The battler Id
@type text
@desc The index position of the party/troop(id for Enemy/Actor). Separate each one with a comma. Use -1 for all.
@default 1

*/
}

/* -------------------------------- TEMPLATE -------------------------------- */
{
/*~struct~templateST:

@param name
@text Template name
@type text
@desc The template to set on the class note field.
@default 0

@param list
@text Custom Parameters
@type struct<templateValueST>[]
@desc The list of custom parameters to add to the class/weapon/armor.
@default []

*/
}

/* ----------------------- CUSTOM PARAM VALUE TEMPLATE ---------------------- */
{
/*~struct~templateValueST:

@param id
@text Custom Param Id
@type text
@desc The custom parameter Id(or short name) to change
@default 0

@param value
@text Value to remove or add
@type number
@desc The value that this custom parameter will have.
@default 0

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_CustomParameter = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

Eli.CustomParameter = {

    Parameters: class{

        constructor(parameters){
            this.list = this.parseList(JSON.parse(parameters.list))
            this.templates = this.parseTemplates(JSON.parse(parameters.templates))
            this.buffIcon = Number(parameters.buffIcon)
            this.debuffIcon = Number(parameters.debuffIcon)
        }

        parseList(parameters){
            const list = []

            for(let i = 0; i < parameters.length; i++){
                const {shortName, name, isHp} = JSON.parse(parameters[i])
                const param = {
                    shortName, name, 
                    isHp: isHp === "true"
                }
                list.push(param)
                this.addParameterToGame_Battlerbase(param, i)
            }

            return list
        }

        addParameterToGame_Battlerbase({isHp, shortName}, id){
            if(isHp){
                const maxName = `max${shortName}`
                Object.defineProperties(Game_BattlerBase.prototype, {
                    [maxName]: { get: function() { return this.cparam(id); }, configurable: true },
                    [shortName]: { get: function() { return this[`_${shortName}`] }, configurable: true },
                })
            }else{
                Object.defineProperties(Game_BattlerBase.prototype, {
                    [shortName]: { get: function() { return this.cparam(id); }, configurable: true },
                })
            }
        }

        parseTemplates(parameters){
            const templates = []

            for(const item of parameters){
                const template = JSON.parse(item)
                const templateList = JSON.parse(template.list)
                const customParameterList = []

                for(const item of templateList){
                    const {id, value} = JSON.parse(item)

                    customParameterList.push({
                        id: isNaN(id) ? id : Number(id), 
                        value: Number(value)
                    })
                }

                templates.push({
                    name: template.name,
                    list: customParameterList,
                })
            }

            return templates
        }
    },

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        this.parameters = new this.Parameters(PluginManager.parameters("EliMZ_CustomParameters"))
    },

    initPluginCommands(){
        const commands = ['changeParam', 'changeHpParam']
        Eli.PluginManager.registerCommands(this, commands, "EliMZ_CustomParameters")
    },

    getParam(){
        return this.parameters
    },

    findCParamId(cparam){
        if(isNaN(cparam)){
            cparam = Eli.String.removeSpaces(cparam)
            cparam = this.getParam().list.findIndex(item => item.name.includes(cparam) || item.shortName.includes(cparam))
        }

        return Number(cparam)
    },

    getShortName(id){
        return this.getParam().list[id].shortName
    },

    getFullName(id){
        return this.getParam().list[id].name
    },

    isHpType(id){
        return this.getParam().list[id].isHp
    },

    getMaxName(id){
        return `max${this.getParam().list[id].shortName}`
    },

    get_name(id){
        return `_${this.getParam().list[id].shortName}`
    },

    getList(){
        return this.getParam().list
    },

    cParamsLength(){
        return this.getParam().list.length
    },

    getBattlerId(battlerId){
        if(battlerId.includes(",")){
            return battlerId.split(",").map(item => Number(item))
        }else{
            return [Number(battlerId)]
        }
    },

    getParsedArgsForChangeParam(args){
        return {
            battlerIds: Eli.PluginManager.createIdList(args.battlerId), 
            cparamId: this.findCParamId(args.id), 
            value: Number(Eli.PluginManager.parseVariables(args.value))
        }
    },

    changeParam(args){
        this.cmd_changeParam(args)
    },

    cmd_changeParam(args){
        const {battlerIds, cparamId, value} = this.getParsedArgsForChangeParam(args)
        const isChanging = args.operation !== "Set"
        
        if(battlerIds[0] === -1){
            this.changeParam_all(args.battlerType, cparamId, value, "setCustomParam", isChanging)
        }else{
            this[`changeParam_${args.battlerType}`](battlerIds, cparamId, value, "setCustomParam", isChanging)
        }
    },

    changeHpParam(args){
        this.cmd_changeHpParam(args)
    },

    cmd_changeHpParam(args){
        const {battlerIds, cparamId, value} = this.getParsedArgsForChangeParam(args)
        const isChanging = args.operation !== "Set"

        if(battlerIds[0] === -1){
            this.changeParam_all(args.battlerType, cparamId, value, "setCustomHpParam", isChanging)
        }else{
            this[`changeParam_${args.battlerType}`](battlerIds, cparamId, value, "setCustomHpParam", isChanging)
        }
    },

    changeParam_all(battlerType, cparamId, value, methodName, isChanging){
        let battleMembers = []

        if(battlerType === "party" || battlerType === "actor"){
            battleMembers = $gameParty.members()

        }else if(SceneManager._scene instanceof Scene_Battle){
            battleMembers = $gameTroop.members()
        }

        for(const member of battleMembers){
            member[methodName](cparamId, value, isChanging)
        }
    },

    changeParam_party(battlerIds, cparamId, value, methodName, isChanging){
        for(const memberIndex of battlerIds){
            $gameParty.members()[memberIndex][methodName](cparamId, value, isChanging)
        }
    },

    changeParam_actor(battlerIds, cparamId, value, methodName, isChanging){
        for(const actorId of battlerIds){
            const member = $gameParty.members().find(member => member.actorId() === actorId)

            if(member){
                member[methodName](cparamId, value, isChanging)
            }
        }
    },

    changeParam_troop(battlerIds, cparamId, value, methodName, isChanging){
        if(!SceneManager._scene instanceof Scene_Battle) return;

        for(const memberIndex of battlerIds){
            $gameTroop.members()[memberIndex][methodName](cparamId, value, isChanging)
        }
    },

    changeParam_enemy(battlerIds, cparamId, value, methodName, isChanging){
        if(!SceneManager._scene instanceof Scene_Battle) return;

        for(const enemyId of battlerIds){
            const member = $gameTroop.members().find(member => member.enemyId() === enemyId)

            if(member){
                member[methodName](cparamId, value, isChanging)
            }
        }
    },

    addDataMetaEffects(data){
        if(data.meta.AddCBuff){
            this.addCBuffEffect(data)
        }
    
        if(data.meta.AddCDebuff){
            this.addCDebuffEffect(data)
        }
    
        if(data.meta.RemoveCBuff){
            this.removeCBuffEffect(data)
        }
    
        if(data.meta.RemoveCDebuff){
            this.removeCDebuffEffect(data)
        }
    
        if(data.meta.GrowC){
            this.addGrowCEffect(data)
        }
    },

    addCBuffEffect(data){
        const effects = Eli.String.removeSpaces(data.meta.AddCBuff).split(",")

        for(const effect of effects){
            let [cparamId, value] = effect.split(":")
            cparamId = this.findCParamId(cparamId)

            data.effects.push({code: 100, dataId: cparamId, value1: Number(value), value2: 0})
        }
    },
    
    addCDebuffEffect(data){
        const effects = Eli.String.removeSpaces(data.meta.AddCDebuff).split(",")

        for(const effect of effects){
            let [cparamId, value] = effect.split(":")
            cparamId = this.findCParamId(cparamId)

            data.effects.push({code: 101, dataId: cparamId, value1: Number(value), value2: 0})
        }
    },
    
    removeCBuffEffect(data){
        const effects = Eli.String.removeSpaces(data.meta.RemoveCBuff).split(",")

        for(const effect of effects){
            const cparamId = this.findCParamId(effect)

            data.effects.push({code: 102, dataId: cparamId, value1: 1, value2: 0})
        }
    },
    
    removeCDebuffEffect(data){
        const effects = Eli.String.removeSpaces(data.meta.RemoveCDebuff).split(",")

        for(const effect of effects){
            const cparamId = this.findCParamId(effect)

            data.effects.push({code: 103, dataId: cparamId, value1: 1, value2: 0})
        }
    },
    
    addGrowCEffect(data){
        const effects = Eli.String.removeSpaces(data.meta.GrowC).split(",")

        for(const effect of effects){
            let [cparamId, value] = effect.split(":")
            cparamId = this.findCParamId(cparamId)
            
            data.effects.push({code: 104, dataId: cparamId, value1: +value, value2: 0})
        }
    },
    
    addDataCParameterChanges(data){
        data.cparams = new Array(this.cParamsLength()).fill(0)

        if(data.meta.CParams){

            if(data.meta.CParams.includes(":")){
                this.parseCParamMetaByString(data)
            }else{
                this.parseCParamMetaByTemplate(data)
            }
        }
    },

    parseCParamMetaByString(data){
        const customParameters = data.meta.CParams.split(",")
    
        for(const cparam of customParameters){
            let [id, value] = cparam.split(":")
            id = this.findCParamId(id)
            data.cparams[Number(id)] = Number(value)
        }
    },

    parseCParamMetaByTemplate(data){
        const templateName = Eli.String.removeSpaces(data.meta.CParams)
        const customParameters = this.getParam().templates.find(item => item.name === templateName).list
    
        for(const cparam of customParameters){
            let {id, value} = cparam
            id = this.findCParamId(id)
            data.cparams[Number(id)] = Number(value)
        }
    },

}

{

const Plugin = Eli.CustomParameter
const Alias = {}

Plugin.initialize()

/* ------------------------------- SCENE BOOT ------------------------------- */
Alias.Scene_Boot_processDataSkills = Scene_Boot.prototype.processDataSkills
Scene_Boot.prototype.processDataSkills = function(data){
    Alias.Scene_Boot_processDataSkills.call(this, data)
    Plugin.addDataMetaEffects(data)
}

Alias.Scene_Boot_processDataItems = Scene_Boot.prototype.processDataItems
Scene_Boot.prototype.processDataItems = function(data){
    Alias.Scene_Boot_processDataItems.call(this, data)
    Plugin.addDataMetaEffects(data)
}

Alias.Scene_Boot_processDataClasses = Scene_Boot.prototype.processDataClasses
Scene_Boot.prototype.processDataClasses = function(data){
    Alias.Scene_Boot_processDataClasses.call(this, data)
    Plugin.addDataCParameterChanges(data)
}

Alias.Scene_Boot_processDataWeapons = Scene_Boot.prototype.processDataWeapons
Scene_Boot.prototype.processDataWeapons = function(data){
    Alias.Scene_Boot_processDataWeapons.call(this, data)
    Plugin.addDataCParameterChanges(data)
}

Alias.Scene_Boot_processDataArmors = Scene_Boot.prototype.processDataArmors
Scene_Boot.prototype.processDataArmors = function(data){
    Alias.Scene_Boot_processDataArmors.call(this, data)
    Plugin.addDataCParameterChanges(data)
}

Alias.Scene_Boot_processDataEnemies = Scene_Boot.prototype.processDataEnemies
Scene_Boot.prototype.processDataEnemies = function(data){
    Alias.Scene_Boot_processDataEnemies.call(this, data)
    Plugin.addDataCParameterChanges(data)
}

/* ------------------------------- GAME ACTION ------------------------------ */
Game_Action.EFFECT_ADD_CBUFF        = 100
Game_Action.EFFECT_ADD_CDEBUFF      = 101
Game_Action.EFFECT_REMOVE_CBUFF     = 102
Game_Action.EFFECT_REMOVE_CDEBUFF   = 103
Game_Action.EFFECT_GROWC            = 104

Alias.Game_Action_testItemEffect = Game_Action.prototype.testItemEffect
Game_Action.prototype.testItemEffect = function(target, effect) {
    const alias = Alias.Game_Action_testItemEffect.call(this, target, effect)
    const effectc = this.testItemEffectC(target, effect)

    return effectc || alias
}

Alias.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect
Game_Action.prototype.applyItemEffect = function(target, effect) {
    Alias.Game_Action_applyItemEffect.call(this, target, effect)
    this.applyItemEffectC(target, effect)
}

Game_Action.prototype.testItemEffectC = function(target, effect) {
    switch (effect.code) {
        case Game_Action.EFFECT_ADD_CBUFF:
            return !target.isMaxCBuffAffected(effect.dataId)

        case Game_Action.EFFECT_ADD_CDEBUFF:
            return !target.isMaxCDebuffAffected(effect.dataId)

        case Game_Action.EFFECT_REMOVE_CBUFF:
            return target.isCBuffAffected(effect.dataId)

        case Game_Action.EFFECT_REMOVE_CDEBUFF:
            return target.isCDebuffAffected(effect.dataId)
    }
}

Game_Action.prototype.applyItemEffectC = function(target, effect) {
    switch (effect.code) {
        case Game_Action.EFFECT_ADD_CBUFF:
            this.itemEffectAddCBuff(target, effect)
            break
        case Game_Action.EFFECT_ADD_CDEBUFF:
            this.itemEffectAddCDebuff(target, effect)
            break
        case Game_Action.EFFECT_REMOVE_CBUFF:
            this.itemEffectRemoveCBuff(target, effect)
            break
        case Game_Action.EFFECT_REMOVE_CDEBUFF:
            this.itemEffectRemoveCDebuff(target, effect)
            break
        case Game_Action.EFFECT_GROWC:
            this.itemEffectGrowC(target, effect)
            break
    }
}

Game_Action.prototype.itemEffectAddCBuff = function(target, effect) {
    target.addCBuff(effect.dataId, effect.value1)
    this.makeSuccess(target)
}

Game_Action.prototype.itemEffectAddCDebuff = function(target, effect) {
    const chance = target.cdebuffRate(effect.dataId) * this.lukEffectRate(target)
    if (Math.random() < chance) {
        target.addCDebuff(effect.dataId, effect.value1)
        this.makeSuccess(target)
    }
}

Game_Action.prototype.itemEffectRemoveCBuff = function(target, effect) {
    if (target.isCBuffAffected(effect.dataId)) {
        target.removeCBuff(effect.dataId)
        this.makeSuccess(target)
    }
}

Game_Action.prototype.itemEffectRemoveCDebuff = function(target, effect) {
    if (target.isCDebuffAffected(effect.dataId)) {
        target.removeCBuff(effect.dataId)
        this.makeSuccess(target)
    }
}

Game_Action.prototype.itemEffectGrowC = function(target, effect) {
    target.addCParam(effect.dataId, Math.floor(effect.value1))
    this.makeSuccess(target)
}

/* --------------------------- GAME ACTION RESULT --------------------------- */
Alias.Game_ActionResult_clear = Game_ActionResult.prototype.clear
Game_ActionResult.prototype.clear = function() {
    Alias.Game_ActionResult_clear.call(this)
    this.clearCBuffsAndDebuffs()
}

Alias.Game_ActionResult_isStatusAffected = Game_ActionResult.prototype.isStatusAffected;
Game_ActionResult.prototype.isStatusAffected = function() {
    const alias = Alias.Game_ActionResult_isStatusAffected.call(this)
    const cStatus = this.addedCBuffs.length > 0 ||
                    this.addedCDebuffs.length > 0 ||
                    this.removedCBuffs.length > 0

    return alias || cStatus

}

Game_ActionResult.prototype.clearCBuffsAndDebuffs = function() {
    this.addedCBuffs = []
    this.addedCDebuffs = []
    this.removedCBuffs = []
}
 
Game_ActionResult.prototype.isCBuffAdded = function(paramId) {
    return this.addedCBuffs.includes(paramId)
}

Game_ActionResult.prototype.pushAddedCBuff = function(paramId) {
    if (!this.isCBuffAdded(paramId)) {
        this.addedCBuffs.push(paramId)
    }
}

Game_ActionResult.prototype.isCDebuffAdded = function(paramId) {
    return this.addedCDebuffs.includes(paramId)
}

Game_ActionResult.prototype.pushAddedCDebuff = function(paramId) {
    if (!this.isCDebuffAdded(paramId)) {
        this.addedCDebuffs.push(paramId)
    }
}

Game_ActionResult.prototype.isCBuffRemoved = function(paramId) {
    return this.removedCBuffs.includes(paramId)
}

Game_ActionResult.prototype.pushRemovedCBuff = function(paramId) {
    if (!this.isCBuffRemoved(paramId)) {
        this.removedCBuffs.push(paramId)
    }
}

/* ---------------------------- GAME BATTLER BASE --------------------------- */
Game_BattlerBase.ICON_CBUFF_START       = Plugin.getParam().buffIcon
Game_BattlerBase.ICON_CDEBUFF_START     = Plugin.getParam().debuffIcon
Game_BattlerBase.TRAIT_CPARAM           = 100
Game_BattlerBase.TRAIT_CDEBUFF_RATE     = 101

Alias.Game_BattlerBase_initialize = Game_BattlerBase.prototype.initialize
Game_BattlerBase.prototype.initialize = function() {
    this.initNewParameters()
    Alias.Game_BattlerBase_initialize.call(this)
    this.initCustomHpMpParameters()
}

Game_BattlerBase.prototype.initNewParameters = function(){
    const length = Plugin.cParamsLength()

    this._cparamPlus = new Array(length)
    this._cbuffs = new Array(length)
    this._cbuffTurns = new Array(length)
}

Game_BattlerBase.prototype.initCustomHpMpParameters = function(){
    for(const param of Plugin.getParam().list){

        if(param.isHp){
            this[`_${param.shortName}`] = 0
        }
    }
}

Alias.Game_BattlerBase_clearParamPlus = Game_BattlerBase.prototype.clearParamPlus
Game_BattlerBase.prototype.clearParamPlus = function() {
    Alias.Game_BattlerBase_clearParamPlus.call(this)
    this.clearCParamPlus()
}

Game_BattlerBase.prototype.clearCParamPlus = function() {
    this._cparamPlus.fill(0)
}

Alias.Game_BattlerBase_clearBuffs = Game_BattlerBase.prototype.clearBuffs
Game_BattlerBase.prototype.clearBuffs = function() {
    Alias.Game_BattlerBase_clearBuffs.call(this)
    this.clearCBuffs()
}

Game_BattlerBase.prototype.clearCBuffs = function() {
    this._cbuffs.fill(0)
    this._cbuffTurns.fill(0)
}

Alias.Game_BattlerBase_updateBuffTurns = Game_BattlerBase.prototype.updateBuffTurns;
Game_BattlerBase.prototype.updateBuffTurns = function() {
    Alias.Game_BattlerBase_updateBuffTurns.call(this)
    this.updateCBuffTurns()
}

Game_BattlerBase.prototype.updateCBuffTurns = function() {
    for (let i = 0; i < this._cbuffTurns.length; i++) {

        if (this._cbuffTurns[i] > 0) {
            this._cbuffTurns[i]--
        }
    }
}

Alias.Game_BattlerBase_allIcons = Game_BattlerBase.prototype.allIcons;
Game_BattlerBase.prototype.allIcons = function() {
    const allIcons = Alias.Game_BattlerBase_allIcons.call(this)
    return allIcons.concat(this.cbuffIcons())
}

Game_BattlerBase.prototype.cbuffIcons = function() {
    const icons = []

    for (let i = 0; i < this._cbuffs.length; i++) {

        if (this._cbuffs[i] !== 0) {
            icons.push(this.cbuffIconIndex(this._cbuffs[i], i))
        }
    }

    return icons
}

Alias.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function() {
    Alias.Game_BattlerBase_refresh.call(this)
    this.refreshAllCustomParameters()
}

Game_BattlerBase.prototype.refreshAllCustomParameters = function(){
    for(const param of Plugin.getParam().list){

        if(param.isHp){
            this.refreshCustomParameter(param.shortName)
        }
    }
}

Game_BattlerBase.prototype.refreshCustomParameter = function(shortParamName){
    const maxName = `max${shortParamName.substring(1)}`
    this[shortParamName] = this[shortParamName].clamp(0, this[maxName])
}

Alias.Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll
Game_BattlerBase.prototype.recoverAll = function() {
    Alias.Game_BattlerBase_recoverAll.call(this)
    this.recoverAllCustomParameters()
}

Game_BattlerBase.prototype.recoverAllCustomParameters = function() {
    for(const param of Plugin.getParam().list){
        this.recoverCustomParameter(param.shortName)
    }
}

Game_BattlerBase.prototype.recoverCustomParameter = function(paramId) {
    paramId = Plugin.findCParamId(paramId)

    if(Plugin.isHpType(paramId)){
        const _name = Plugin.get_name(paramId)
        const maxName = Plugin.getMaxName(paramId)
        this[_name] = this[maxName]
    }
}

Game_BattlerBase.prototype.eraseCBuff = function(paramId){
    this._cbuffs[paramId] = 0
    this._cbuffTurns[paramId] = 0
}

Game_BattlerBase.prototype.cbuff = function(paramId) {
    return this._cbuffs[paramId]
}

Game_BattlerBase.prototype.isCBuffAffected = function(paramId) {
    return this._cbuffs[paramId] > 0
}

Game_BattlerBase.prototype.isCDebuffAffected = function(paramId) {
    return this._cbuffs[paramId] < 0
}

Game_BattlerBase.prototype.isCBuffOrCDebuffAffected = function(paramId) {
    return this._cbuffs[paramId] !== 0
}

Game_BattlerBase.prototype.isMaxCBuffAffected = function(paramId) {
    return this._cbuffs[paramId] === 2
}

Game_BattlerBase.prototype.isMaxCDebuffAffected = function(paramId) {
    return this._cbuffs[paramId] === -2
}

Game_BattlerBase.prototype.increaseCBuff = function(paramId) {
    if (!this.isMaxCBuffAffected(paramId)) {
        this._cbuffs[paramId]++
    }
}

Game_BattlerBase.prototype.decreaseCBuff = function(paramId) {
    if (!this.isMaxCDebuffAffected(paramId)) {
        this._cbuffs[paramId]--
    }
}

Game_BattlerBase.prototype.overwriteCBuffTurns = function(paramId, turns) {
    if (this._cbuffTurns[paramId] < turns) {
        this._cbuffTurns[paramId] = turns
    }
}

Game_BattlerBase.prototype.isCBuffExpired = function(paramId) {
    return this._cbuffTurns[paramId] === 0
}

Game_BattlerBase.prototype.cbuffIconIndex = function(buffLevel, paramId) {
    const maxParams = Plugin.cParamsLength();
    if (buffLevel > 0) {
        return Game_BattlerBase.ICON_CBUFF_START + (buffLevel - 1) * maxParams + paramId
    } else if (buffLevel < 0) {
        return Game_BattlerBase.ICON_CDEBUFF_START + (-buffLevel - 1) * maxParams + paramId
    } else {
        return 0
    }
}

Game_BattlerBase.prototype.cparamBase = function(paramId) {
    return 0
}

Game_BattlerBase.prototype.cparamPlus = function(paramId) {
    return this._cparamPlus[paramId]
}

Game_BattlerBase.prototype.cparamBuffRate = function(paramId) {
    return this._cbuffs[paramId] * 0.25 + 1.0
}

Game_BattlerBase.prototype.cdebuffRate = function(paramId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_CDEBUFF_RATE, paramId)
}

Game_BattlerBase.prototype.cparamRate = function(paramId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_CPARAM, paramId)
}

Game_BattlerBase.prototype.cparam = function(paramId) {
    let value = this.cparamBase(paramId) + this.cparamPlus(paramId)
    value *= this.cparamRate(paramId) * this.cparamBuffRate(paramId)
    const result = Math.round( Math.max(0, value) )
    return result
}

Game_BattlerBase.prototype.addCParam = function(paramId, value) {
    paramId = Plugin.findCParamId(paramId)
    this._cparamPlus[paramId] += value

    if(Plugin.isHpType(paramId)){
        this.refreshCustomParameter(Plugin.getShortName(paramId))
    }
}

Game_BattlerBase.prototype.changeCustomHpParam = function(paramId, value) {
    this.setCustomHpParam(paramId, value, true)
}

Game_BattlerBase.prototype.setCustomHpParam = function(paramId, value, isChanging) {
    paramId = Plugin.findCParamId(paramId)

    if(Plugin.isHpType(paramId)){
        const shortParamName = Plugin.get_name(paramId)
        const oldValue = isChanging ? this[shortParamName] : 0

        this[shortParamName] = oldValue + value
        this.refreshCustomParameter(shortParamName)
    }
}

Game_BattlerBase.prototype.changeCustomParam = function(paramId, value) {
    this.setCustomParam(paramId, value, true)
}

Game_BattlerBase.prototype.setCustomParam = function(paramId, targetValue, isChanging) {
    if(isChanging){
        this.addCParam(paramId, targetValue)

    }else{
        paramId = Plugin.findCParamId(paramId)
        const currentValue = this.cparam(paramId)
        const finalValue = targetValue - currentValue
    
        this.addCParam(paramId, finalValue)
    }
}

/* ------------------------------ GAME BATTLER ------------------------------ */
Alias.Game_Battler_removeAllBuffs = Game_Battler.prototype.removeAllBuffs
Game_Battler.prototype.removeAllBuffs = function() {
    Alias.Game_Battler_removeAllBuffs.call(this)
    this.removeAllCBuffs()
}

Game_Battler.prototype.removeAllCBuffs = function() {
    for (let i = 0; i < this._cbuffs.length; i++) {
        this.removeCBuff(i)
    }
}

Alias.Game_Battler_removeBuffsAuto = Game_Battler.prototype.removeBuffsAuto
Game_Battler.prototype.removeBuffsAuto = function() {
    Alias.Game_Battler_removeBuffsAuto.call(this)
    this.removeCBuffsAuto()
}

Game_Battler.prototype.removeCBuffsAuto = function() {
    for (let i = 0; i < this._cbuffs.length; i++) {
        
        if (this.isCBuffExpired(i)) {
            this.removeCBuff(i)
        }
    }
}

Game_Battler.prototype.addCBuff = function(paramId, turns) {
    if(this.isAlive()){
        this.increaseCBuff(paramId)

        if (this.isCBuffAffected(paramId)) {
            this.overwriteCBuffTurns(paramId, turns)
        }

        this._result.pushAddedCBuff(paramId)
        this.refresh()
    }
}

Game_Battler.prototype.addCDebuff = function(paramId, turns) {
    if(this.isAlive()){
        this.decreaseCBuff(paramId)

        if (this.isCDebuffAffected(paramId)) {
            this.overwriteCBuffTurns(paramId, turns)
        }

        this._result.pushAddedCDebuff(paramId)
        this.refresh()
    }
}

Game_Battler.prototype.removeCBuff = function(paramId) {
    if (this.isAlive() && this.isCBuffOrCDebuffAffected(paramId)) {
        this.eraseCBuff(paramId)
        this._result.pushRemovedCBuff(paramId)
        this.refresh()
    }
}

/* ------------------------------- GAME ACTOR ------------------------------- */
Game_Actor.prototype.cparamBase = function(paramId) {
    return this.currentClass().cparams[paramId]
}

Game_Actor.prototype.cparamPlus = function(paramId) {
    let value = Game_Battler.prototype.cparamPlus.call(this, paramId)

    for(const equip of this.equips()){

        if(equip){
            value += equip.cparams[paramId]
        }
    }

    return value
}

/* ------------------------------- GAME ENEMY ------------------------------- */
if(Imported.Eli_EnemyClass){

    Alias.Game_Enemy_cparamBase = Game_Enemy.prototype.cparamBase
    Game_Enemy.prototype.cparamBase = function(paramId) {
        if(this._classId > 0){
            return this.getCParamBaseFromClass(paramId)
        }else{
            return Alias.Game_Enemy_cparamBase.call(this, paramId)
        }
    }

    Game_Enemy.prototype.getCParamBaseFromClass = function(paramId) {
        return this.currentClass().cparams[paramId][this._level]
    }

    Game_Enemy.prototype.getCParamPlusFromEquip = function(paramId){
        let value = 0

        for(const equip of this.equips()){

            if(equip){
                value += equip.cparams[paramId]
            }
        }

        return value
    }

    Game_Enemy.prototype.cparamPlus = function(paramId) {
        let value = Game_Battler.prototype.cparamPlus.call(this, paramId)

        if(this._classId > 0){
            value += this.getCParamPlusFromEquip(paramId)
        }

        return value
    }

}else{ // If not imported Eli Enemy Class...

    Game_Enemy.prototype.cparamBase = function(paramId) {
        return this.enemy().cparams[paramId] || 0
    }

}

/* ---------------------------- WINDOW BATTLE LOG --------------------------- */
Alias.Window_BattleLog_displayChangedBuffs = Window_BattleLog.prototype.displayChangedBuffs
Window_BattleLog.prototype.displayChangedBuffs = function(target) {
    Alias.Window_BattleLog_displayChangedBuffs.call(this, target)
    this.displayChangedCBuffs(target)
}

Window_BattleLog.prototype.displayChangedCBuffs = function(target) {
    const result = target.result()
    this.displayCBuffs(target, result.addedCBuffs, TextManager.buffAdd)
    this.displayCBuffs(target, result.addedCDebuffs, TextManager.debuffAdd)
    this.displayCBuffs(target, result.removedCBuffs, TextManager.buffRemove)
}

Window_BattleLog.prototype.displayCBuffs = function(target, buffs, fmt) {
    for (const paramId of buffs) {
        const text = fmt.format(target.name(), Plugin.getList()[paramId][1])
        this.push("popBaseLine")
        this.push("pushBaseLine")
        this.push("addText", text)
    }
}

}