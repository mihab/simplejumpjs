(function() {
    "use strict";

    /**
     * Main game class that creates the level and scoreboard. Dispatches event with type: GAME_OVER
     * @class Game
     * @extends createjs.Container
     * @constructor
     */

    function Game() {
        /**
         * Event manager to dispatch events
         * @property _eventManager
         * @type {simplejump.EventManager}
         * @private
         */
        this._eventManager = new simplejump.EventManager();
        /**
         * Settings of player
         * @property _playerSettings
         * @type {simplejump.game.PlayerSettings}
         * @private
         */
        this._playerSettings = new simplejump.game.PlayerSettings();
        /**
         * Settings of platform
         * @property _platformSettings
         * @type {simplejump.game.PlatformSettings}
         * @private
         */
        this._platformSettings = new simplejump.game.PlatformSettings();
        /**
         * Settings of level
         * @property _levelSettings
         * @type {simplejump.game.LevelSettings}
         * @private
         */
        this._levelSettings = new simplejump.game.LevelSettings();
        /**
         * Whether player won or lost
         * @property _playerWon
         * @type {Boolean}
         * @private
         */
        this._playerWon = false;
        /**
         * Level holder so the Level can safely move into negative Y coordinates
         * @property _levelHolder
         * @type {createjs.Container}
         * @private
         */
        this._levelHolder = new createjs.Container();
        /**
         * Level instance
         * @property _level
         * @type {simplejump.game.Level}
         * @private
         */
        this._level = new simplejump.game.Level(this._levelSettings, this._playerSettings, this._platformSettings);
        /**
         * Score board used for displaying the current score
         * @property _scoreboard
         * @type {createjs.Text}
         * @private
         */
        this._scoreBoard = null;
        /**
         * Current player score
         * @property _score
         * @type {Number}
         * @private
         */
        this._score = 0;
        this.initialize();
        this._setupUI();
    }
    /**
     * Game over event type
     * @property GAME_OVER
     * @type {String}
     * @static
     * @final
     */
    Game.prototype.GAME_OVER = "gameOver";
    Game.prototype = new createjs.Container();
    /**
     * Return whether the player won or lost
     * @method getPlayerWon
     * @return {Boolean} Whether player won or lost
     */
    Game.prototype.getPlayerWon = function() {
        return this._playerWon;
    };
    /**
     * Returns the final player score
     * @method getFinalScore
     * @return {Number} Final player score
     */
    Game.prototype.getFinalScore = function() {
        return this._score;
    };
    /**
     * Returns event manager
     * @method getEventManager
     * @return {simplejump.EventManager} Event manager
     */
    Game.prototype.getEventManager = function() {
        return this._eventManager;
    };
    /**
     * Sets up the UI
     * @method _setupUI
     * @private
     */
    Game.prototype._setupUI = function() {
        var that = this;
        this._levelHolder.addChild(this._level);
        this.addChild(this._levelHolder);
        this._levelHolder.y = 50;
        this._drawScoreBoard();
        this._level.getEventManager().addListener(this._level.SCORE_CHANGE, function() {
            that._updateScore();
        });
        this._level.getEventManager().addListener(this._level.GAME_OVER, function() {
            that._gameOver();
        });
    };
    /**
     * Draws the score board
     * @method _drawScoreBoard
     * @private
     */
    Game.prototype._drawScoreBoard = function() {
        this._scoreBoard = new createjs.Text("Score : 0", "35px Verdana", "#000000");
        this._scoreBoard.textAlign = "center";
        this._scoreBoard.textBaseline = "alphabetic";
        this._scoreBoard.x = this._levelSettings.levelWidth / 2;
        this._scoreBoard.y = 35;
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#afffff");
        shape.graphics.drawRect(0, 0, this._levelSettings.levelWidth, 50);
        this.addChild(shape);
        this.addChild(this._scoreBoard);
    };
    /**
     * Game over handler. Dispatches appropriate event
     * @method _gameOver
     * @private
     */
    Game.prototype._gameOver = function() {
        this._level.cleanup();
        this._playerWon = this._level.getPlayerWon();
        this._score = this._level.getScore();
        this._eventManager.dispatchEvent(this.GAME_OVER);
    };
    /**
     * Updates the score board when the player score changes
     * @method _updateScore
     * @private
     */
    Game.prototype._updateScore = function() {
        this._score = this._level.getScore();
        this._scoreBoard.text = "Score : " + this._score.toString();
    };
    window.simplejump = window.simplejump || {};
    window.simplejump.game = window.simplejump.game || {};
    window.simplejump.game.Game = function() {
        return new Game();
    };
}());