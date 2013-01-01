(function() {
    "use strict";

    /**
     * Main class of Simple Jump game
     * @class SimpleJump
     * @constructor
     */

    function SimpleJump() {
        /**
         * LevelSettings to be used with game
         * @property _levelSettings
         * @type {simplejump.LevelSettings}
         * @private
         */
        this._levelSettings = null;
        /**
         * Canvas object to draw the game on
         * @property _canvas
         * @type {Object}
         * @private
         */
        this._canvas = null;
        /**
         * Main stage that holds all other DisplayObjects
         * @property _stage
         * @type {createjs.Stage}
         * @private
         */
        this._stage = null;
        /**
         * Background DisplayObject
         * @property _background
         * @type {createjs.Container}
         * @private
         */
        this._background = null;
        /**
         * Start view
         * @property _startView
         * @type {simplejump.view.StartView}
         * @private
         */
        this._startView = null;
        /**
         * Game view that holds the game
         * @property _canvas
         * @type {simplejump.view.GameView}
         * @private
         */
        this._gameView = null;
        /**
         * Last view that displays the result
         * @property _canvas
         * @type {simplejump.view.EndView}
         * @private
         */
        this._endView = null;
    }

    /**
     * Sets up the simple jump game
     * @method init
     */
    SimpleJump.prototype.init = function() {
        var that = this;
        this._levelSettings = new simplejump.game.LevelSettings();
        this._canvas = document.getElementById("canvas");
        this._canvas.width = this._levelSettings.levelWidth;
        this._canvas.height = window.innerHeight;
        this._canvas.style.marginLeft = (window.innerWidth / 2 - this._canvas.width / 2).toString() + "px";
        createjs.Ticker.setFPS(60);
        createjs.Ticker.useRAF = true;
        this._stage = new createjs.Stage("canvas");
        createjs.Ticker.addListener(this._stage);
        this._background = new createjs.Shape();
        this._background.graphics.beginFill(this._levelSettings.levelColor);
        this._background.graphics.drawRect(0, 0, this._levelSettings.levelWidth, this._canvas.height);
        this._stage.addChild(this._background);
        this._startView = new simplejump.view.StartView(this._stage);
        this._gameView = new simplejump.view.GameView(this._stage);
        this._endView = new simplejump.view.EndView(this._stage);
        this._startView.getEventManager().addListener(this._startView.PLAY_CLICKED, function() {
            that._showGameView();
        });
        this._gameView.getEventManager().addListener(this._gameView.GAME_OVER, function() {
            that._endView.setResult(that._gameView.getPlayerWon(), that._gameView.getFinalScore());
            that._showEndView();
        });
        this._endView.getEventManager().addListener(this._endView.BACK_TO_START_CLICKED, function() {
            that._showStartView();
        });
        this._showStartView();
    };
    /**
     * Shows the start view
     * @method _showStartView
     * @private
     */
    SimpleJump.prototype._showStartView = function() {
        this._stage.removeChild(this._endView);
        this._stage.enableMouseOver(20);
        this._stage.addChild(this._startView);
    };
    /**
     * Shows the game view
     * @method _showGameView
     * @private
     */
    SimpleJump.prototype._showGameView = function() {
        this._stage.removeChild(this._startView);
        this._stage.enableMouseOver(0);
        this._stage.addChild(this._gameView);
        this._gameView.startGame();
    };
    /**
     * Shows the end view
     * @method _showEndView
     * @private
     */
    SimpleJump.prototype._showEndView = function() {
        this._stage.removeChild(this._gameView);
        this._stage.enableMouseOver(20);
        this._stage.addChild(this._endView);
    };
    window.simplejump = window.simplejump || {};
    window.simplejump.SimpleJump = new SimpleJump();
}());