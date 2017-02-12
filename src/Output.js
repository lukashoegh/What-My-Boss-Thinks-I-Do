"use strict";
var OutputOn = (function () {
    function OutputOn(subject) {
        this.subject = subject;
    }
    OutputOn.prototype.sendTo = function (input) {
        if (this.subject.state == true)
            input.receive();
    };
    return OutputOn;
}());
exports.OutputOn = OutputOn;
var OutputOff = (function () {
    function OutputOff(subject) {
        this.subject = subject;
    }
    OutputOff.prototype.sendTo = function (input) {
        if (this.subject.state == false)
            input.receive();
    };
    return OutputOff;
}());
exports.OutputOff = OutputOff;
var OutputToggle = (function () {
    function OutputToggle(subject) {
        this.subject = subject;
    }
    OutputToggle.prototype.sendTo = function (input) {
        input.receive(this.subject.state);
    };
    return OutputToggle;
}());
exports.OutputToggle = OutputToggle;
