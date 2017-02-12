"use strict";
var InputSetOn = (function () {
    function InputSetOn(subject) {
        this.subject = subject;
    }
    InputSetOn.prototype.receive = function () {
        this.subject.state = true;
    };
    return InputSetOn;
}());
exports.InputSetOn = InputSetOn;
var InputSetOff = (function () {
    function InputSetOff(subject) {
        this.subject = subject;
    }
    InputSetOff.prototype.receive = function () {
        this.subject.state = false;
    };
    return InputSetOff;
}());
exports.InputSetOff = InputSetOff;
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
var InputSetFromValue = (function () {
    function InputSetFromValue(subject) {
        this.subject = subject;
    }
    InputSetFromValue.prototype.receive = function (value) {
        if (value === true || value === 1) {
            this.subject.state = true;
        }
        else if (value === false || value === 0) {
            this.subject.state = false;
        }
    };
    return InputSetFromValue;
}());
exports.InputSetFromValue = InputSetFromValue;
