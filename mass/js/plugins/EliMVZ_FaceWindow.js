//==========================================================================
// EliMVZ_FaceWindow.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦3.7.1♦ Adds a face window for the message box!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-face-window-for-rpg-maker-mz/rate?source=game

@help
★★★★★ Rate the plugin by clicking on the link above! 
Please, is very important to me ^^

● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Plugin Requirements
============================================================================

Need Eli Book
Order After Eli Book

============================================================================
Features
============================================================================

● Show the character's face in a window apart from the message box.
● Use any face size.
● Show the window using "easing animations"!
● Choose the tone and type of background!
● Animated faces!
● Different animations for when the message box is writing and when it is 
not (Idle and Talk animations).

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/12ZYjKgfFfGmeLa53UVAH1pNprzktTEzoms7BFMNIl5s/edit?usp=sharing

============================================================================

@param switches
@text Switches

@param switchId
@text Disable Face Window
@type switch
@desc If this switch is on, the external face window will not show.
@default 0
@parent switches

@param switchIdAnimation
@text Disable Face Animation
@type switch
@desc If this switch is on, the face animation inside the external face window will be disabled.
@default 0
@parent switches

@param separator1
@text Face Window

@param windowSize
@text Size
@type text
@desc The width of the window
@default 144,144
@parent separator1

@param padding
@text Padding
@type text
@desc The empty space size between the edges of the face image and the window border.
@default 12
@parent separator1

@param backgroundType
@text Background Type
@type combo
@option Window
@option Dim
@option Transparent
@option Strong
@option Light Gradient Vertical
@option Faded Horizontal
@option Message Window
@desc The background type.
@default Window
@parent separator1

@param separator3
@text Show/Hide Movement

@param dynamicPosition
@text Dynamic Position
@type boolean
@desc If true, the positions will be recalculated everytime, before the face window shows.
@default false
@parent separator3

@param topPos
@text Top Position
@type struct<positionSt>
@desc The position of the face window when the message is on top.
@default {"initial":"","frames":"5","easing":"linear","outsideX":"none","outsideY":"bottom","target":"","alignX":"left","offsetX":"0","alignY":"bottom","offsetY":"0"}
@parent separator3

@param centerPos
@text Center Position
@type struct<positionSt>
@desc The position of the face window when the message is on center.
@default {"initial":"","frames":"5","easing":"linear","outsideX":"none","outsideY":"top","target":"","alignX":"center","offsetX":"0","alignY":"top","offsetY":"0"}
@parent separator3

@param bottomPos
@text Bottom Position
@type struct<positionSt>
@desc The position of the face window when the message is on bottom.
@default {"initial":"","frames":"5","easing":"linear","outsideX":"none","outsideY":"top","target":"","alignX":"left","offsetX":"24","alignY":"top","offsetY":"24"}
@parent separator3

@param Message Manager Plugin
@parent separator3

@param syncMovement
@text Sync Movement
@type boolean
@desc All movement durations will be equal to the ones on the Message Manager Plugin.
@default false
@parent Message Manager Plugin

@param syncOpenness
@text Sync Openness 
@type boolean
@desc All openness durations will be equal to the ones on the Message Manager Plugin.
@default false
@parent Message Manager Plugin

@param separator2
@text Face Image

@param faceSize
@text Size
@type text
@desc The width of the face
@default 144, 144
@parent separator2

@param importFromAnimatedFaces
@text Import Animated Faces
@type boolean
@desc If true, it will import the settings from Eli Animated Faces.
@default false
@parent separator2

@param faceSettings
@text Animation Settings
@type struct<faceSettingsSt>[]
@desc Set all your animated face settings.
@default []
@parent importFromAnimatedFaces

*/

/* --------------------------- FACE IMAGE SETTINGS -------------------------- */
{

/*~struct~faceSettingsSt:

@param image
@text Image
@type file
@dir img/faces
@desc The first index of this animated face.
@default

@param startIndex
@text Start Index
@type number
@desc The first index of this animated face.
@default 0

@param middleIndex
@text Idle Index
@type number
@desc The last index of the animated face when message is not writting.
@default 0

@param endIndex
@text Talking Index
@type number
@desc The last index of the animated face when message is writting. Must be equal or higher than Idle.
@default 0

@param frameSpeed
@text Frame Speed
@type number
@desc How fast, in frames, the face will change from start index to endIndex.
@default 30

*/

}

