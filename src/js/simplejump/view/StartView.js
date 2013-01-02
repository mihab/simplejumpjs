(function() {
    "use strict";

    /**
     * Start view with player button. Dispatches event with type: PLAY_CLICKED
     * @class StartView
     * @extends createjs.Container
     * @constructor
     * @param {createjs.Stage} Stage to add items to
     */

    function StartView(stage) {
        /**
         * Stage to add items to
         * @property _stage
         * @type {createjs.Stage}
         * @private
         */
        this._stage = stage;
        /**
         * Label of button
         * @property _label
         * @type {createjs.Text}
         * @private
         */
        this._label = new createjs.Text("PLAY!", "35px Verdana", "#000000");
        /**
         * Over button shape
         * @property _overShape
         * @type {createjs.Shape}
         * @private
         */
        this._overShape = new createjs.Shape();
        /**
         * Out button shape
         * @property _outShape
         * @type {createjs.Shape}
         * @private
         */
        this._outShape = new createjs.Shape();
        /**
         * Press button shape
         * @property _pressShape
         * @type {createjs.Shape}
         * @private
         */
        this._pressShape = new createjs.Shape();
        /**
         * Event manager to dispatch events
         * @property _eventManager
         * @type {simplejump.EventManager}
         * @private
         */
        this._eventManager = new simplejump.EventManager();
        this.initialize();
        this._setupUI();
    }
    StartView.prototype = new createjs.Container();
    /**
     * Play clicked event type
     * @property PLAY_CLICKED
     * @type {String}
     * @static
     * @final
     */
    StartView.prototype.PLAY_CLICKED = "playClicked";
    /**
     * Returns event manager
     * @method getEventManager
     * @return {simplejump.EventManager} Event manager
     */
    StartView.prototype.getEventManager = function() {
        return this._eventManager;
    };
    /**
     * Sets up the UI
     * @method _setupUI
     * @private
     */
    StartView.prototype._setupUI = function() {
        var that, labelHeight;
        that = this;
        labelHeight = 35;
        this._label.textAlign = "center";
        this._label.textBaseline = "alphabetic";
        this._label.x = this._stage.canvas.width / 2;
        this._label.y = this._stage.canvas.height / 2 - labelHeight / 2 + labelHeight;
        this.addChild(this._label);
        // out
        this._outShape.x = this._label.x - (this._label.getMeasuredWidth() + 40) / 2;
        this._outShape.y = this._stage.canvas.height / 2 - labelHeight / 2;
        this._outShape.graphics.beginFill("#87cefa");
        this._outShape.graphics.drawRect(0, 0, this._label.getMeasuredWidth() + 40, labelHeight + 10);
        // over
        this._overShape.x = this._outShape.x;
        this._overShape.y = this._outShape.y;
        this._overShape.graphics.beginFill("#00bfff");
        this._overShape.graphics.drawRect(0, 0, this._label.getMeasuredWidth() + 40, labelHeight + 10);
        // press
        this._pressShape.x = this._outShape.x;
        this._pressShape.y = this._outShape.y;
        this._pressShape.graphics.beginFill("#1e90ff");
        this._pressShape.graphics.drawRect(0, 0, this._label.getMeasuredWidth() + 40, labelHeight + 10);
        this.onMouseOut = function(event) {
            that.removeChildAt(0);
            that.addChildAt(that._outShape, 0);
        };
        this.onMouseOver = function(event) {
            that.removeChildAt(0);
            that.addChildAt(that._overShape, 0);
        };
        this.onPress = function(event) {
            that.removeChildAt(0);
            that.addChildAt(that._pressShape, 0);
        };
        this.onClick = function(event) {
            that.removeChildAt(0);
            that.addChildAt(that._overShape, 0);
            that._eventManager.dispatchEvent(that.PLAY_CLICKED);
        };
        this.addChildAt(this._outShape, 0);
    };
    window.simplejump = window.simplejump || {};
    window.simplejump.view = window.simplejump.view || {};
    window.simplejump.view.StartView = function(stage) {
        return new StartView(stage);
    };
}());