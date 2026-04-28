// ==================================================
// Cae_CustomTextCodes.js
// ==================================================

/**
 * @file Cae_CustomTextCodes.js (RMMZ)
 * Define custom message escape sequences with scripted replacers.
 * @author Caethyril
 * @version 1.2
 */

//#region Plugin header
/*:
 * @target MZ
 * @plugindesc v1.2 - Define custom text codes with scripted effects.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/index.php?threads/caethyrils-mz-plugins.125657/
 *
 * @help Features:
 *   Define new text codes (a.k.a. escape sequences) via plugin parameters.
 *   Text codes are things like \V[x], \C[x], \I[x], etc.
 *   They are treated differently compared to normal text.
 *
 *   Custom text codes are defined in the plugin parameters.
 *   A text code comprises several parts.
 *   This plugin refers to these parts as follows:
 *    -      label: identifies the sequence type (case-insensitive).
 *                  Use letters a-z and/or A-Z for this.
 *                  The code can be more than one character long.
 *             e.g. the V in \V[x]
 *             e.g. TINT in \TINT[a,b,c,d,e]
 *    -  arguments: refine the result based on these values.
 *                  Separate multiple arguments with a comma.
 *             e.g. the x in \V[x]
 *             e.g. the x and y in \A<x,y>
 *    - delimiters: signal the start/end of the arguments section.
 *             e.g. []
 *             e.g. <>
 *    -   replacer: determines the text code's effect.
 *                  This is JavaScript! See below for examples~
 *                  Evaluated in the current window's context.
 *                  Matched arguments are an array: args[1], args[2], etc.
 *                  All arguments are in string format, so convert if needed.
 *
 *   "Convert" codes are replaced before the message starts.
 *     - default examples: \V[x], \N[x], \P[x], \G
 *   "Process" codes are replaced when they would be displayed.
 *     - default examples: \C[x], \I[x], \!, \$
 *
 *   Note: custom convert codes will be processed after the default ones.
 *
 *   See the default plugin parameter values for example codes~
 *
 * Caution: you can mess things up by putting codes one after another, e.g.
 *         \G\N[1] --> \GHarold --> (no such code!) --> (blank)
 *    You can stop this by putting a zero-width space (U+200B) in-between. ^_^
 *    Be careful, though...zero-width spaces are difficult to spot. o_o'
 *
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Terms of use:
 *   This plugin is free to use and/or modify, under these conditions:
 *     - None of the original plugin header is removed.
 *     - Credit is given to Caethyril for the original work.
 *
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Compatibility:
 *   Aliases:   Window_Base:
 *                convertEscapeCharacters, processEscapeCharacter
 *   This plugin does not add data to save files.
 *
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Changelog:
 *   v1.2 (2023-10-02): Process codes now have textState (updated examples).
 *                      NB: textState.drawing is false when measuring text.
 *                      Code is now slightly more robust & readable.
 *   v1.1 (2020-08-30): Removed console outputs from testing phase.
 *   v1.0 (2020-08-21): Initial release! Rewrite of RMMV version.
 *
 * @param Convert Text Codes
 * @type struct<TextCodeType>[]
 * @desc A list of codes that get replaced before the message starts.
 * @default ["{\"Label\":\"hi\",\"Arguments\":\"[]\",\"Delimiters\":\"[]\",\"Separator\":\",\",\"Replacer\":\"// Random greeting!\\n// Example: \\\\hi\\nconst hi = ['Hi','Hey','Hello','Greetings','Welcome'];\\nconst r = Math.randomInt(hi.length);\\nreturn hi[r] + ' ' + $gameParty.leader().name();\"}","{\"Label\":\"nick\",\"Arguments\":\"[\\\"Integer\\\"]\",\"Delimiters\":\"[]\",\"Separator\":\",\",\"Replacer\":\"// Actor nickname!\\n// Example: \\\\nick[1]\\nconst actorId = parseInt(args[1], 10);\\nreturn $gameActors.actor(actorId).nickname();\"}","{\"Label\":\"rep\",\"Arguments\":\"[\\\"Text\\\",\\\"Integer\\\"]\",\"Delimiters\":\"[]\",\"Separator\":\",\",\"Replacer\":\"// Repetition!\\n// Example: a\\\\rep[ya,5]\\nlet res = '';\\nconst txt = args[1] || '';\\nconst num = parseInt(args[2], 10) || 0;\\nfor (let n = num; n > 0; n--) res += txt;\\nreturn res;\"}"]
 *
 * @param Process Text Codes
 * @type struct<TextCodeType>[]
 * @desc A list of codes that get processed when the message reaches that point.
 * @default ["{\"Label\":\"se\",\"Arguments\":\"[\\\"Text\\\",\\\"Integer\\\"]\",\"Delimiters\":\"[]\",\"Separator\":\",\",\"Replacer\":\"// Play a sound!\\n// Example: \\\\se[Buzzer1, 20]\\nconst se = {};\\nse.name = args[1];\\nse.volume = parseInt(args[2], 10);\\nse.pitch = 100;\\nse.pan = 0;\\nAudioManager.playSe(se);\"}","{\"Label\":\"tint\",\"Arguments\":\"[\\\"Integer\\\",\\\"Integer\\\",\\\"Integer\\\",\\\"Integer\\\",\\\"Integer\\\"]\",\"Delimiters\":\"[]\",\"Separator\":\",\",\"Replacer\":\"// Tint the screen!\\n// Example: \\\\tint[-20,-20,-20,0,30]\\nargs = args.map(a => parseInt(a, 10));  // text -> number\\nconst tone = args.slice(1, 5);          // r, g, b, grey\\nconst duration = args[5];               // frames\\n$gameScreen.startTint(tone, duration);\"}","{\"Label\":\"wait\",\"Arguments\":\"[\\\"Integer\\\"]\",\"Delimiters\":\"[]\",\"Separator\":\",\",\"Replacer\":\"// Wait x frames!\\n// Example: \\\\wait[60]\\nthis.startWait(parseInt(args[1], 10));\"}","{\"Label\":\"ce\",\"Arguments\":\"[\\\"Integer\\\"]\",\"Delimiters\":\"[]\",\"Separator\":\",\",\"Replacer\":\"// Run a common event!\\n// Example: \\\\ce[1]\\nconst ev = $dataCommonEvents[parseInt(args[1], 10)];\\nif (ev) {\\n  const pt = SceneManager._scene instanceof Scene_Map ?\\n         $gameMap._interpreter : $gameTroop._interpreter;\\n  const id = pt.isOnCurrentMap() ? pt.eventId() : 0;\\n  pt.setupChild(ev.list, id);\\n}\"}"]
 */