/* -------------------------------- POSITION -------------------------------- */
{
/*~struct~positionSt:

@param duration
@text Move Duration
@type text
@desc The duration for the window to move from Initial to Target Position.
@default 1

@param easing
@text Easing
@type combo
@option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option easeInElastic @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option easeOutElastic @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option easeInOutElastic @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce @option easeOutInElastic 
@desc Choose the easing type. Can use \v[id].
@default linear

@param opennessBehavior
@text Open/Close Behavior
@type struct<opennessSt>
@desc How the window will open and close.
@default {"widthAlign":"None","heightAlign":"Centered","easing":"linear","duration":"8"}

@param separator1
@text Initial

@param initialAlignX
@text Align X
@type select
@option left
@option center
@option right
@option left_offScreen
@option right_offScreen
@desc Select left to only use offset value.
@default left
@parent separator1

@param initialOffsetX
@text Offset X
@type text
@desc The Offset X position.
@default 0
@parent separator1

@param initialAlignY
@text Align Y
@type select
@option top
@option center
@option bottom
@option top_offScreen
@option bottom_offScreen
@desc Select top to only use offset value.
@default top
@parent separator1

@param initialOffsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 0
@parent separator1

@param separator2
@text Target

@param targetAlignX
@text Target Align X
@type select
@option left
@option center
@option right
@desc Select left to only use offset value.
@default left
@parent separator2

@param targetOffsetX
@text Target Offset X
@type text
@desc The Offset X position.
@default 0
@parent separator2

@param targetAlignY
@text Target Align Y
@type select
@option top
@option center
@option bottom
@desc Select top to only use offset value.
@default top
@parent separator2

@param targetOffsetY
@text Target Offset Y
@type text
@desc The offset Y position.
@default 0
@parent separator2

*/
}

