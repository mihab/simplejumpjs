(function() {
    "use strict";
    /**
     * Contains the platform settings
     * @class PlatformSettings
     * @constructor
     */

    function PlatformSettings() {}
    /**
     * Width of platform
     * @static platformWidth
     * @type {Number}
     */
    PlatformSettings.prototype.platformWidth = 100;
    /**
     * Height of platform
     * @static platformHeight
     * @type {Number}
     */
    PlatformSettings.prototype.platformHeight = 5;
    /**
     * Color of platform box
     * @static platformColor
     * @type {Number}
     */
    PlatformSettings.prototype.platformColor = "#6b8e23";
    window.simplejump = window.simplejump || {};
    window.simplejump.game = window.simplejump.game || {};
    window.simplejump.game.PlatformSettings = function() {
        return new PlatformSettings();
    };
}());