(function() {
    /**
     * Helper class representing one player move
     * @class PlayerMove
     * @constructor
     * @param {Number} fromX From x
     * @param {Number} toX To x
     * @param {Number} fromY From y
     * @param {Number} toY To y
     */

    function PlayerMove(fromX, toX, fromY, toY) {
        /**
         * From x
         * @property fromX
         * @type {Number}
         */
        this.fromX = fromX;
        /**
         * To x
         * @property toX
         * @type {Number}
         */
        this.toX = toX;
        /**
         * From y
         * @property fromY
         * @type {Number}
         */
        this.fromY = fromY;
        /**
         * To y
         * @property toY
         * @type {Number}
         */
        this.toY = toY;
    }
    window.simplejump = window.simplejump || {};
    window.simplejump.game = window.simplejump.game || {};
    window.simplejump.game.PlayerMove = function(fromX, toX, fromY, toY) {
        return new PlayerMove(fromX, toX, fromY, toY);
    };
}());