// =========================
/*~struct~TextCodeType:
 * @param Label
 * @type string
 * @desc The part that appears after the \
 * E.g. the V in \V[x].
 * @default
 *
 * @param Arguments
 * @type combo[]
 * @option Integer
 * @option Text
 * @desc A list of the argument types for this text code.
 * Accepts custom regex (capturing parentheses will be added).
 * @default
 *
 * @param Delimiters
 * @type combo
 * @option []
 * @option <>
 * @option {}
 * @option ()
 * @option
 * @desc The brackets enclosing the arguments.
 * Ignored if there are no arguments.
 * @default []
 *
 * @param Separator
 * @type combo
 * @option ,
 * @option :
 * @option |
 * @desc String expected between successive arguments, if any. Cannot use a space. Will default to a comma if left blank.
 * @default ,
 *
 * @param Replacer
 * @text JS: Replacer
 * @type multiline_string
 * @desc JavaScript function evaluated when the text code is matched.
 * @default return;
 */
//#endregion Plugin Header

(() => {
'use strict';

    const NAMESPACE   = 'CustomTextCodes';
    const PLUGIN_NAME = 'Cae_' + NAMESPACE;
    const ERR_PRE     = PLUGIN_NAME + '.js ';
    const ERR_NOPARAM = ERR_PRE + 'could not find its parameters!\nCheck the plugin file is named correctly and try again.';

    const REGX_SPC = '\\s*';        // Optional* \spacing
    const ZERO_SPC = '\u200b';      // Zero-width space

    window.CAE ||= {};              // Author namespace

    (($, U) => {

        Object.defineProperty($, 'VERSION', { value: 1.2 });    // Version declaration
        window.Imported ||= {};                                 // Import namespace
        Imported[PLUGIN_NAME] = $.VERSION;                      // Import declaration

    // ======== Parameter stuff ======== //

        $.params = PluginManager.parameters(PLUGIN_NAME);
        if (!Object.keys($.params).length) {
            SceneManager.showDevTools();
            throw new Error(ERR_NOPARAM);
        };

        /** Regular expression arguments. */
        $.rxFlags = 'gi';

        /**
         * Returns a replacer function given the function body.
         * @param {{Label:string,Arguments:string[],Delimiters:string,Separator:string,Replacer:string}} p - plugin parameter in object format.
         * @returns {Function} Replacer function
         */
        $.mkFunc = function(p, hasTextState = false) {
            if (hasTextState)
                return new Function('textState', '...args', p.Replacer);
            return new Function('...args', p.Replacer);
        };

        /**
         * @param {string} s Input string.
         * @returns {string} String escaped for use in constructing a regular expression.
         */
        $.escapeRegExp = function(s) {
            return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };

        /**
         * Parses string properties of input plugin parameter object as appropriate.
         * @param {{Label:string,Arguments:string,Delimiters:string,Separator:string,Replacer:string}} p - plugin parameter: object with string properties.
         */
        $.parseParam = function(p) {
            p.Label = p.Label.trim();
            p.Arguments = JSON.parse(p.Arguments || '[]').map(a => {
                switch(a.toUpperCase()) {
                    case 'INTEGER': return '[\\-]?\\d+';    // optional minus sign
                    case 'TEXT':    return '.*?';           // non-greedy match
                    default:        return a;
                }
            });
            p.Delimiters = p.Delimiters.trim();
            p.Separator = REGX_SPC + $.escapeRegExp(
                String(p.Separator || '').trim() || ','
            );
        };

        /**
         * @param {String} delims - String of up to two characters: opening and closing argument delimiters
         * @param {Boolean} isOpening - True iff should retrieve opening delimiter
         * @returns {String} Opening or closing delimiter character, else an empty string.
         */
        $.rxDelim = function(delims = '', isOpening = false) {
            return '\\' + delims[isOpening ? 0 : 1] || '';
        };

        // String-forming methods for regular expression generation
        $.mkRegExp = {
            /**
             * @param {{Label:string,Arguments:string[],Delimiters:string,Separator:string,Replacer:string}} p - plugin parameter in object format.
             * @returns {String} Regular expression string for matching the arguments (a.k.a. escape params) of this text code.
             */
            args: function(p) {
                let res = '';
                if (Array.isArray(p.Arguments) && p.Arguments.length) {
                    res += $.rxDelim(p.Delimiters, true);
                    res += REGX_SPC;
                    p.Arguments.forEach((arg, ix) => {
                        res += '(' + arg + ')';
                        if (ix + 1 < p.Arguments.length) res += p.Separator;
                        res += REGX_SPC;
                    });
                    res += $.rxDelim(p.Delimiters, false);
                }
                return res;
            },
            /**
             * @param {{Label:String,Arguments:String[],Delimiters:String,Separator:String,Replacer:String}} p - plugin parameter in object format.
             * @returns {String} Regular expression string for matching this text code.
             */
            full: function(p) {
                let res = '\x1b' + p.Label;
                res += $.mkRegExp.args(p);    // remote map method, do not use "this"
                return res;
            }
        };

        // Main string -> internal object parameter parsers/generators
        $.extractParam = {
            /**
             * Parses given parameter name (common to both params).
             * @param {String} pName - Parameter name
             * @returns {{codes:{Label:String,Arguments:String[],Delimiters:String,Separator:String,Replacer:String},replx:Function[]}} Text code data
             */
            comm: function(pName, isProc = false) {
                let o = {};
                o.codes = JSON.parse($.params[pName] || '[]').map(JSON.parse);
                o.codes.forEach($.parseParam);
                o.replx = o.codes.map(c => $.mkFunc(c, isProc));
                return o;
            },
            /**
             * Parses convert type text code parameter.
             * @param {String} pName - Parameter name
             * @returns {{codes:{Label:String,Arguments:String[],Delimiters:String,Separator:String,Replacer:String},replx:Function[],regex:String[]}} Text code data
             */
            conv: function(pName) {
                let o = this.comm(pName, false);
                o.regex = o.codes.map($.mkRegExp.full);
                return o;
            },
            /**
             * Parses process type text code parameter.
             * @param {String} pName - Parameter name
             * @returns {{codes:{Label:String,Arguments:String[],Delimiters:String,Separator:String,Replacer:String},replx:Function[],regex:String[]}} Text code data
             */
            proc: function(pName) {
                let o = this.comm(pName, true);
                o.regex = o.codes.map($.mkRegExp.args);
                return o;
            }
        };

        /**
         * Stores custom "convert" escape codes.
         * @type {Object}
         */
        $.c = $.extractParam.conv('Convert Text Codes');

        /**
         * Stores custom "process" escape codes.
         * @type {Object}
         */
        $.r = $.extractParam.proc('Process Text Codes');

    // ========== Alterations ========== //

        $.alias = $.alias || {};        // This plugin's alias namespace

        // Patch - convert custom escape sequences (before display).
        void (alias => {
            Window_Base.prototype.convertEscapeCharacters = function(text) {
                let res = alias.apply(this, arguments);
                $.c.codes.forEach(function(o, ix) {
                    res = res.replace(
                        new RegExp($.c.regex[ix], $.rxFlags),
                        $.c.replx[ix].bind(this)
                    );
                }, this);
                return res;
            };
        })($.alias.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters);

        // Patch - process custom escape sequences (during display).
        void (alias => {
            Window_Base.prototype.processEscapeCharacter = function(code, textState) {
                const ix = $.r.codes.findIndex(o => code.toUpperCase() === o.Label.toUpperCase());
                if (ix >= 0) {
                    let arr = [];
                    const rgx = $.r.regex[ix];
                    if (rgx) {
                        const rx = new RegExp('^' + rgx, $.rxFlags);
                        arr = rx.exec(textState.text.slice(textState.index)) || [''];
                        textState.index += arr[0].length;
                    }
                    $.r.replx[ix].call(this, textState, ...arr);
                } else alias.apply(this, arguments);
            };
        })($.alias.Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter);

    })(CAE[NAMESPACE] = CAE[NAMESPACE] || {}, CAE.Utils = CAE.Utils || {});

})();
