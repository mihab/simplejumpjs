(function() {
    /**
     * GameView class that creates the game and displays it. Dispatches event with type: GAME_OVER
     * @class GameView
     * @extends createjs.Container
     * @constructor
     * @param {createjs.Stage} Stage to add items to
     */

    function GameView(stage) {
        /**
         * Event manager to dispatch events
         * @property _eventManager
         * @type {EventManager}
         * @private
         */
        this._eventManager = new simplejump.EventManager();
        /**
         * Game instance
         * @property _game
         * @type {Game}
         * @private
         */
        this._game = null;
        /**
         * Whether player won or lost the game
         * @property _playerWon
         * @type {Boolean}
         * @private
         */
        this._playerWon = false;
        /**
         * Final score the player achieved
         * @property _finalScore
         * @type {Number}
         * @private
         */
        this._finalScore = 0;
        this.initialize();
    }
    GameView.prototype = new createjs.Container();
    /**
     * Game over event type
     * @property GAME_OVER
     * @type {String}
     * @static
     * @final
     */
    GameView.prototype.GAME_OVER = "gameOver";
    /**
     * Starts the game
     * @method startGame
     */
    GameView.prototype.startGame = function() {
        var that = this;
        this._game = new simplejump.game.Game();
        this.addChild(this._game);
        this._game.getEventManager().addListener(this._game.GAME_OVER, function() {
            that._gameOver();
        });
    };
    /**
     * Whether player won or lost
     * @method getPlayerWon
     * @return {Boolean} Whether player won or lost
     */
    GameView.prototype.getPlayerWon = function() {
        return this._playerWon;
    };
    /**
     * Get final score
     * @method getFinalScore
     * @return {Number} Final score of player
     */
    GameView.prototype.getFinalScore = function() {
        return this._finalScore;
    };
    /**
     * Returns event manager
     * @method getEventManager
     * @return {EventManager} Event manager
     */
    GameView.prototype.getEventManager = function() {
        return this._eventManager;
    };
    /**
     * Game over handler
     * @method _gameOver
     * @private
     */
    GameView.prototype._gameOver = function() {
        this.removeChild(this._game);
        this._playerWon = this._game.getPlayerWon();
        this._finalScore = this._game.getFinalScore();
        this._eventManager.dispatchEvent(this.GAME_OVER);
    };
    window.simplejump = window.simplejump || {};
    window.simplejump.view = window.simplejump.view || {};
    window.simplejump.view.GameView = function(stage) {
        return new GameView(stage);
    };
}());