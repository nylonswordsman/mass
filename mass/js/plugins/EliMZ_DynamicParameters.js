//============================================================================
// EliMZ_DynamicParameters.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book
@orderAfter EliMZ_ClassCurves
@orderAfter EliMZ_CapParameterControl

@plugindesc ♦2.0.9♦ Dynamic add parameters to equipments and states.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-dynamic-parameters-for-rpg-maker/rate?source=game

@help 
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

==============================================================================
Features
==============================================================================

● Dynamically add values to battler parameters through note tags!
● Support States, Weapons, Armor!
● Support all types of parameters!

==============================================================================
How to use
==============================================================================

https://docs.google.com/document/d/1E0YmoyUfykj9xg3np-BhEXZwia2uPSDp3dOjR_OCn_k/edit?usp=sharing

==============================================================================

@param preset
@text Dynamic Notes Templates
@type struct<presetSt>[]
@desc You can create as many templates you want and set them by their name on the note field.
@default ["{\"name\":\"Test\",\"param\":\"{\\\"mhp\\\":\\\"\\\\\\\"1\\\\\\\"\\\",\\\"mmp\\\":\\\"\\\\\\\"2\\\\\\\"\\\",\\\"atk\\\":\\\"\\\\\\\"3\\\\\\\"\\\",\\\"def\\\":\\\"\\\\\\\"4\\\\\\\"\\\",\\\"mat\\\":\\\"\\\\\\\"5\\\\\\\"\\\",\\\"mdf\\\":\\\"\\\\\\\"6\\\\\\\"\\\",\\\"agi\\\":\\\"\\\\\\\"7\\\\\\\"\\\",\\\"luk\\\":\\\"\\\\\\\"8\\\\\\\"\\\"}\",\"xparam\":\"{\\\"hit\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"eva\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"cri\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"cev\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mev\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mrf\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"cnt\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"hrg\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mrg\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"trg\\\":\\\"\\\\\\\"0\\\\\\\"\\\"}\",\"sparam\":\"{\\\"tgr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"grd\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"rec\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"pha\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mcr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"tcr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"pdr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mdr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"fdr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"exr\\\":\\\"\\\\\\\"0\\\\\\\"\\\"}\",\"cparam\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"crm\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"20\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"rep\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"name\":\"ShortSword\",\"param\":\"{\\\"mhp\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mmp\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"atk\\\":\\\"\\\\\\\"if(this.isActor(){\\\\\\\\n    this.currentClass().id === 1 ? 10 : 0\\\\\\\\n}else{\\\\\\\\n    0\\\\\\\\n}\\\\\\\"\\\",\\\"def\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mat\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mdf\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"agi\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"luk\\\":\\\"\\\\\\\"0\\\\\\\"\\\"}\",\"xparam\":\"{\\\"hit\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"eva\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"cri\\\":\\\"\\\\\\\"this.isActor() ? 0.01 : 3\\\\\\\"\\\",\\\"cev\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mev\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mrf\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"cnt\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"hrg\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mrg\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"trg\\\":\\\"\\\\\\\"0\\\\\\\"\\\"}\",\"sparam\":\"{\\\"tgr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"grd\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"rec\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"pha\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mcr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"tcr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"pdr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"mdr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"fdr\\\":\\\"\\\\\\\"0\\\\\\\"\\\",\\\"exr\\\":\\\"\\\\\\\"0\\\\\\\"\\\"}\",\"cparam\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"rep\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if(this.isActor()){\\\\\\\\\\\\\\\\n    this.actorId() === 2 ? 10 : 0\\\\\\\\\\\\\\\\n}else{\\\\\\\\\\\\\\\\n    0\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]

*/

/* --------------------------------- PRESETS -------------------------------- */
{
/*~struct~presetSt:

@param name
@text Name
@type text
@desc The name to be used on <DynParams: name>.
It is case sensitive.
@default Test

@param param
@text Parameters
@type struct<paramSt>
@desc Set the dynamic values for regular parameters.
@default {"mhp":"\"0\"","mmp":"\"0\"","atk":"\"0\"","def":"\"0\"","mat":"\"0\"","mdf":"\"0\"","agi":"\"0\"","luk":"\"0\""}

@param xparam
@text X Parameters
@type struct<xparamSt>
@desc Set the dynamic values for X parameters.
@default {"hit":"\"0\"","eva":"\"0\"","cri":"\"0\"","cev":"\"0\"","mev":"\"0\"","mrf":"\"0\"","cnt":"\"0\"","hrg":"\"0\"","mrg":"\"0\"","trg":"\"0\""}

@param sparam
@text S Parameters
@type struct<sparamSt>
@desc Set the dynamic values for S parameters.
@default {"tgr":"\"0\"","grd":"\"0\"","rec":"\"0\"","pha":"\"0\"","mcr":"\"0\"","tcr":"\"0\"","pdr":"\"0\"","mdr":"\"0\"","fdr":"\"0\"","exr":"\"0\""}

@param cparam
@text Custom Parameters
@type struct<cparamSt>[]
@desc Set the dynamic values for custom parameters.
@default []

*/
}

/* ---------------------------- NORMAL PARAMETERS --------------------------- */
{
/*~struct~paramSt:

@param mhp
@text Max Hp
@type note
@desc Can use number or formulas.
@default "0"

@param mmp
@text Max Mp
@type note
@desc Can use number or formulas.
@default "0"

@param atk
@text Attack
@type note
@desc Can use number or formulas.
@default "0"

@param def
@text Defense
@type note
@desc Can use number or formulas.
@default "0"

@param mat
@text Magic Attack
@type note
@desc Can use number or formulas.
@default "0"

@param mdf
@text Magic Defense
@type note
@desc Can use number or formulas.
@default "0"

@param agi
@text Agility
@type note
@desc Can use number or formulas.
@default "0"

@param luk
@text Luck
@type note
@desc Can use number or formulas.
@default "0"

*/
}

/* ------------------------------ X PARAMETERS ------------------------------ */
{
/*~struct~xparamSt:

@param hit
@text Hit rate
@type note
@desc Can use number or formulas.
@default "0"

@param eva
@text Evasion
@type note
@desc Can use number or formulas.
@default "0"

@param cri
@text Critical rate
@type note
@desc Can use number or formulas.
@default "0"

@param cev
@text Critical evasion rate
@type note
@desc Can use number or formulas.
@default "0"

@param mev
@text Magic evasion rate
@type note
@desc Can use number or formulas.
@default "0"

@param mrf
@text Magic reflection rate
@type note
@desc Can use number or formulas.
@default "0"

@param cnt
@text Counter attack rate
@type note
@desc Can use number or formulas.
@default "0"

@param hrg
@text Hp regeneration rate
@type note
@desc Can use number or formulas.
@default "0"

@param mrg
@text Mp regeneration rate
@type note
@desc Can use number or formulas.
@default "0"

@param trg
@text Tp regeneration rate
@type note
@desc Can use number or formulas.
@default "0"

*/

}

/* ------------------------------ S PARAMETERS ------------------------------ */
{
/*~struct~sparamSt:

@param tgr
@text Target rate
@type note
@desc Can use number or formulas.
@default "0"

@param grd
@text Guard effect rate
@type note
@desc Can use number or formulas.
@default "0"

@param rec
@text Recovery effect rate
@type note
@desc Can use number or formulas.
@default "0"

@param pha
@text Pharmacology
@type note
@desc Can use number or formulas.
@default "0"

@param mcr
@text Mp Cost Rate
@type note
@desc Can use number or formulas.
@default "0"

@param tcr
@text Tp Charge Rate
@type note
@desc Can use number or formulas.
@default "0"

@param pdr
@text Physical Damage Rate
@type note
@desc Can use number or formulas.
@default "0"

@param mdr
@text Magic Damage Rate
@type note
@desc Can use number or formulas.
@default "0"

@param fdr
@text Floor Damage Rate
@type note
@desc Can use number or formulas.
@default "0"

@param exr
@text Experience Rate
@type note
@desc Can use number or formulas.
@default "0"

*/

}

/* ---------------------------- CUSTOM PARAMETERS --------------------------- */
{

/*~struct~cparamSt:

@param name
@text Name
@type text
@desc Must be the short name of the custom parameter.
It is case sensitive.
@default crm

@param value
@text Value
@type note
@desc Can use number or formulas.
@default "0"

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_DynamicParameters = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.DynamicParameters = {

    Parameters: class {
        constructor(parameters){
            this.templates = this.parsePresetParameters(JSON.parse(parameters.preset))
        }

        parsePresetParameters(parameters){
            const templates = []

            for(const param of parameters){
                const template = JSON.parse(param)
    
                templates.push({
                    name: template.name,
                    param: this.parseNormalParam(JSON.parse(template.param)),
                    xparam: this.parseXParam(JSON.parse(template.xparam)),
                    sparam: this.parseSParam(JSON.parse(template.sparam)),
                    cparam: this.parseCParam(JSON.parse(template.cparam)),
                })
            }

            return templates
        }
    
        parseNormalParam(param){
            return {
                mhp: this.parseParam(JSON.parse(param.mhp)), 
                mmp: this.parseParam(JSON.parse(param.mmp)), 
                atk: this.parseParam(JSON.parse(param.atk)), 
                def: this.parseParam(JSON.parse(param.def)), 
                mat: this.parseParam(JSON.parse(param.mat)), 
                mdf: this.parseParam(JSON.parse(param.mdf)), 
                agi: this.parseParam(JSON.parse(param.agi)), 
                luk: this.parseParam(JSON.parse(param.luk))
            }
        }
    
        parseXParam(param){
            return {
                hit: this.parseParam(JSON.parse(param.hit)),
                eva: this.parseParam(JSON.parse(param.eva)),
                cri: this.parseParam(JSON.parse(param.cri)),
                cev: this.parseParam(JSON.parse(param.cev)),
                mev: this.parseParam(JSON.parse(param.mev)),
                mrf: this.parseParam(JSON.parse(param.mrf)),
                cnt: this.parseParam(JSON.parse(param.cnt)),
                hrg: this.parseParam(JSON.parse(param.hrg)),
                mrg: this.parseParam(JSON.parse(param.mrg)),
                trg: this.parseParam(JSON.parse(param.trg))
            }
        }
    
        parseSParam(param){
            return {
                tgr: this.parseParam(JSON.parse(param.tgr)), 
                grd: this.parseParam(JSON.parse(param.grd)), 
                rec: this.parseParam(JSON.parse(param.rec)), 
                pha: this.parseParam(JSON.parse(param.pha)), 
                mcr: this.parseParam(JSON.parse(param.mcr)), 
                tcr: this.parseParam(JSON.parse(param.tcr)), 
                pdr: this.parseParam(JSON.parse(param.pdr)), 
                mdr: this.parseParam(JSON.parse(param.mdr)), 
                fdr: this.parseParam(JSON.parse(param.fdr)), 
                exr: this.parseParam(JSON.parse(param.exr))
            }
        }
    
        parseCParam(params){
            const customParameterList = []
    
            for(const param of params){
                const cparam = JSON.parse(param)
                cparam.value = this.parseParam(JSON.parse(cparam.value))
                customParameterList.push(cparam)
            }
    
            return customParameterList
        }

        parseParam(param){
            if(isNaN(param)){
                return param
            }else{
                return Number(param)
            }
        }
    },

    params: ["mhp", "mmp", "atk", "def", "mat", "mdf", "agi", "luk"],
    xparams: ["hit", "eva", "cri", "cev", "mev", "mrf", "cnt", "hrg", "mrg", "trg"],
    sparams: ["tgr", "grd", "rec", "pha", "mcr", "tcr", "pdr", "mdr", "fdr", "exr"],

    initialize(){
        this.initParameters()
    },

    initParameters(){
        const parameters = PluginManager.parameters("EliMZ_DynamicParameters")
        this.parameters = new this.Parameters(parameters)
    },

    getParam(){
        return this.parameters
    },

    setBaseDynamicParams(data){
        data.DynParams = this.createAllParameters()

        if(data.meta.DynParams){
            this.setMetaDynamicParams(data)
        }
    },

    createAllParameters(){
        const obj = {
            param: new Array(8).fill(0),
            xparam: new Array(10).fill(0),
            sparam: new Array(10).fill(0),
        }

        if(Imported.Eli_CustomParameter){
            obj.cparam = new Array(Eli.CustomParameter.cParamsLength()).fill(0)
        }

        return obj
    },

    setMetaDynamicParams(data){
        const dynParamTag = Eli.String.removeSpaces(data.meta.DynParams)
        const template = this.getParam().templates.find(item => dynParamTag === Eli.String.removeSpaces(item.name))

        data.DynParams.param = Object.values(template.param)
        data.DynParams.xparam = Object.values(template.xparam)
        data.DynParams.sparam = Object.values(template.sparam)

        for(const param of template.cparam){
            const id = this.getParamIdByName("cparam", param.name)
            data.DynParams.cparam[id] = param.value
        }
    },

    getParamIdByName(type, paramName){
        switch(type){
            case "param": return this.params.findIndex(item => item.includes(paramName))
            case "xparam": return this.xparams.findIndex(item => item.includes(paramName))
            case "sparam": return this.sparams.findIndex(item => item.includes(paramName))
            case "cparam": return Eli.CustomParameter.getList().findIndex(item => item.shortName.includes(paramName))
        }
    },

}

{

const Plugin = Eli.DynamicParameters
const Alias = {}

Plugin.initialize()

/* ------------------------------- SCENE BOOT ------------------------------- */
Alias.Scene_Boot_processDataWeapons = Scene_Boot.prototype.processDataWeapons
Scene_Boot.prototype.processDataWeapons = function(data){
    Alias.Scene_Boot_processDataWeapons.call(this, data)
    Plugin.setBaseDynamicParams(data)
}

Alias.Scene_Boot_processDataArmors = Scene_Boot.prototype.processDataArmors
Scene_Boot.prototype.processDataArmors = function(data){
    Alias.Scene_Boot_processDataArmors.call(this, data)
    Plugin.setBaseDynamicParams(data)
}

Alias.Scene_Boot_processDataStates = Scene_Boot.prototype.processDataStates
Scene_Boot.prototype.processDataStates = function(data){
    Alias.Scene_Boot_processDataStates.call(this, data)
    Plugin.setBaseDynamicParams(data)
}

/* ---------------------------- GAME BATTLER BASE --------------------------- */
Game_BattlerBase.prototype.getAllDynamicValues = function(paramType, paramId){
    let value = 0

    for(const state of this.states()){
        value += this.getDynamicStateValue(state, paramType, paramId)
    }

    return value
}

if(Imported.VisuMZ_1_ElementStatusCore){

    Game_BattlerBase.prototype.getAllDynamicValues = function(paramType, paramId){
        let value = 0
    
        for(const state of this.states()){
            value += this.getDynamicStateValue(state, paramType, paramId)
        }
    
        for(const state in this._traitSets){
            value += this.getDynamicVisuTraitValue(state, paramType, paramId)
        }
        
        return value
    }
}

Game_BattlerBase.prototype.getDynamicStateValue = function(state, paramType, paramId){
    if(state){
        const dynamicValue = state.DynParams[paramType][paramId]
        return isNaN(dynamicValue) ? eval(dynamicValue) : dynamicValue
    }else{
        return 0
    }
}

Game_BattlerBase.prototype.getDynamicVisuTraitValue = function(state, paramType, paramId){
    let value = 0
    
    const traitName = this._traitSets[state]

    if(traitName.length > 0){
        const dataState = $dataStates.find(item => item && item.name === traitName)

        if(dataState){
            const dynamicValue = dataState.DynParams[paramType][paramId]
            value += isNaN(dynamicValue) ? eval(dynamicValue) : dynamicValue
        }
    }
    
    return value
}

Game_BattlerBase.prototype.getDynamicEquipValue = function(equip, paramType, paramId){
    if(equip){
        const dynamicValue = equip.DynParams[paramType][paramId]
        return isNaN(dynamicValue) ? eval(dynamicValue) : dynamicValue
    }else{
        return 0
    }
}

if(Imported.Eli_CapParameterControl){

    Alias.Game_BattlerBase_getEquipParameters = Game_BattlerBase.prototype.getEquipParameters
    Game_BattlerBase.prototype.getEquipParameters = function(paramId){
        let value = Alias.Game_BattlerBase_getEquipParameters.call(this, paramId)

        for (const equip of this.equips()) {
            if (equip) {
                value += this.getDynamicEquipValue(equip, "param", paramId)
            }
        }

        return value
    }

    Alias.Game_BattlerBase_getEquipCParameters = Game_BattlerBase.prototype.getEquipCParameters
    Game_BattlerBase.prototype.getEquipCParameters = function(paramId){
        let value = Alias.Game_BattlerBase_getEquipCParameters.call(this, paramId)

        for (const equip of this.equips()) {
            if (equip) {
                value += this.getDynamicEquipValue(equip, "cparam", paramId)
            }
        }

        return value
    }

    if(Imported.VisuMZ_1_ElementStatusCore){

        Alias.Game_BattlerBase_getOtherParamValues = Game_BattlerBase.prototype.getOtherParamValues
        Game_BattlerBase.prototype.getOtherParamValues = function(paramId){
            let value = Alias.Game_BattlerBase_getOtherParamValues.call(this, paramId)

            for(const state of this.states()){
                value += this.getDynamicStateValue(state, "param", paramId)
            }

            for(const state in this._traitSets){
                value += this.getDynamicVisuTraitValue(state, "param", paramId)
            }

            return value
        }

    }else{

        Alias.Game_BattlerBase_getOtherParamValues = Game_BattlerBase.prototype.getOtherParamValues
        Game_BattlerBase.prototype.getOtherParamValues = function(paramId){
            let value = Alias.Game_BattlerBase_getOtherParamValues.call(this, paramId)
        
            for(const state of this.states()){
                value += this.getDynamicStateValue(state, "param", paramId)
            }
        
            return value
        }
    } // Imported.VisuMZ_1_ElementStatusCore

    if(Imported.VisuMZ_1_ElementStatusCore){

        Alias.Game_BattlerBase_getOtherCParamValues = Game_BattlerBase.prototype.getOtherCParamValues
        Game_BattlerBase.prototype.getOtherCParamValues = function(paramId){
            let value = Alias.Game_BattlerBase_getOtherCParamValues.call(this, paramId)

            for(const state of this.states()){
                value += this.getDynamicStateValue(state, "cparam", paramId)
            }

            for(const state in this._traitSets){
                value += this.getDynamicVisuTraitValue(state, "cparam", paramId)
            }

            return value
        }

    }else{

        Alias.Game_BattlerBase_getOtherCParamValues = Game_BattlerBase.prototype.getOtherCParamValues
        Game_BattlerBase.prototype.getOtherCParamValues = function(paramId){
            let value = Alias.Game_BattlerBase_getOtherCParamValues.call(this, paramId)
        
            for(const state of this.states()){
                value += this.getDynamicStateValue(state, "cparam", paramId)
            }
        
            return value
        }

    } // Imported.VisuMZ_1_ElementStatusCore

    
} // Imported.Eli_CapParameterControl

/* ------------------------------- GAME ACTOR ------------------------------- */
Alias.Game_Actor_getAllDynamicValues = Game_Actor.prototype.getAllDynamicValues
Game_Actor.prototype.getAllDynamicValues = function(paramType, paramId){
    let value = Alias.Game_Actor_getAllDynamicValues.call(this, paramType, paramId)

    for(const equip of this.equips()){
        value += this.getDynamicEquipValue(equip, paramType, paramId)
    }

    return value
}

Alias.Game_Actor_xparam = Game_Actor.prototype.xparam
Game_Actor.prototype.xparam = function(xparamId) {
    const value = Alias.Game_Actor_xparam.call(this, xparamId)
    const dynamicValue = this.getAllDynamicValues("xparam", xparamId)

    return value + dynamicValue
}

Alias.Game_Actor_sparam = Game_Actor.prototype.sparam
Game_Actor.prototype.sparam = function(sparamId) {
    const value = Alias.Game_Actor_sparam.call(this, sparamId)
    const dynamicValue = this.getAllDynamicValues("sparam", sparamId)

    return value + dynamicValue
}

Alias.Game_Actor_paramPlus = Game_Actor.prototype.paramPlus
Game_Actor.prototype.paramPlus = function(paramId) {
    const value = Alias.Game_Actor_paramPlus.call(this, paramId)
    const dynamicValue = this.getAllDynamicValues("param", paramId)

    return value + dynamicValue
}

if(Imported.Eli_CustomParameter){

    Alias.Game_Actor_cparamPlus = Game_Actor.prototype.cparamPlus
    Game_Actor.prototype.cparamPlus = function(paramId) {
        const value = Alias.Game_Actor_cparamPlus.call(this, paramId)
        const dynamicValue = this.getAllDynamicValues("cparam", paramId)
        
        return value + dynamicValue
    }

}

/* ------------------------------- GAME ENEMY ------------------------------- */
Alias.Game_Enemy_xparam = Game_Enemy.prototype.xparam
Game_Enemy.prototype.xparam = function(xparamId) {
    const value = Alias.Game_Enemy_xparam.call(this, xparamId)
    const dynamicValue = this.getAllDynamicValues("xparam", xparamId)

    return value + dynamicValue
}

Alias.Game_Enemy_sparam = Game_Enemy.prototype.sparam
Game_Enemy.prototype.sparam = function(sparamId) {
    const value = Alias.Game_Enemy_sparam.call(this, sparamId)
    const dynamicValue = this.getAllDynamicValues("sparam", sparamId)

    return value + dynamicValue
}

Alias.Game_Enemy_paramPlus = Game_Enemy.prototype.paramPlus
Game_Enemy.prototype.paramPlus = function(paramId) {
    const value = Alias.Game_Enemy_paramPlus.call(this, paramId)
    const dynamicValue = this.getAllDynamicValues("param", paramId)

    return value + dynamicValue
}

if(Imported.Eli_EnemyClass){

    Alias.Game_Enemy_getAllDynamicValues = Game_Enemy.prototype.getAllDynamicValues
    Game_Enemy.prototype.getAllDynamicValues = function(paramType, paramId){
        let value = Alias.Game_Enemy_getAllDynamicValues.call(this, paramType, paramId)

        for(const equip of this.equips()){
            value += this.getDynamicEquipValue(equip, paramType, paramId)
        }

        return value
    }

} // Imported Eli Enemy Class

if(Imported.Eli_CustomParameter){

    Alias.Game_Enemy_cparamPlus = Game_Enemy.prototype.cparamPlus
    Game_Enemy.prototype.cparamPlus = function(paramId) {
        const value = Alias.Game_Enemy_cparamPlus.call(this, paramId)
        const dynamicValue = this.getAllDynamicValues("cparam", paramId)
        
        return value + dynamicValue
    }

} // Imported Eli Custom Parameter

}