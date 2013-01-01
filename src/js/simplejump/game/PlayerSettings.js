(function() {
    "use strict";

    /**
     * Contains the Player settings
     * @class PlayerSettings
     * @constructor
     */

    function PlayerSettings() {}
    /**
     * Duration of one player jump in miliseconds
     * @static jumpDuration
     * @type {Number}
     */
    PlayerSettings.prototype.jumpDuration = 2000;
    /**
     * Vertical distance in pixels of one player jump
     * @static jumpHeight
     * @type {Number}
     */
    PlayerSettings.prototype.jumpHeight = 200;
    /**
     * Horizontal distance in pixels of one player jump
     * @static jumpDistance
     * @type {Number}
     */
    PlayerSettings.prototype.jumpDistance = 200;
    /**
     * Player width
     * @static playerWidth
     * @type {Number}
     */
    PlayerSettings.prototype.playerWidth = 50;
    /**
     * Player height
     * @static playerHeight
     * @type {Number}
     */
    PlayerSettings.prototype.playerHeight = 50;
    /**
     * Color of player box
     * @static playerColor
     * @type {String}
     */
    PlayerSettings.prototype.playerColor = "#000000";
    /**
     * Maximum horizontal distance the player can move (from 0)
     * @static maximumDistance
     * @type {Number}
     */
    PlayerSettings.prototype.maximumDistance = 500;
    window.simplejump = window.simplejump || {};
    window.simplejump.game = window.simplejump.game || {};
    window.simplejump.game.PlayerSettings = function() {
        return new PlayerSettings();
    };
}());