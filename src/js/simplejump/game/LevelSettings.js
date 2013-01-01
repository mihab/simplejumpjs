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
     * @static levelWidth
     * @type {Number}
     */
    LevelSettings.prototype.levelWidth = 500;
    /**
     * Height of level
     * @static levelHeight
     * @type {Number}
     */
    LevelSettings.prototype.levelHeight = 3000;
    /**
     * Color of level background
     * @static levelColor
     * @type {String}
     */
    LevelSettings.prototype.levelColor = "#e0ffff";
    /**
     * Points to add when a player successfully jumps on a platform
     * @static platformScorePoints
     * @type {Number}
     */
    LevelSettings.prototype.platformScorePoints = 10;
    window.simplejump = window.simplejump || {};
    window.simplejump.game = window.simplejump.game || {};
    window.simplejump.game.LevelSettings = function() {
        return new LevelSettings();
    };
}());