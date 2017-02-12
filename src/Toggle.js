"use strict";
var Input_1 = require("./Input");
var Output_1 = require("./Output");
var ToggleInputs;
(function (ToggleInputs) {
    ToggleInputs[ToggleInputs["On"] = 0] = "On";
    ToggleInputs[ToggleInputs["Off"] = 1] = "Off";
    ToggleInputs[ToggleInputs["Toggle"] = 2] = "Toggle";
    ToggleInputs[ToggleInputs["FromValue"] = 3] = "FromValue";
})(ToggleInputs = exports.ToggleInputs || (exports.ToggleInputs = {}));
var ToggleOutputs;
(function (ToggleOutputs) {
    ToggleOutputs[ToggleOutputs["On"] = 0] = "On";
    ToggleOutputs[ToggleOutputs["Off"] = 1] = "Off";
    ToggleOutputs[ToggleOutputs["Toggle"] = 2] = "Toggle";
})(ToggleOutputs = exports.ToggleOutputs || (exports.ToggleOutputs = {}));
var Toggle = (function () {
    function Toggle(initialState) {
        if (initialState === void 0) { initialState = false; }
        this.initialState = initialState;
        this.inputs = [
            new Input_1.InputOn(this),
            new Input_1.InputOff(this),
            new Input_1.InputToggle(this),
            new Input_1.InputFromValue(this)
        ];
        this.outputs = [
            new Output_1.OutputOn(this),
            new Output_1.OutputOff(this),
            new Output_1.OutputToggle(this)
        ];
        this.connections = [];
        this.state = initialState;
    }
    Toggle.prototype.reset = function () {
        this.state = this.initialState;
    };
    Toggle.prototype.toggle = function () {
        this.state = !this.state;
        this.triggerOutputs();
    };
    Toggle.prototype.triggerOutputs = function () {
        for (var _i = 0, _a = this.connections; _i < _a.length; _i++) {
            var con = _a[_i];
            this.outputs[con.output].sendTo(con.input);
        }
    };
    Toggle.prototype.registerConnection = function (con) {
        this.connections.push(con);
    };
    return Toggle;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Toggle;