/* -------------------------------- OPENNESS -------------------------------- */
{

/*~struct~opennessSt:

@param widthAlign
@text Width Direction
@type select
@option None
@option Left to Right
@option Centered
@option Right to Left
@desc The direction that the window will open/close, regardless the width.
@default None

@param heightAlign
@text Height Direction
@type select
@option None
@option Top to Bottom
@option Centered
@option Bottom to Top
@desc The direction that the window will open/close, regardless the height.
@default Centered

@param easing
@text Easing
@type combo
@option inherit @option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce
@desc Choose the easing type. Can use \v[id]. "inherit" will get the same easing that was set on the position settings.
@default linear

@param duration
@text Duration
@type text
@desc How fast the window will open/close. In frames.
@default 8

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_FaceWindow = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.FaceWindow = {

    Window_FaceMessage: class extends Window_Base{

        initialize(){
            super.initialize(this.createWindowRect())
    
            if(Plugin.getParam().backgroundType !== "Message Window"){
                this.setBackgroundType(Plugin.getParam().backgroundType)
            }
            
            this.initMembers()
            this.createFace()
            this.createAllAnimes()
        }
    
        createWindowRect(){
            const ww = Plugin.getWindowWidth()
            const wh = Plugin.getWindowHeight()
    
            return new Rectangle(0, 0, ww, wh)
        }
    
        setBackgroundType(type){
            if(type > 0){
                this.frameVisible = false
            }
            super.setBackgroundType(type)
        }
    
        initMembers(){
            this.animeGroups = [
                new Eli.AnimeGroup([], {direction: "normal", paused: true}), // top
                new Eli.AnimeGroup([], {direction: "normal", paused: true}), // center
                new Eli.AnimeGroup([], {direction: "normal", paused: true}), // bottom
            ]
            this.isAnimeRunning = false
            this.faceIndex = -1
            this.faceName = ''
            this.index = 0
            this.posType = 0
            this.x = -1000
            this.y = -1000
            this.opennessWidthAlign = Plugin.getParam().position[0].openness.widthAlign
            this.opennessHeightAlign = Plugin.getParam().position[0].openness.heightAlign
            this.padding = Plugin.getParam().padding
        }
    
        createFace(){
            this.faceSprite = new Eli.FaceWindow.Sprite_FaceWindow()
            this.addInnerChild(this.faceSprite)
            Plugin.sprite = this.faceSprite
        }
    
    /* ------------------------------- START ANIME ------------------------------ */
    
        createAllAnimes(){
            for(let i = 0; i < 3; i++){
                this.createAnime(i)
            }
        }

        createAnime(i){
            const param = Plugin.getParam().position[i]
            const props = this.createAnimeProps(param, i)
            const defaultData = this.createAnimeDefaultData(param, i)

            this.createAnimeChilds(props, defaultData, i)
            this.setAnimeGroupsCallbacks(i)
        }
    
        createAnimeProps(param, i){
            const initPos = param.initial
            const targetPos = param.target
            const [initialX, initialY] = this.createAnimePosition(initPos, targetPos.offsetX(), targetPos.offsetY())
            const [targetX, targetY] = this.createAnimePosition(targetPos)

            return {
                openness: this.createOpennessAnimeProp(param, i),
                x: {value: [initialX, targetX]},
                y: {value: [initialY, targetY]},
            }
        }
    
        createAnimePosition(position, targetOffsetX = 0, targetOffsetY = 0){
            const offsetX = position.offsetX()
            const offsetY = position.offsetY()
            
            const x = {
                left: offsetX,
                center: (Graphics.boxWidth/2 - this.width/2) + offsetX,
                right: (Graphics.boxWidth - this.width) + offsetX,
                left_offScreen: 0 - (Math.abs(targetOffsetX) + this.width),
                right_offScreen: Graphics.boxWidth + this.width + Math.abs(targetOffsetX),
            }[position.alignX]
        
            const y = {
                top: offsetY,
                center: (Graphics.boxHeight/2 - this.height/2) + offsetY,
                bottom: (Graphics.boxHeight - this.height) + offsetY,
                top_offScreen: 0 - (Math.abs(targetOffsetY) + this.height),
                bottom_offScreen: Graphics.boxHeight + this.height + Math.abs(targetOffsetY),
            }[position.alignY]
            
            return [Math.round(x), Math.round(y)]
        }
    
        createOpennessAnimeProp(param, i){
            const positionEasing = param.easing
            const {widthAlign, heightAlign, easing} = param.openness
            const initialOpenness = (widthAlign === "None" && heightAlign === "None") ? 255 : 0
            let duration = param.openness.duration
    
            if(Plugin.getParam().syncOpenness && Imported.Eli_MessageManager){
                duration = Eli.MessageManager.getParam().animeSettings[i].opennessBehavior.duration
            }
    
            return {
                value: [initialOpenness, 255],
                duration: duration,
                easing: easing === "inherit" ? positionEasing : easing,
            }
        }
    
        createAnimeDefaultData(param, i){
            const defaultData = Eli.AnimeManager.createDefaultData()
            let duration = param.duration
    
            if(Plugin.getParam().syncMovement && Imported.Eli_MessageManager){
                duration = Eli.MessageManager.getParam().animeSettings[i].messagePosition.duration
            }
    
            defaultData.autoPlay = false
            defaultData.duration = duration
            defaultData.easing = param.easing
            defaultData.direction = "normal"
    
            return defaultData
        }
    
        createAnimeChilds(props, defaultData, i){
            const animations = Eli.AnimeManager.createAnimations(this, props, defaultData)
            this.animeGroups[i].setAnimations(animations)
        }
    
        setAnimeGroupsCallbacks(i){
            this.animeGroups[i].onStart = this.onAnimeGroupStart.bind(this)
            this.animeGroups[i].onComplete = this.onAnimeGroupComplete.bind(this)
        }
    
        onAnimeGroupStart(anime){
            if(anime.direction === "reverse"){
                this.refreshMessageSettings()
            }
            this.isAnimeRunning = true
        }
    
        onAnimeGroupComplete(anime){
            this.isAnimeRunning = false
        }
    
        getAnimeGroup(){
            return this.animeGroups[this.posType]
        }
        
        playAnime(direction){
            this.getAnimeGroup().play(direction)  
        }
    
        get openness() {
            return this._openness
        }
    
        set openness(value) {
            this._openness = value.clamp(0, 255)
            this.updateHorizontalOpenness(this.opennessWidthAlign)
            this.updateVerticalOpenness(this.opennessHeightAlign)
        }
    
        updateOpen(){}
    
        updateClose(){}
    
    /* -------------------------------- END ANIME ------------------------------- */
    
        refreshBackground() {
            this.setBackgroundType($gameMessage.background())
        }
    
        start(){
            if(Plugin.getParam().backgroundType === "Message Window"){
                this.refreshBackground()
            }
    
            if(this.messageSettingsAreChanged()){
                this.refreshMessageSettings()
    
                if(this.faceName){
                    this.refreshFaceSprite(this.faceName, this.faceIndex)
                    this.playAnime("normal")
                }
    
            }else{
                this.refreshMessageSettings()
            }
        }
    
        messageSettingsAreChanged(){
            return  this.faceName !== $gameMessage.faceName() || 
                    this.faceIndex !== $gameMessage.faceIndex() ||
                    this.posType !== $gameMessage.positionType()
        }
    
        refreshMessageSettings(){
            this.faceName = $gameMessage.faceName()
            this.faceIndex = $gameMessage.faceIndex()
            this.posType = $gameMessage.positionType()
        }
    
        refreshFaceSprite(faceName, faceIndex){
            this.faceSprite.refreshFaceBitmap(faceName, faceIndex)
        }
    
        update(){
            super.update()
            this.updateVisibility()
    
            for(const anime of this.animeGroups){
                anime.update()
            }
        }
    
        updateVisibility(){
            this.visible =  Plugin.isFaceWindowEnabled()
        }
    
    },
    Sprite_FaceWindow: class extends Sprite{

        initialize(bitmap){
            super.initialize(bitmap)
            this.faceIndex = 0
            this.frameCount = 0
            this.setFrame(0, 0, Plugin.getParam().faceWidth, Plugin.getParam().faceHeight)
        }
    
        refreshSettings(){
            this.faceIndex = $gameMessage.faceIndex()
            this.frameCount = 0
        }
    
        refreshFaceBitmap(faceName, faceIndex){
            this.refreshSettings()
            this.bitmap = ImageManager.loadFace(faceName)
            this.bitmap.addLoadListener(this.refreshFaceFrame.bind(this, faceIndex))
    
            Plugin.setFaceSettings(faceName, faceIndex)
        }
    
        refreshFaceFrame(faceIndex){
            const faceWidth = Plugin.getParam().faceWidth
            const faceHeight = Plugin.getParam().faceHeight
            const cols = this.bitmap.width / faceHeight
            const rows = this.bitmap.height / faceWidth
            const index = faceIndex
            const x = index % cols * faceWidth
            const y = (Math.floor(index / cols) % rows) * faceHeight
            
            this.setFrame(x, y, faceWidth, faceHeight)
        }
    
        refreshAnimation(limitIndex){
            if(this.hasAnimatedFace()){
                this.frameCount++
    
                if(this.canChangeFaceIndex()){
                    this.changeFaceIndex(limitIndex)
                    this.refreshFaceFrame(this.faceIndex)
                    this.frameCount = 0
                }
            }
        }
    
        canChangeFaceIndex(){
            return this.frameCount >= Plugin.getCurrentFaceSettings().frameSpeed
        }
    
        changeFaceIndex(limitIndex){
            if(this.faceIndex >= limitIndex){
                this.faceIndex = Plugin.getCurrentFaceSettings().startIndex
            }else{
                this.faceIndex += 1
            }
        }
    
        hasAnimatedFace(){
            return $gameMessage.faceName() && Plugin.isFaceWindowAnimationEnabled()
        }
    },
    Parameters: class {

        constructor(parameters){
            const [windowWidth, windowHeight] = parameters.windowSize.split(",")
            const [faceWidth, faceHeight] = parameters.faceSize.split(",")

            this.switchId = Number(parameters.switchId)
            this.switchIdAnimation = Number(parameters.switchIdAnimation)
            this.windowWidth = Number(windowWidth)
            this.windowHeight = Number(windowHeight)
            this.faceWidth = Number(faceWidth)
            this.faceHeight = Number(faceHeight)
            this.padding = Number(parameters.padding)
            this.backgroundType = this.parseBackgroundType(parameters.backgroundType)
            this.syncMovement = parameters.syncMovement === "true"
            this.syncOpenness = parameters.syncOpenness === "true"
            this.dynamicPosition = parameters.dynamicPosition === "true"
            this.position = [
                this.parsePosition(JSON.parse(parameters.topPos)),
                this.parsePosition(JSON.parse(parameters.centerPos)),
                this.parsePosition(JSON.parse(parameters.bottomPos)),
            ],
            this.faceSettings = this.parseFaceSettings(JSON.parse(parameters.faceSettings), parameters.importFromAnimatedFaces === "true")
        }

        parseBackgroundType(type){
            return {
                "Window":                   0,
                "Dim":                      1,
                "Transparent":              2,
                "Strong":                   3,
                "Light Gradient Vertical":  4,
                "Faded Horizontal":         5,
                "Message Window":           "Message Window"
            }[type]
        }
    
        parsePosition(position){
            return {
                initial: {
                    alignX: position.initialAlignX,
                    offsetX: new Function(`return ${position.initialOffsetX}`),
                    alignY: position.initialAlignY,
                    offsetY: new Function(`return ${position.initialOffsetY}`),
                },
                target: {
                    alignX: position.targetAlignX,
                    offsetX: new Function(`return ${position.targetOffsetX}`),
                    alignY: position.targetAlignY,
                    offsetY: new Function(`return ${position.targetOffsetY}`),
                },
                easing: position.easing,
                duration: Number(position.duration),
                openness: this.createOpenness(JSON.parse(position.opennessBehavior), position.easing),
            }
        }
    
        createOpenness(param, positionEasing){
            return {
                widthAlign: param.widthAlign,
                heightAlign: param.heightAlign,
                easing: param.easing === "inherit" ? positionEasing : param.easing,
                duration: Number(param.duration)
            }
        }
    
        parseFaceSettings(settings, importedFromAnimatedFaces){
            if(importedFromAnimatedFaces){
                return Eli.AnimatedFaces.parameters.faceSettings
    
            }else{
                const allSettings = []
        
                for(const setting of settings){
                    const data = JSON.parse(setting)
        
                    allSettings.push({
                        image: data.image,
                        startIndex: Number(data.startIndex),
                        middleIndex: Number(data.middleIndex),
                        endIndex: Number(data.endIndex),
                        frameSpeed: Number(data.frameSpeed),
                    })
                }
        
                return allSettings
            }
        }
    },

    container: null,
    sprite: null,
    currentFaceSettings: {
        image: "",
        startIndex: 0,
        middleIndex: 0,
        endIndex: 0,
        frameSpeed: Infinity,
    },

    initialize(){
        this.initParameters()
    },

    initParameters(){
        const parameters = PluginManager.parameters(Eli.PluginManager.getPluginName())
        this.parameters = new this.Parameters(parameters)
    },

    getParam(){
        return this.parameters
    },

    getWindowWidth(){
        return this.parameters.windowWidth + this.parameters.padding * 2
    },

    getWindowHeight(){
        return this.parameters.windowHeight + this.parameters.padding * 2
    },

    createEmptyFaceSetting(faceName, faceIndex){
        return {
            image: faceName,
            startIndex: faceIndex,
            middleIndex: 0,
            endIndex: 0,
            frameSpeed: Infinity,
        }
    },

    getCurrentFaceSettings(){
        return this.currentFaceSettings
    },

    setFaceSettings(faceName, faceIndex){
        const getSettings =  item => item.image === faceName && item.startIndex === faceIndex
        this.currentFaceSettings =  this.getParam().faceSettings.find(getSettings) || 
                                    this.createEmptyFaceSetting(faceName, faceIndex)
    },

    getFaceWindow(){
        return this.container
    },

    getFaceSprite(){
        return this.sprite
    },

    isFaceWindowDisabled(){
        const id = this.getParam().switchId
        return $gameSwitches.value(id)
    },

    isFaceWindowEnabled(){
        return !this.isFaceWindowDisabled()
    },

    isFaceWindowAnimationDisabled(){
        const id = this.getParam().switchIdAnimation
        return $gameSwitches.value(id)
    },

    isFaceWindowAnimationEnabled(){
        return !this.isFaceWindowAnimationDisabled()
    },
    
}

