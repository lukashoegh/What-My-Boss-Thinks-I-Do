"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var Toggle_1 = require("../src/Toggle");
var Toggle_2 = require("../src/Toggle");
chai.use(sinonChai);
chai.should();
var toggle;
var stubInput;
var inputSpy;
describe("Toggle", function () {
    beforeEach(function () {
        toggle = new Toggle_1.default();
        stubInput = { receive: function (value) { } };
        inputSpy = sinon.spy(stubInput, "receive");
    });
    it("The initial state of a toggle can be accessed using state", function () {
        toggle.state.should.equal(false);
        toggle = new Toggle_1.default(true);
        toggle.state.should.equal(true);
    });
    it("When the toggle input is called with any value, the toggle changes value", function () {
        toggle.inputs[Toggle_2.ToggleInputs.Toggle].receive(false);
        toggle.state.should.equal(true);
        toggle.inputs[Toggle_2.ToggleInputs.Toggle].receive(5);
        toggle.state.should.equal(false);
        toggle.inputs[Toggle_2.ToggleInputs.Toggle].receive('test');
        toggle.state.should.equal(true);
    });
    it("When a toggle is reset, it returns to its initial value", function () {
        toggle.inputs[Toggle_2.ToggleInputs.Toggle].receive(false);
        toggle.state.should.equal(true);
        toggle.reset();
        toggle.state.should.equal(false);
        toggle = new Toggle_1.default(true);
        toggle.inputs[Toggle_2.ToggleInputs.Toggle].receive(1);
        toggle.reset();
        toggle.state.should.equal(true);
    });
    it("When a toggle is toggled, it changes value", function () {
        toggle.toggle();
        toggle.state.should.equal(true);
        toggle.toggle();
        toggle.state.should.equal(false);
    });
    it("Register a connection to the toggle output. Whenever the toggle is toggled, the current state should be sent along the connection", function () {
        var testConnection = {
            output: Toggle_2.ToggleOutputs.Toggle,
            input: stubInput
        };
        toggle.registerConnection(testConnection);
        inputSpy.should.not.have.been.called;
        toggle.toggle();
        inputSpy.should.have.been.calledWith(true);
    });
    it("Register a connection to the on output. Whenever the toggle is toggled to on, the connection is triggered without a value", function () {
        var testConnection = {
            output: Toggle_2.ToggleOutputs.On,
            input: stubInput
        };
        toggle.registerConnection(testConnection);
        inputSpy.should.not.have.been.called;
        toggle.toggle();
        inputSpy.should.have.been.called;
        toggle.toggle();
        inputSpy.should.have.been.calledOnce;
        toggle.toggle();
        inputSpy.should.have.been.calledTwice;
    });
    it("Register a connection to the off output. Whenever the toggle is toggled to off, the connection is triggered without a value", function () {
        var testConnection = {
            output: Toggle_2.ToggleOutputs.Off,
            input: stubInput
        };
        toggle.registerConnection(testConnection);
        inputSpy.should.not.have.been.called;
        toggle.toggle();
        inputSpy.should.not.have.been.called;
        toggle.toggle();
        inputSpy.should.have.been.called;
        toggle.toggle();
        inputSpy.should.have.been.calledOnce;
        toggle.toggle();
        inputSpy.should.have.been.calledTwice;
    });
    it("Connections should not be triggered, when a toggle occurs as a retult of receiving an input", function () {
        var testConnection = {
            output: Toggle_2.ToggleOutputs.Toggle,
            input: stubInput
        };
        toggle.registerConnection(testConnection);
        toggle.inputs[Toggle_2.ToggleInputs.On].receive();
        inputSpy.should.not.have.been.called;
    });
});
