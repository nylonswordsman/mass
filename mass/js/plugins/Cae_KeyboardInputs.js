// ==================================================
// Cae_KeyboardInputs.js
// ==================================================

/**
 * @file Cae_KeyboardInputs.js (RMMZ)
 * Bind common events to keys and define new key inputs.
 * @author Caethyril
 * @version 1.0
 */

//#region Plugin header
/*:
 * @target MZ
 * @plugindesc v1.0 - Bind common events to keys and define new key inputs.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/index.php?threads/caethyrils-mz-plugins.125657/
 * 
 * @help Features:
 *   - Configure some aspects of the Input system.
 *   - Optionally extend the range of recognised keyboard inputs.
 *   - Optionally bind a common event to each button.
 *     Bound events will trigger when:
 *      - The button trigger condition is met,
 *      - The player is on the map scene, and
 *      - No non-parallel event is currently running.
 *     Available triggers:
 *      - Press:   when the button is pressed down (and wasn't last frame)
 *      - Repeat:  every 6 frames while held (configurable)
 * 
 *   This plugin only handles keyboard inputs.
 * 
 * Original keys (code - key = "name"):
 *       9 - tab      = "tab"             |  40 - down     = "down"
 *      13 - enter    = "ok"              |  45 - insert   = "escape"
 *      16 - shift    = "shift"           |  81 - Q        = "pageup"
 *      17 - control  = "control"         |  87 - W        = "pagedown"
 *      18 - alt      = "control"         |  88 - X        = "escape"
 *      27 - escape   = "escape"          |  90 - Z        = "ok"
 *      32 - space    = "ok"              |  96 - numpad 0 = "escape"
 *      33 - pageup   = "pageup"          |  98 - numpad 2 = "down"
 *      34 - pagedown = "pagedown"        | 100 - numpad 4 = "left"
 *      37 - left     = "left"            | 102 - numpad 6 = "right"
 *      38 - up       = "up"              | 104 - numpad 8 = "up"
 *      39 - right    = "right"           | 120 - F9       = "debug"
 *
 *   Debug mode (Enable Debug plugin parameter) can help to identify key codes.
 * 
 * Script calls:
 *   You can use the existing functions for checking the status of new inputs:
 *    - Input.isTriggered(keyName)
 *        True iff named key is pressed down this frame and wasn't last frame
 *    - Input.isPressed(keyName)
 *        True iff named key is currently pressed down
 *    - Input.isRepeated(keyName)
 *        True every [repeat] frames after [repeatWait] that it is held down
 *   Remember to input keyName as a string, e.g. Input.isTriggered('bomb')
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Terms of use:
 *   This plugin is free to use and/or modify, under these conditions:
 *     - None of the original plugin header is removed.
 *     - Credit is given to Caethyril for the original work.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Compatibility:
 *   Aliases:   Scene_Map:
 *                update
 *   Defines:   1 new property on Input.keyMapper per custom input key
 *   This plugin does not add data to save files.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Changelog:
 *   v1.0 (2020-08-27): Initial release!
 * 
 * @param New Inputs
 * @type struct<KeyMapperType>[]
 * @desc List of new key codes/names to register in the game's key mapper.
 * @default ["{\"Code\":\"65\",\"Name\":\"a\"}","{\"Code\":\"66\",\"Name\":\"b\"}","{\"Code\":\"67\",\"Name\":\"c\"}","{\"Code\":\"68\",\"Name\":\"d\"}","{\"Code\":\"69\",\"Name\":\"e\"}","{\"Code\":\"70\",\"Name\":\"f\"}","{\"Code\":\"71\",\"Name\":\"g\"}","{\"Code\":\"72\",\"Name\":\"h\"}","{\"Code\":\"73\",\"Name\":\"i\"}","{\"Code\":\"74\",\"Name\":\"j\"}","{\"Code\":\"75\",\"Name\":\"k\"}","{\"Code\":\"76\",\"Name\":\"l\"}","{\"Code\":\"77\",\"Name\":\"m\"}","{\"Code\":\"78\",\"Name\":\"n\"}","{\"Code\":\"79\",\"Name\":\"o\"}","{\"Code\":\"80\",\"Name\":\"p\"}","{\"Code\":\"81\",\"Name\":\"q\"}","{\"Code\":\"82\",\"Name\":\"r\"}","{\"Code\":\"83\",\"Name\":\"s\"}","{\"Code\":\"84\",\"Name\":\"t\"}","{\"Code\":\"85\",\"Name\":\"u\"}","{\"Code\":\"86\",\"Name\":\"v\"}","{\"Code\":\"87\",\"Name\":\"w\"}","{\"Code\":\"88\",\"Name\":\"x\"}","{\"Code\":\"89\",\"Name\":\"y\"}","{\"Code\":\"90\",\"Name\":\"z\"}"]
 * 
 * @param Event Binds
 * @type struct<EventBindType>[]
 * @desc List of key binds.
 * @default []
 * 
 * @param Key Repeat Wait
 * @type number
 * @desc The time to wait between pressing a button and processing its repeat interval. Default: 24 frames.
 * @default 24
 * 
 * @param Key Repeat Interval
 * @type number
 * @desc The time between successive "repeat" triggers.
 * Default: 6 frames
 * @default 6
 * 
 * @param --- Advanced ---
 * @type select
 * @desc Advanced internal configuration options.
 * 
 * @param Enable Debug
 * @parent --- Advanced ---
 * @type boolean
 * @desc If true, will log currently-pressed keyCode to console (F8) when a button is pressed. Only enabled during playtest.
 * @default false
 * 
 * @param Preserve Original Keys
 * @parent --- Advanced ---
 * @type boolean
 * @desc If true, will not assign keyMapper entries to key codes that already exist there. Recommended!
 * @default true
 */
