"use strict";
var chai = require("chai");
var Light_1 = require("../src/Light");
var Light_2 = require("../src/Light");
chai.should();
var light;
describe("Light", function () {
    beforeEach(function () {
        light = new Light_1.default();
    });
    it("The initial state of a light can be accessed using state", function () {
        light.state.should.equal(false);
        light = new Light_1.default(true);
        light.state.should.equal(true);
    });
    it("When a light is reset, it returns to its initial value", function () {
        light.inputs[Light_2.LightInputs.Toggle].receive(false);
        light.state.should.equal(true);
        light.reset();
        light.state.should.equal(false);
        light = new Light_1.default(true);
        light.inputs[Light_2.LightInputs.Toggle].receive(1);
        light.reset();
        light.state.should.equal(true);
    });
    describe("Inputs", function () {
        it("When the Toggle input is called with any value, the light changes value", function () {
            light.inputs[Light_2.LightInputs.Toggle].receive(false);
            light.state.should.equal(true);
            light.inputs[Light_2.LightInputs.Toggle].receive(5);
            light.state.should.equal(false);
            light.inputs[Light_2.LightInputs.Toggle].receive('test');
            light.state.should.equal(true);
        });
        it("When the On input is called, the light turns on", function () {
            light.inputs[Light_2.LightInputs.On].receive();
            light.state.should.equal(true);
        });
        it("When the Off input is called, the light turns off", function () {
            light = new Light_1.default(true);
            light.inputs[Light_2.LightInputs.Off].receive();
            light.state.should.equal(false);
        });
        it("When the FromValue input is called with true or 1 as value, the light turns on", function () {
            light.inputs[Light_2.LightInputs.FromValue].receive(true);
            light.state.should.equal(true);
            light.inputs[Light_2.LightInputs.Off].receive();
            light.inputs[Light_2.LightInputs.FromValue].receive(1);
            light.state.should.equal(true);
        });
        it("When the FromValue input is called with false or 0 as value, the light turns off", function () {
            light.inputs[Light_2.LightInputs.On].receive();
            light.inputs[Light_2.LightInputs.FromValue].receive(false);
            light.state.should.equal(false);
            light.inputs[Light_2.LightInputs.On].receive();
            light.inputs[Light_2.LightInputs.FromValue].receive(0);
            light.state.should.equal(false);
        });
    });
});
