(function() {
    "use strict";

    /**
     * Final view that displays the game results. Dispatches event with type: BACK_TO_START_CLICKED
     * @class EndView
     * @extends {createjs.Container}
     * @constructor
     * @param {createjs.Stage} Stage to add items to
     */

    function EndView(stage) {
        /**
         * Stage to add items to
         * @property _stage
         * @type {createjs.Stage}
         * @private
         */
        this._stage = stage;
        /**
         * Event manager to dispatch events
         * @property _eventManager
         * @type {EventManager}
         * @private
         */
        this._eventManager = new simplejump.EventManager();
        /**
         * Label of button
         * @property _label
         * @type {createjs.Text}
         * @private
         */
        this._label = new createjs.Text("BACK TO START", "35px Verdana", "#000000");
        /**
         * Result text
         * @property _resultTxt
         * @type {createjs.Text}
         * @private
         */
        this._resultTxt = new createjs.Text("Game Over.", "35px Verdana", "#000000");
        /**
         * Score text
         * @property _scoreTxt
         * @type {createjs.Text}
         * @private
         */
        this._scoreTxt = new createjs.Text("Final Score:", "35px Verdana", "#000000");
        /**
         * Out button shape
         * @property _outShape
         * @type {createjs.Shape}
         * @private
         */
        this._outShape = new createjs.Shape();
        /**
         * Over button shape
         * @property _overShape
         * @type {createjs.Shape}
         * @private
         */
        this._overShape = new createjs.Shape();
        /**
         * Press button shape
         * @property _pressShape
         * @type {createjs.Shape}
         * @private
         */
        this._pressShape = new createjs.Shape();
        this.initialize();
        this._setupUI();
    }
    EndView.prototype = new createjs.Container();
    /**
     * Back to start event type
     * @property BACK_TO_START_CLICKED
     * @type {String}
     * @static
     * @final
     */
    EndView.prototype.BACK_TO_START_CLICKED = "backToStartClicked";
    /**
     * Set whether the player won or lost along with the final score
     * @method setResult
     * @param {Boolean} won Whether Player won or lost
     * @param {Number} score Final player score
     */
    EndView.prototype.setResult = function(won, score) {
        if (won) {
            this._resultTxt.text = "Game Over. You Won!";
        } else {
            this._resultTxt.text = "Game Over. You Lost!";
        }
        this._scoreTxt.text = "Final Score: " + score;
    };
    /**
     * Returns event manager
     * @method getEventManager
     * @return {EventManager} Event manager
     */
    EndView.prototype.getEventManager = function() {
        return this._eventManager;
    };
    /**
     * Sets up the UI
     * @method _setupUI
     * @private
     */
    EndView.prototype._setupUI = function() {
        var that, labelHeight;
        labelHeight = 35;
        that = this;
        this._resultTxt.textAlign = "center";
        this._resultTxt.textBaseline = "alphabetic";
        this._resultTxt.x = this._stage.canvas.width / 2;
        this.addChild(this._resultTxt);
        this._scoreTxt.textAlign = "center";
        this._scoreTxt.textBaseline = "alphabetic";
        this._scoreTxt.x = this._stage.canvas.width / 2;
        this.addChild(this._scoreTxt);
        this._label.textAlign = "center";
        this._label.textBaseline = "alphabetic";
        this._label.x = this._stage.canvas.width / 2;
        this._resultTxt.y = canvas.height / 2 - 75 + labelHeight;
        this._scoreTxt.y = canvas.height / 2 - 25 + labelHeight;
        this._label.y = this._stage.canvas.height / 2 + 25 + labelHeight;
        this.addChild(this._label);
        // out
        this._outShape.x = this._label.x - (this._label.getMeasuredWidth() + 40) / 2;
        this._outShape.y = this._stage.canvas.height / 2 + 25;
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
            that._eventManager.dispatchEvent(that.BACK_TO_START_CLICKED);
        };
        this.addChildAt(this._outShape, 0);
    };
    window.simplejump = window.simplejump || {};
    window.simplejump.view = window.simplejump.view || {};
    window.simplejump.view.EndView = function(stage) {
        return new EndView(stage);
    };
}());