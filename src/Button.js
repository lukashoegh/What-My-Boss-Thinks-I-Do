"use strict";
var ButtonOutputs;
(function (ButtonOutputs) {
    ButtonOutputs[ButtonOutputs["Press"] = 0] = "Press";
})(ButtonOutputs = exports.ButtonOutputs || (exports.ButtonOutputs = {}));
var Button = (function () {
    function Button() {
        this.outputs = [
            {
                sendTo: function (input) {
                    input.receive();
                }
            }
        ];
        this.connections = [];
    }
    Button.prototype.registerConnection = function (con) {
        this.connections.push(con);
    };
    return Button;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Button;
