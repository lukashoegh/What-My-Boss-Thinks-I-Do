import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import Toggle from "../src/Toggle";
import Input from '../src/Input';
import { ToggleInputs, ToggleOutputs } from '../src/Toggle';
import Connection from '../src/Connection';

chai.use(sinonChai);
chai.should();

let toggle: Toggle;
let stubInput: Input;
let inputSpy: sinon.SinonSpy;

describe("Toggle", function () {
    beforeEach(function () {
        toggle = new Toggle();
        stubInput = { receive: (value: any) => { } };
        inputSpy = sinon.spy(stubInput, "receive");
    });

    it("The initial state of a toggle can be accessed using state", function () {
        toggle.state.should.equal(false);
        toggle = new Toggle(true);
        toggle.state.should.equal(true);
    });

    it("When the toggle input is called with any value, the toggle changes value", function () {
        toggle.inputs[ToggleInputs.Toggle].receive(false);
        toggle.state.should.equal(true);
        toggle.inputs[ToggleInputs.Toggle].receive(5);
        toggle.state.should.equal(false);
        toggle.inputs[ToggleInputs.Toggle].receive('test');
        toggle.state.should.equal(true);
    });

    it("When a toggle is reset, it returns to its initial value", function () {
        toggle.inputs[ToggleInputs.Toggle].receive(false);
        toggle.state.should.equal(true);
        toggle.reset();
        toggle.state.should.equal(false);
        toggle = new Toggle(true);
        toggle.inputs[ToggleInputs.Toggle].receive(1);
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
        let testConnection: Connection = {
            output: ToggleOutputs.Toggle,
            input: stubInput
        }
        toggle.registerConnection(testConnection);
        inputSpy.should.not.have.been.called;
        toggle.toggle();
        inputSpy.should.have.been.calledWith(true);
    });

    it("Register a connection to the on output. Whenever the toggle is toggled to on, the connection is triggered without a value", function () {
        let testConnection: Connection = {
            output: ToggleOutputs.On,
            input: stubInput
        }
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
        let testConnection: Connection = {
            output: ToggleOutputs.Off,
            input: stubInput
        }
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
        let testConnection: Connection = {
            output: ToggleOutputs.Toggle,
            input: stubInput
        }
        toggle.registerConnection(testConnection);
        toggle.inputs[ToggleInputs.On].receive();
        inputSpy.should.not.have.been.called;
    });
});