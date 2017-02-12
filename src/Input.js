"use strict";
var InputOn = (function () {
    function InputOn(subject) {
        this.subject = subject;
    }
    InputOn.prototype.receive = function () {
        this.subject.state = true;
    };
    return InputOn;
}());
exports.InputOn = InputOn;
var InputOff = (function () {
    function InputOff(subject) {
        this.subject = subject;
    }
    InputOff.prototype.receive = function () {
        this.subject.state = false;
    };
    return InputOff;
}());
exports.InputOff = InputOff;
var InputToggle = (function () {
    function InputToggle(subject) {
        this.subject = subject;
    }
    InputToggle.prototype.receive = function () {
        this.subject.state = !this.subject.state;
    };
    return InputToggle;
}());
exports.InputToggle = InputToggle;
var InputFromValue = (function () {
    function InputFromValue(subject) {
        this.subject = subject;
    }
    InputFromValue.prototype.receive = function (value) {
        if (value === true || value === 1) {
            this.subject.state = true;
        }
        else if (value === false || value === 0) {
            this.subject.state = false;
        }
    };
    return InputFromValue;
}());
exports.InputFromValue = InputFromValue;