const Plugin = Eli.FaceWindow
const Alias = {}

Plugin.initialize()

/* ------------------------------ SCENE MESSAGE ----------------------------- */
Alias.Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows
Scene_Message.prototype.createAllWindows = function() {
    Alias.Scene_Message_createAllWindows.call(this)
    this.createFaceWindow()
}

Scene_Message.prototype.createFaceWindow = function(){
    this.faceMessageWindow = new Eli.FaceWindow.Window_FaceMessage()
    this.addWindow(this.faceMessageWindow)
    Plugin.container = this.faceMessageWindow
}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
Game_Interpreter.prototype.canHideFaceWindow = function(){
    const currentCode = this.getCurrentCommandCode()
    const msgCodes = this.getAllowedCodesToShowFaceWindow()

    return !$gameMessage.isBusy() && !msgCodes.includes(currentCode)
}

Game_Interpreter.prototype.getAllowedCodesToShowFaceWindow = function(){
    return [101, 401]
}

/* ----------------------------- WINDOW MESSAGE ----------------------------- */
Alias.Window_Message_initMembers = Window_Message.prototype.initMembers 
Window_Message.prototype.initMembers = function() {
    this._faceWindowAnimationState = "idle"
    Alias.Window_Message_initMembers.call(this)
}

Alias.Window_Message_processCharacter = Window_Message.prototype.processCharacter
Window_Message.prototype.processCharacter = function(textState) {
    Alias.Window_Message_processCharacter.call(this, textState)
    this._faceWindowAnimationState = "talking"
}

