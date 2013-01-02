(function() {
    "use strict";

    /**
     * Main player class that moves around the screen. Dispatches events with type: PLAYER_MOVED, PLAYER_FALLING, JUMP_COMPLETE
     * @class Player
     * @extends {createjs.Container}
     * @constructor
     * @param {simplejump.game.PlayerSettings} playerSettings Settings of player
     */

    function Player(playerSettings) {
        var that = this;
        /**
         * Settings of player
         * @property _playerSettings
         * @type {simplejump.game.PlayerSettings}
         * @private
         */
        this._playerSettings = playerSettings;
        /**
         * Event manager to dispatch events
         * @property _eventManager
         * @type {simplejump.EventManager}
         * @private
         */
        this._eventManager = new simplejump.EventManager();
        /**
         * Time jump started
         * @property _jumpStartTime
         * @type {Number}
         * @private
         */
        this._jumpStartTime = 0;
        /**
         * Y coordinate of player when the jump started
         * @property _jumpStartY
         * @type {Number}
         * @private
         */
        this._jumpStartY = 0;
        /**
         * Whether the player is currently moving up or down
         * @property _up
         * @type {Boolean}
         * @private
         */
        this._up = false;
        /**
         * Whether left key is down
         * @property _leftDown
         * @type {Boolean}
         * @private
         */
        this._leftDown = false;
        /**
         * Whether right key is down
         * @property _rightDown
         * @type {Boolean}
         * @private
         */
        this._rightDown = false;
        /**
         * Time either the left key or right key were pushed down
         * @property _timeDown
         * @type {Number}
         * @private
         */
        this._timeDown = 0;
        /**
         * X coordinate the player was the either the left or the right key was pushed down
         * @property _xDown
         * @type {Number}
         * @private
         */
        this._xDown = 0;
        /**
         * Last player move
         * @property _lastPlayerMove
         * @type {simplejump.PlayerMovew}
         * @private
         */
        this._lastPlayerMove = null;
        this.initialize();
        this.drawPlayer();
        window.onkeydown = function(event) {
            that._handleKeyDown(event);
        };
        window.onkeyup = function(event) {
            that._handleKeyUp(event);
        };
    }
    Player.prototype = new createjs.Container();
    /**
     * Player moved event type
     * @property PLAYER_MOVED
     * @type {String}
     * @static
     * @final
     */
    Player.prototype.PLAYER_MOVED = "playerMoved";
    /**
     * Player falling event type
     * @property PLAYER_FALLING
     * @type {String}
     * @static
     * @final
     */
    Player.prototype.PLAYER_FALLING = "playerFalling";
    /**
     * Jump complete event type
     * @property JUMP_COMPLETE
     * @type {String}
     * @static
     * @final
     */
    Player.prototype.JUMP_COMPLETE = "jumpComplete";
    /**
     * Draws the player box
     * @method drawPlayer
     */
    Player.prototype.drawPlayer = function() {
        this.removeAllChildren();
        var shape = new createjs.Shape();
        shape.graphics.beginFill(this._playerSettings.playerColor);
        shape.graphics.drawRect(0, 0, this._playerSettings.playerWidth, this._playerSettings.playerHeight);
        this.addChild(shape);
    };
    /**
     * Starts a jump from the current player Y-coordinate
     * @method jump
     */
    Player.prototype.jump = function() {
        this._jumpStartY = this.y;
        this._up = true;
        this._jumpStartTime = createjs.Ticker.getTime();
        createjs.Ticker.addListener(this);
    };
    /**
     * Stops the jump, leaving the player at the current Y coordinates
     * @method stopJump
     */
    Player.prototype.stopJump = function() {
        createjs.Ticker.removeListener(this);
    };
    /**
     * Gets the last player move
     * @method getLastPlayerMove
     * @return {simplejump.game.PlayerMove} Last player move
     */
    Player.prototype.getLastPlayerMove = function() {
        return this._lastPlayerMove;
    };
    /**
     * Returns event manager
     * @method getEventManager
     * @return {simplejump.EventManager} Event manager
     */
    Player.prototype.getEventManager = function() {
        return this._eventManager;
    };
    /**
     * Return player settings
     * @method getPlayerSettings
     * @return {simplejump.game.PlayerSettings} Player Settings
     */
    Player.prototype.getPlayerSettings = function() {
        return this._playerSettings;
    };
    /**
     * Cleans up/removes all event listeners
     * @method cleanup
     */
    Player.prototype.cleanup = function() {
        createjs.Ticker.removeListener(this);
        window.onkeydown = null;
        window.onkeyup = null;
    };
    /**
     * Main loop which moves the player both on the X and Y coordinates
     * @method tick
     */
    Player.prototype.tick = function() {
        var jumpComplete, currentTime, time, lastX, lastY, newX;
        jumpComplete = false;
        currentTime = createjs.Ticker.getTime();
        time = currentTime - this._jumpStartTime;
        lastX = this.x;
        lastY = this.y;
        if (time < this._playerSettings.jumpDuration) {
            if (this._up) {
                if (time >= this._playerSettings.jumpDuration / 2) {
                    this.y = this._jumpStartY + this._playerSettings.jumpHeight;
                    this._up = !this._up;
                }
            }
            // Simple jump animation based on a quad ease
            if (this._up) {
                this.y = this._jumpStartY + this._quadEaseOut(time, 0, this._playerSettings.jumpHeight, this._playerSettings.jumpDuration / 2);
            } else {
                this.y = (this._jumpStartY + this._playerSettings.jumpHeight) - this._quadEaseIn(time - this._playerSettings.jumpDuration / 2, 0, this._playerSettings.jumpHeight, this._playerSettings.jumpDuration / 2);
            }
        } else {
            this.y = this._jumpStartY;
            this._up = !this._up;
            this._jumpStartTime = createjs.Ticker.getTime();
            jumpComplete = true;
        }
        // HANDLE KEYBOARD MOVE
        if (this._rightDown) {
            time = currentTime - this._timeDown;
            newX = (time * this._playerSettings.jumpDistance) / this._playerSettings.jumpDuration + this._xDown;
            if (newX + this._playerSettings.playerWidth >= this._playerSettings.maximumDistance) {
                newX = this._playerSettings.maximumDistance - this._playerSettings.playerWidth;
            }
            this.x = newX;
        }
        if (this._leftDown) {
            time = currentTime - this._timeDown;
            newX = this._xDown - (time * this._playerSettings.jumpDistance) / this._playerSettings.jumpDuration;
            if (newX <= 0) {
                newX = 0;
            }
            this.x = newX;
        }
        // DISPATCH EVENTS
        this._lastPlayerMove = new simplejump.game.PlayerMove(lastX, this.x, lastY, this.y);
        this._eventManager.dispatchEvent(this.PLAYER_MOVED);
        if (!this._up) {
            this._eventManager.dispatchEvent(this.PLAYER_FALLING);
        }
        if (jumpComplete) {
            this._eventManager.dispatchEvent(this.JUMP_COMPLETE);
        }
    };
    /**
     * Simple quad ease in used for player falling
     * @method _quadEaseIn
     * @private
     * @param t {Number}
     * @param b {Number}
     * @param c {Number}
     * @param d {Number}
     * @return {Number}
     */
    Player.prototype._quadEaseIn = function(t, b, c, d) {
        return c * (t /= d) * t + b;
    };
    /**
     * Simple quad ease out used for player falling raising
     * @method _quadEaseOut
     * @private
     * @param t {Number}
     * @param b {Number}
     * @param c {Number}
     * @param d {Number}
     * @return {Number}
     */
    Player.prototype._quadEaseOut = function(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    Player.prototype._handleKeyDown = function(event) {
        // right
        if (event.keyCode === 39) {
            if (!this._rightDown) {
                this._leftDown = false;
                this._rightDown = true;
                this._timeDown = createjs.Ticker.getTime();
                this._xDown = this.x;
            }
        }
        // left
        if (event.keyCode === 37) {
            if (!this._leftDown) {
                this._rightDown = false;
                this._leftDown = true;
                this._timeDown = createjs.Ticker.getTime();
                this._xDown = this.x;
            }
        }
    };
    /**
     * Key down handler, starts to move player if left or right key is pressed
     * @method _handleKeyUp
     * @private
     * @param event {Object} Event object
     */
    Player.prototype._handleKeyUp = function(event) {
        // right
        if (event.keyCode === 39) {
            this._rightDown = false;
        }
        // left
        if (event.keyCode === 37) {
            this._leftDown = false;
        }
    };
    window.simplejump = window.simplejump || {};
    window.simplejump.game = window.simplejump.game || {};
    window.simplejump.game.Player = function(playerSettings) {
        return new Player(playerSettings);
    };
}());