// =========================
/*~struct~KeyMapperType:
 * @param Code
 * @type number
 * @min 1
 * @desc The key code, used to identify the game input.
 * @default
 * 
 * @param Name
 * @type string
 * @desc The name of this key, used to map the key to an effect.
 * (Does not have to be unique.)
 * @default
 */
// =========================
/*~struct~EventBindType:
 * @param Name
 * @type string
 * @desc The button name.
 * @default
 * 
 * @param Event
 * @type common_event
 * @desc The ID of the common event bound to this button.
 * @default
 * 
 * @param Trigger
 * @type combo
 * @option Press
 * @option Repeat
 * @desc The button action to trigger the bound event.
 * See this plugin's help section for more details.
 * @default Press
 */
//#endregion

(() => {
'use strict';

    const NAMESPACE   = 'KeyboardInputs';
    const PLUGIN_NAME = 'Cae_' + NAMESPACE;
    const ERR_PRE     = PLUGIN_NAME + '.js ';
    const ERR_NOPARAM = ERR_PRE + 'could not find its parameters!\nCheck the plugin file is named correctly and try again.';

    window.CAE = window.CAE || {};      // Author namespace

    (($, U) => {

        Object.defineProperty($, 'VERSION', { value: 1.0 });    // Version declaration
        window.Imported = window.Imported || {};                // Import namespace
        Imported[PLUGIN_NAME] = $.VERSION;                      // Import declaration

    // ======== Utility (share) ======== //
    // ======== Parameter stuff ======== //

        void (p => {

            if (!p) { SceneManager.showDevTools(); throw new Error(ERR_NOPARAM); };
        
            $._parseObjArr = function(name, k) {
                const arr = JSON.parse(p[name]).map(JSON.parse);
                arr.forEach(o => o[k] = parseInt(o[k], 10) || 0);
                return arr.filter(o => o[k] > 0);
            };

            $.newInputs = $._parseObjArr('New Inputs', 'Code');
            $.eventBinds = $._parseObjArr('Event Binds', 'Event');
            $.keyRepeatWait = parseInt(p['Key Repeat Wait'], 10) || 0;
            $.keyRepeatInterval = parseInt(p['Key Repeat Interval'], 10) || 0;
            Object.defineProperty($, 'SAVE_PROP', { value: String(p['Save Property Name'] || '').trim() || PLUGIN_NAME });

            $.debug = (p['Enable Debug'] === 'true') && Utils.isNwjs() && Utils.isOptionValid("test");
            $.preserve = p['Preserve Original Keys'] === 'true';

        })($.params = PluginManager.parameters(PLUGIN_NAME));

    // ========= Init Routines ========= //

        /** Applies plugin parameter values to Input. */
        $._applyKeyRepeatValues = function() {
            Input.keyRepeatWait = $.keyRepeatWait;
            Input.keyRepeatInterval = $.keyRepeatInterval;
        };
        $._applyKeyRepeatValues();

        /** Applies plugin parameter values to keyMapper. */
        $._applyNewInputs = function() {
            $.newInputs.forEach(o => {
                if (!Input.keyMapper[o.Code] || !$.preserve) {
                    Input.keyMapper[o.Code] = o.Name;
                }
            });
        };
        $._applyNewInputs();

        $.binds = Object.create(null);
        /** Reformats plugin parameter into internal object for convenience. */
        $._populateBinds = function() {
            $.eventBinds.forEach(o => {
                $.binds[o.Name] = $.binds[o.Name] || {};
                $.binds[o.Name][o.Trigger] = o.Event;
            });
        };
        $._populateBinds();

    // ======== Utility (local) ======== //

        /**
         * Call a common event via this plugin's input handling.
         * @param {Number} eventId - Common event ID to call
         */
        $.callEvent = function(eventId) { return $gameTemp.reserveCommonEvent(eventId); };

        /**
         * @param {String} keyName - Name of key
         * @param {String} trigger - Trigger name: Press or Repeat
         * @returns {Number} The event ID bound to this key & trigger, else undefined.
         */
        $.getButtonTrigger = function(keyName, trigger) {
            const res = $.binds[keyName]?.[trigger];
            return res ? res : undefined;
        };

        /**
         * @param {String} keyName - Name of key
         * @param {String} trigger - Trigger name: Press or Repeat
         * @returns {Boolean} True iff the key currently meets the given trigger condition.
         */
        $.checkInput = function(keyName, trigger) {
            switch (trigger) {
                case 'Press': return Input.isTriggered(keyName);
                case 'Repeat': return Input.isRepeated(keyName);
            }
            return;
        };

        /** List of all key bind triggers available; used for polling. */
        $.bindTriggers = ['Press', 'Repeat'];

        /** Check each bound input for each bound key and trigger result as appropriate */
        $.pollInput = function() {
            for (const keyName in $.binds) {
                $.bindTriggers.forEach(trigger => {
                    const eventId = $.getButtonTrigger(keyName, trigger);
                    if (eventId) {
                        const triggered = $.checkInput(keyName, trigger);
                        if (triggered) $.callEvent(eventId);
                    }
                });
            }
        };

    // ======== Plugin Commands ======== //
    // ============ Extends ============ //
    // ========== Alterations ========== //

        $.alias = $.alias || {};        // This plugin's alias namespace

        // Alias! Check for relevant button inputs each frame.
        void (alias => {
            Scene_Map.prototype.update = function() {
                $.pollInput();
                alias.apply(this, arguments);
            };
        })($.alias.Scene_Map_update = Scene_Map.prototype.update);

        // Alias! For debug output.
        void (alias => { if (!$.debug) return;
            SceneManager.showDevTools();
            console.log(ERR_PRE + 'debug mode active!');
            Input._onKeyDown = function(event) {
                console.log('Pressed key code: ' + event.keyCode);
                alias.apply(this, arguments);
            };
        })($.alias.Input_onKeyDown = Input._onKeyDown);

    })(CAE[NAMESPACE] = CAE[NAMESPACE] || {}, CAE.Utils = CAE.Utils || {});

})();