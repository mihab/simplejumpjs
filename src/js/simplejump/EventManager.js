(function() {
    "use strict";

    /**
     * Simple event dispatching class
     * @class EventManager
     * @constructor
     */

    function EventManager() {
        /**
         * Array of all listeners
         * @property _listeners
         * @type {Array}
         * @private
         */
        this._listeners = [];
    }

    /**
     * Add a listener for an event
     * @method addListener
     * @param {String} type Type of listener
     * @param {Function} fn Function callback
     */
    EventManager.prototype.addListener = function(type, fn) {
        var exists, i, l;
        exists = false;
        for (i = 0, l = this._listeners.length; i < l; i++) {
            if (this._listeners[i].type === type && this._listeners[i].fn === fn) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            this._listeners.push({
                type: type,
                fn: fn
            });
        }
    };
    /**
     * Removes a listener for an event
     * @method removeListener
     * @param {String} type Type of listener
     * @param {Function} fn Function callback
     */
    EventManager.prototype.removeListener = function(type, fn) {
        var exists, i, l;
        exists = false;
        for (i = 0, l = this._listeners.length; i < l; i++) {
            if (this._listeners[i].type === type && this._listeners[i].fn === fn) {
                exists = true;
                break;
            }
        }
        if (exists) {
            this._listeners.splice(i, 1);
        }
    };
    /**
     * Dispatch event type to all subscribed listeners
     * @method dispatchEvent
     * @param {String} type Event type to dispatch
     */
    EventManager.prototype.dispatchEvent = function(type) {
        var i, l;
        for (i = 0, l = this._listeners.length; i < l; i++) {
            if (this._listeners[i].type === type) {
                this._listeners[i].fn();
            }
        }

    };
    window.simplejump = window.simplejump || {};
    window.simplejump.EventManager = function() {
        return new EventManager();
    };
}());