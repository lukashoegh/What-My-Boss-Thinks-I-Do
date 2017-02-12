import Input from './Input';
import Output from './Output';
import Connection from './Connection';
import Control from './Control';
import { InputToggle, InputSetOn, InputSetOff, InputSetFromValue } from './Input';
import { OutputWhenOn, OutputWhenOff, OutputWhenToggled } from './Output';
import Indicator from './Indicator';

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

export default class Toggle implements Control, Indicator {
    public inputs: Array<Input> = [
        new InputSetOn(this),
        new InputSetOff(this),
        new InputToggle(this),
        new InputSetFromValue(this)        
    ];
    private outputs: Array<Output> = [
        new OutputWhenOn(this),
        new OutputWhenOff(this),
        new OutputWhenToggled(this)
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