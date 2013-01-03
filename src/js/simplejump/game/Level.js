(function() {
    "use strict";

    /**
     * Level game class that contains the player and platform. Dispatches events with type: GAME_OVER, SCORE_CHANGE
     * @class Level
     * @extends createjs.Container
     * @constructor
     * @param {LevelSettings} levelSettings Settings of level
     * @param {PlayerSettings} playerSettings Settings of player
     * @param {PlatformSettings} platformSettings Settings of platform
     */

    function Level(levelSettings, playerSettings, platformSettings) {
        /**
         * Event manager to dispatch events
         * @property _eventManager
         * @type {EventManager}
         * @private
         */
        this._eventManager = new simplejump.EventManager();
        /**
         * Settings of level
         * @property _levelSettings
         * @type {LevelSettings}
         * @private
         */
        this._levelSettings = levelSettings;
        /**
         * Settings of player
         * @property _playerSettings
         * @type {PlayerSettings}
         * @private
         */
        this._playerSettings = playerSettings;
        /**
         * Settings of platform
         * @property _platformSettings
         * @type {PlatformSettings}
         * @private
         */
        this._platformSettings = platformSettings;
        /**
         * Array containing all the platform in ascending (Y) order
         * @property _platforms
         * @type {Array}
         * @private
         */
        this._platforms = [];
        /**
         * Player instance
         * @property _player
         * @type {Player}
         * @private
         */
        this._player = null;
        /**
         * Y coordinate of camera when it started moving
         * @property _cameraStartY
         * @type {Number}
         * @private
         */
        this._cameraStartY = 0;
        /**
         * Y coordinate where camera should move
         * @property _cameraEndY
         * @type {Number}
         * @private
         */
        this._cameraEndY = 0;
        /**
         * Time of camera move start
         * @property _cameraStartTime
         * @type {Number}
         * @private
         */
        this._cameraStartTime = 0;
        /**
         * Whether player won or lost
         * @property _playerWon
         * @type {Boolean}
         * @private
         */
        this._playerWon = false;
        /**
         * Last platform the player jumped on
         * @property _lastPlatform
         * @type {Platform}
         * @private
         */
        this._lastPlatform = null;
        /**
         * Player score
         * @property _score
         * @type {Number}
         * @private
         */
        this._score = 0;
        this.initialize();
        this._generatePlatforms();
        this._addPlayer();
    }
    Level.prototype = new createjs.Container();
    /**
     * Game over event type
     * @property GAME_OVER
     * @type {String}
     * @static
     * @final 
     */
    Level.prototype.GAME_OVER = "gameOver";
    /**
     * Score change event type
     * @property SCORE_CHANGE
     * @type {String}
     * @static
     * @final
     */
    Level.prototype.SCORE_CHANGE = "scoreChange";
    /**
     * Return whether the player won or lost
     * @method getPlayerWon
     * @return {Boolean} Whether player won or lost
     */
    Level.prototype.getPlayerWon = function() {
        return this._playerWon;
    };
    /**
     * Returns the player score
     * @method getScore
     * @return {Number} Player score
     */
    Level.prototype.getScore = function() {
        return this._score;
    };
    /**
     * Returns event manager
     * @method getEventManager
     * @return {EventManager} Event manager
     */
    Level.prototype.getEventManager = function() {
        return this._eventManager;
    };
    /**
     * Cleans up/removes all event listeners
     * @method cleanup
     */
    Level.prototype.cleanup = function() {
        createjs.Ticker.removeListener(this);
        this._player.cleanup();
    };
    /**
     * Simple camera animation to follow the player
     * @method tick
     */
    Level.prototype.tick = function() {
        var currentTime, time, duration, newY;
        currentTime = createjs.Ticker.getTime();
        time = currentTime - this._cameraStartTime;
        duration = this._playerSettings.jumpDuration / 2;
        if (time < duration) {
            // Simple linear easing
            newY = this._cameraStartY + this._linear(time, 0, this._cameraEndY - this._cameraStartY, duration);
            this.y = -newY;
        } else {
            this.y = -this._cameraEndY;
            createjs.Ticker.removeListener(this);
        }
    };
    /**
     * Configures the player and adds him to the stage
     * @method _addPlayer
     * @private
     */
    Level.prototype._addPlayer = function() {
        var that = this;
        this._player = new simplejump.game.Player(this._playerSettings);
        this.addChild(this._player);
        this._player.x = this._levelSettings.levelWidth / 2 - this._playerSettings.playerWidth / 2;
        this._player.jump();
        this._player.getEventManager().addListener(this._player.PLAYER_FALLING, function() {
            that._playerFalling();
        });
        this._player.getEventManager().addListener(this._player.JUMP_COMPLETE, function() {
            that._jumpComplete();
        });
    };
    /**
     * Randomly generates the platforms
     * @method _generatePlatforms
     * @private
     */
    Level.prototype._generatePlatforms = function() {
        var lastPlatformX, lastPlatformY, platform, end, distance, direction, newX, newY, lastPlatformSettings;
        lastPlatformX = 0;
        lastPlatformY = 0;
        platform = new simplejump.game.Platform(this._platformSettings);
        this._lastPlatform = platform;
        this.addChild(platform);
        this._platforms.push(platform);
        platform.x = lastPlatformX = this._levelSettings.levelWidth / 2 - this._platformSettings.platformWidth / 2;
        end = false;
        while (!end) {
            distance = Math.random() * (this._playerSettings.jumpDistance - this._playerSettings.playerWidth);
            direction = Math.round(Math.random());
            newX = 0;
            if (direction === 0) {
                // left
                newX = lastPlatformX - distance;
                if (newX <= 0) {
                    newX = 0;
                }
            } else {
                // right
                newX = lastPlatformX + distance;
                if (newX + this._platformSettings.platformWidth >= this._levelSettings.levelWidth) {
                    newX = this._levelSettings.levelWidth - this._platformSettings.platformWidth;
                }
            }
            newY = lastPlatformY + Math.random() * (this._playerSettings.jumpHeight - this._playerSettings.playerHeight);
            if (newY - lastPlatformY < this._platformSettings.platformHeight) {
                newY = lastPlatformY + this._platformSettings.platformHeight;
            }
            if (newY >= this._levelSettings.levelHeight - this._platformSettings.platformHeight - this._playerSettings.playerHeight - this._playerSettings.jumpHeight) {
                newY = this._levelSettings.levelHeight - this._platformSettings.platformHeight - this._playerSettings.playerHeight - this._playerSettings.jumpHeight;
                end = true;
            }
            if (end) {
                lastPlatformSettings = new simplejump.game.PlatformSettings();
                lastPlatformSettings.platformColor = this._platformSettings.platformColor;
                lastPlatformSettings.platformHeight = this._platformSettings.platformHeight;
                lastPlatformSettings.platformWidth = this._levelSettings.levelWidth;
                platform = new simplejump.game.Platform(lastPlatformSettings);
                platform.x = 0;
            } else {
                platform = new simplejump.game.Platform(this._platformSettings);
                platform.x = newX;
            }
            this.addChild(platform);
            this._platforms.push(platform);
            platform.y = newY;
            lastPlatformX = newX;
            lastPlatformY = newY;
        }
    };
    /**
     * Handler when player falling. Checks for intersects with platforms
     * @method _playerFalling
     * @private
     */
    Level.prototype._playerFalling = function() {
        var platform = this._checkIntersects();
        if (platform !== null) {
            this._player.y = platform.y + this._platformSettings.platformHeight;
            this._player.jump();
            this._moveCamera();
            this._updateScore(platform);
            this._checkGameOver(platform);
        }
    };
    /**
     * Handler for player jump complete. Checks for game over
     * @method _jumpComplete
     * @private
     */
    Level.prototype._jumpComplete = function() {
        this._checkGameOver(null);
    };
    /**
     * Check if intersects, starting from up to bottom. The first platform that intersects is returned, or null if none intersects
     * @method _checkIntersects
     * @private
     * @return {Platform} Platform or null if no platform intersects
     */
    Level.prototype._checkIntersects = function() {
        var i, platform;
        for (i = this._platforms.length - 1; i >= 0; i--) {
            platform = this._platforms[i];
            if (platform.checkInteresects(this._player)) {
                return platform;
            }
        }
        return null;
    };
    /**
     * Checks for game over. This can be in 2 cases: player reached the end or player missed the platform on jump complete
     * @method _checkGameOver
     * @private
     * @param {Platform} platform Platform that intersects or null
     */
    Level.prototype._checkGameOver = function(platform) {
        if (platform === null) {
            platform = this._checkIntersects();
        }
        if (platform === null) {
            this._eventManager.dispatchEvent(this.GAME_OVER);
            this._player.stopJump();
        } else {
            if (platform === this._platforms[this._platforms.length - 1]) {
                this._playerWon = true;
                this._eventManager.dispatchEvent(this.GAME_OVER);
                this._player.stopJump();
            }
        }
    };
    /**
     * Updates the score when player successfully jumped on a platform and dispatches appropriate event
     * @method _updateScore
     * @private
     * @param {Platform} platform Platform the player intersects with
     */
    Level.prototype._updateScore = function(platform) {
        if (platform !== this._lastPlatform) {
            this._lastPlatform = platform;
            this._score += this._levelSettings.platformScorePoints;
            this._eventManager.dispatchEvent(this.SCORE_CHANGE);
        }
    };
    /**
     * Simple linear easing
     * @method _linear
     * @private
     * @param {Number} t
     * @param {Number} b
     * @param {Number} c
     * @param {Number} d
     * @return {Number}
     */
    Level.prototype._linear = function(t, b, c, d) {
        return c * t / d + b;
    };
    /**
     * Start to move camera
     * @method _moveCamera
     * @private
     */
    Level.prototype._moveCamera = function() {
        this._cameraStartY = -this.y;
        this._cameraEndY = this._player.y - this._platformSettings.platformHeight;
        this._cameraStartTime = createjs.Ticker.getTime();
        createjs.Ticker.addListener(this);
    };
    window.simplejump = window.simplejump || {};
    window.simplejump.game = window.simplejump.game || {};
    window.simplejump.game.Level = function(levelSettings, playerSettings, platformSettings) {
        return new Level(levelSettings, playerSettings, platformSettings);
    };
}());