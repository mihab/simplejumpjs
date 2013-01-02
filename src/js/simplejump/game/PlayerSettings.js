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
     * @property jumpDuration
     * @type {Number}
     * @static
     * @final
     */
    PlayerSettings.prototype.jumpDuration = 2000;
    /**
     * Vertical distance in pixels of one player jump
     * @property jumpHeight
     * @type {Number}
     * @static
     * @final
     */
    PlayerSettings.prototype.jumpHeight = 200;
    /**
     * Horizontal distance in pixels of one player jump
     * @property jumpDistance
     * @type {Number}
     * @static
     * @final
     */
    PlayerSettings.prototype.jumpDistance = 200;
    /**
     * Player width
     * @property playerWidth
     * @type {Number}
     * @static
     * @final
     */
    PlayerSettings.prototype.playerWidth = 50;
    /**
     * Player height
     * @property playerHeight
     * @type {Number}
     * @static
     * @final
     */
    PlayerSettings.prototype.playerHeight = 50;
    /**
     * Color of player box
     * @property playerColor
     * @type {String}
     * @static
     * @final
     */
    PlayerSettings.prototype.playerColor = "#000000";
    /**
     * Maximum horizontal distance the player can move (from 0)
     * @property maximumDistance
     * @type {Number}
     * @static
     * @final
     */
    PlayerSettings.prototype.maximumDistance = 500;
    window.simplejump = window.simplejump || {};
    window.simplejump.game = window.simplejump.game || {};
    window.simplejump.game.PlayerSettings = function() {
        return new PlayerSettings();
    };
}());