Alias.Window_Message_startMessage = Window_Message.prototype.startMessage
Window_Message.prototype.startMessage = function() {
    Alias.Window_Message_startMessage.call(this)

    if(Plugin.isFaceWindowEnabled()){
        
        if(Plugin.getParam().dynamicPosition){
            Plugin.getFaceWindow().createAnime(this._positionType.clamp(0, 2))
        }

        this.operateFaceWindow()
    }
}

Window_Message.prototype.operateFaceWindow = function() {
    if($gameMessage.faceName()){
        this.startFaceWindow()

    }else if(Plugin.getFaceWindow().faceName){
        this.endFaceWindow()
    }
}

Window_Message.prototype.startFaceWindow = function(){
    Plugin.getFaceWindow().start()
}

Window_Message.prototype.endFaceWindow = function(){
    Plugin.getFaceWindow().playAnime("reverse")
}

Alias.Window_Message_newLineX = Window_Message.prototype.newLineX
Window_Message.prototype.newLineX = function(textState){
    const alias = Alias.Window_Message_newLineX.call(this, textState)

    if(this.canRemoveMarginForFaceWindow()){
        const margin = this.getMarginForFaceWindow()

        return alias - margin
    }else{
        return alias
    }
}

Window_Message.prototype.canRemoveMarginForFaceWindow = function(){
    return $gameMessage.faceName() && Plugin.isFaceWindowEnabled()
}

