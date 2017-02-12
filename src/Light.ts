import Indicator from './Indicator';
import Input from './Input';
import { InputOn, InputOff, InputToggle, InputFromValue } from './Input';

export enum LightInputs {
    On,
    Off,
    Toggle,
    FromValue
}

export default class Light implements Indicator {
    public state: boolean;

    public inputs: Array<Input> = [
        new InputOn(this),
        new InputOff(this),
        new InputToggle(this),
        new InputFromValue(this)       
    ]

    constructor(private initialState = false) {
        this.state = initialState;
    }

    public reset(): void {
        this.state = this.initialState;
    }
}