(function() {
    "use strict";

    /**
     * Platform class that draws a single platform and check for intersects with player moves with it
     * @class Platform
     * @extends {createjs.Container}
     * @constructor {simplejump.game.PlayerSettings} playerSettings Settings of player
     */

    function Platform(platformSettings) {
        /**
         * Settings of player
         * @property _playerSettings
         * @type {simplejump.game.PlayerSettings}
         * @private
         */
        this._platformSettings = platformSettings;
        this.initialize();
        this.drawPlatform();
    }
    Platform.prototype = new createjs.Container();
    /**
     * Draws the platform rectangle
     * @method drawPlatform
     */
    Platform.prototype.drawPlatform = function() {
        this.removeAllChildren();
        var shape = new createjs.Shape();
        shape.graphics.beginFill(this._platformSettings.platformColor);
        shape.graphics.drawRect(0, 0, this._platformSettings.platformWidth, this._platformSettings.platformHeight);
        this.addChild(shape);
    };
    /**
     * Checks whether the last PlayerMove intersected with this platform
     * @method checkIntersects
     * @param player {simplejump.game.Player} Player instance
     * @returns {Boolean} Whether the last player move intersected with this platform
     */
    Platform.prototype.checkInteresects = function(player) {
        var playerMove, A, B, E, F;
        playerMove = player.getLastPlayerMove();
        A = new createjs.Point(Math.round(this.x), Math.round(this.y + this._platformSettings.platformHeight));
        B = new createjs.Point(Math.round(this.x + this._platformSettings.platformWidth), Math.round(this.y + this._platformSettings.platformHeight));
        E = new createjs.Point(Math.round(playerMove.fromX), Math.round(playerMove.fromY));
        F = new createjs.Point(Math.round(playerMove.toX), Math.round(playerMove.toY));
        if (this._lineIntersectLine(A, B, E, F)) {
            return true;
        }
        E = new createjs.Point(Math.round(playerMove.fromX + player.getPlayerSettings().playerWidth), Math.round(playerMove.fromY));
        F = new createjs.Point(Math.round(playerMove.toX + player.getPlayerSettings().playerWidth), Math.round(playerMove.toY));
        if (this._lineIntersectLine(A, B, E, F)) {
            return true;
        }
        return false;
    };
    /**
     * Checks whether two line segments intersect
     * @method _lineIntersectLine
     * @private
     * @param A {createjs.Point}
     * @param B {createjs.Point}
     * @param E {createjs.Point}
     * @param F {createjs.Point}
     * @returns {Boolean} Whether lines intersect
     */
    Platform.prototype._lineIntersectLine = function(A, B, E, F) {
        var ip, a1, a2, b1, b2, c1, c2, denom;
        a1 = B.y - A.y;
        b1 = A.x - B.x;
        c1 = B.x * A.y - A.x * B.y;
        a2 = F.y - E.y;
        b2 = E.x - F.x;
        c2 = F.x * E.y - E.x * F.y;
        denom = a1 * b2 - a2 * b1;
        if (denom === 0) {
            return false;
        }
        ip = new createjs.Point();
        ip.x = (b1 * c2 - b2 * c1) / denom;
        ip.y = (a2 * c1 - a1 * c2) / denom;
        if (Math.pow(ip.x - B.x, 2) + Math.pow(ip.y - B.y, 2) > Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2)) {
            return false;
        }
        if (Math.pow(ip.x - A.x, 2) + Math.pow(ip.y - A.y, 2) > Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2)) {
            return false;
        }

        if (Math.pow(ip.x - F.x, 2) + Math.pow(ip.y - F.y, 2) > Math.pow(E.x - F.x, 2) + Math.pow(E.y - F.y, 2)) {
            return false;
        }
        if (Math.pow(ip.x - E.x, 2) + Math.pow(ip.y - E.y, 2) > Math.pow(E.x - F.x, 2) + Math.pow(E.y - F.y, 2)) {
            return false;
        }
        return true;
    };
    window.simplejump = window.simplejump || {};
    window.simplejump.game = window.simplejump.game || {};
    window.simplejump.game.Platform = function(platformSettings) {
        return new Platform(platformSettings);
    };
}());