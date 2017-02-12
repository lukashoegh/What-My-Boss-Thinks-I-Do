"use strict";
var Input_1 = require("./Input");
var LightInputs;
(function (LightInputs) {
    LightInputs[LightInputs["On"] = 0] = "On";
    LightInputs[LightInputs["Off"] = 1] = "Off";
    LightInputs[LightInputs["Toggle"] = 2] = "Toggle";
    LightInputs[LightInputs["FromValue"] = 3] = "FromValue";
})(LightInputs = exports.LightInputs || (exports.LightInputs = {}));
var Light = (function () {
    function Light(initialState) {
        if (initialState === void 0) { initialState = false; }
        this.initialState = initialState;
        this.inputs = [
            new Input_1.InputOn(this),
            new Input_1.InputOff(this),
            new Input_1.InputToggle(this),
            new Input_1.InputFromValue(this)
        ];
        this.state = initialState;
    }
    Light.prototype.reset = function () {
        this.state = this.initialState;
    };
    return Light;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Light;
