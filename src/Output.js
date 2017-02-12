"use strict";
var OutputWhenOn = (function () {
    function OutputWhenOn(subject) {
        this.subject = subject;
    }
    OutputWhenOn.prototype.sendTo = function (input) {
        if (this.subject.state == true)
            input.receive();
    };
    return OutputWhenOn;
}());
exports.OutputWhenOn = OutputWhenOn;
var OutputWhenOff = (function () {
    function OutputWhenOff(subject) {
        this.subject = subject;
    }
    OutputWhenOff.prototype.sendTo = function (input) {
        if (this.subject.state == false)
            input.receive();
    };
    return OutputWhenOff;
}());
exports.OutputWhenOff = OutputWhenOff;
var OutputWhenToggled = (function () {
    function OutputWhenToggled(subject) {
        this.subject = subject;
    }
    OutputWhenToggled.prototype.sendTo = function (input) {
        input.receive(this.subject.state);
    };
    return OutputWhenToggled;
}());
exports.OutputWhenToggled = OutputWhenToggled;