Window_Message.prototype.getMarginForFaceWindow = function(){
    const faceWidth = Eli.Utils.getFaceSize().width
    const spacing = 20

    return faceWidth + spacing - 4
}

Alias.Window_Message_updateWait = Window_Message.prototype.updateWait
Window_Message.prototype.updateWait = function() {
    const alias = Alias.Window_Message_updateWait.call(this)

    if(alias){
        this._faceWindowAnimationState = "idle"
    }

    if(Plugin.getFaceWindow().isAnimeRunning){
        return true
    }

    return alias
}

Alias.Window_Message_updateInput = Window_Message.prototype.updateInput
Window_Message.prototype.updateInput = function() {
    const alias = Alias.Window_Message_updateInput.call(this)

    if(alias){
        this._faceWindowAnimationState = "idle"
    }
    
    return alias
}

Alias.Window_Message_update = Window_Message.prototype.update
Window_Message.prototype.update = function() {
    Alias.Window_Message_update.call(this)
    this.updateFaceWindowAnimation()
}

Window_Message.prototype.updateFaceWindowAnimation = function() {
    if(this._faceWindowAnimationState === "idle"){
        this.updateIdleFaceWindow()

    }else if(this._faceWindowAnimationState === "talking"){
        this.updateTalkingFaceWindow()
    }
}

Window_Message.prototype.updateIdleFaceWindow = function(){
    Plugin.getFaceSprite().refreshAnimation(Plugin.getCurrentFaceSettings().middleIndex)
}

Window_Message.prototype.updateTalkingFaceWindow = function(){
    Plugin.getFaceSprite().refreshAnimation(Plugin.getCurrentFaceSettings().endIndex)
}

Alias.Window_Message_loadMessageFace = Window_Message.prototype.loadMessageFace
Window_Message.prototype.loadMessageFace = function(){
    Alias.Window_Message_loadMessageFace.call(this)

    if(Plugin.isFaceWindowEnabled()){
        this._faceBitmap = null
    }
}

Alias.Window_Message_terminateMessage = Window_Message.prototype.terminateMessage
Window_Message.prototype.terminateMessage = function(){
    Alias.Window_Message_terminateMessage.call(this)

    if(this.canHideFaceWindow()){
        Plugin.getFaceWindow().playAnime("reverse")
    }
}

Window_Message.prototype.canHideFaceWindow = function(){
    return  Plugin.isFaceWindowEnabled() && Plugin.getFaceWindow().faceName &&
    ($gameMessage.getInterpreter()?.canHideFaceWindow() || !$gameMessage.getInterpreter())
}

}