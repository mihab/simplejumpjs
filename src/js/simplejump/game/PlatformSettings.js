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
     * @property platformWidth
     * @type {Number}
     * @static
     * @final
     */
    PlatformSettings.prototype.platformWidth = 100;
    /**
     * Height of platform
     * @property platformHeight
     * @type {Number}
     * @static
     * @final
     */
    PlatformSettings.prototype.platformHeight = 5;
    /**
     * Color of platform box
     * @property platformColor
     * @type {Number}
     * @static
     * @final
     */
    PlatformSettings.prototype.platformColor = "#6b8e23";
    window.simplejump = window.simplejump || {};
    window.simplejump.game = window.simplejump.game || {};
    window.simplejump.game.PlatformSettings = function() {
        return new PlatformSettings();
    };
}());