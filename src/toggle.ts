import Input from './Input';
import Output from './Output';
import Connection from './Connection';
import Control from './Control';
import { InputOn, InputOff, InputToggle, InputFromValue } from './Input';
import { OutputOn, OutputOff, OutputToggle } from './Output';

export enum ToggleInputs {
    On,
    Off,
    Toggle,
    FromValue
}
export enum ToggleOutputs {
    On,
    Off,
    Toggle
}

export default class Toggle implements Control {
    public inputs: Array<Input> = [
        new InputOn(this),
        new InputOff(this),
        new InputToggle(this),
        new InputFromValue(this)        
    ];
    private outputs: Array<Output> = [
        new OutputOn(this),
        new OutputOff(this),
        new OutputToggle(this)
    ];

    private connections: Array<Connection> = [];
    public state: boolean;

    public constructor(private initialState = false) {
        this.state = initialState;
    }

    public reset(): void {
        this.state = this.initialState;
    }

    public toggle(): void {
        this.state = !this.state;
        this.triggerOutputs();
    }

    private triggerOutputs() {
        for (let con of this.connections) {
            this.outputs[con.output].sendTo(con.input);
        }
    }

    public registerConnection(con: Connection) {
        this.connections.push(con);
    }
}