(function() {
    "use strict";

    /**
     * Settings of level
     * @class LevelSettings
     * @constructor
     */

    function LevelSettings() {}
    /**
     * Width of level
     * @property levelWidth
     * @type {Number}
     * @static
     * @final
     */
    LevelSettings.prototype.levelWidth = 500;
    /**
     * Height of level
     * @property levelHeight
     * @type {Number}
     * @static
     * @final
     */
    LevelSettings.prototype.levelHeight = 3000;
    /**
     * Color of level background
     * @property levelColor
     * @type {String}
     * @static
     * @final
     */
    LevelSettings.prototype.levelColor = "#e0ffff";
    /**
     * Points to add when a player successfully jumps on a platform
     * @property platformScorePoints
     * @type {Number}
     * @static
     * @final
     */
    LevelSettings.prototype.platformScorePoints = 10;
    window.simplejump = window.simplejump || {};
    window.simplejump.game = window.simplejump.game || {};
    window.simplejump.game.LevelSettings = function() {
        return new LevelSettings();
    };
}());