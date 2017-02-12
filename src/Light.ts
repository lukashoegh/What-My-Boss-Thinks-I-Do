import Indicator from './Indicator';
import Input from './Input';
import { InputToggle, InputSetOn, InputSetOff, InputSetFromValue } from './Input';

export enum LightInputs {
    On,
    Off,
    Toggle,
    FromValue
}

export default class Light implements Indicator {
    public state: boolean;

    public inputs: Array<Input> = [
        new InputSetOn(this),
        new InputSetOff(this),
        new InputToggle(this),
        new InputSetFromValue(this)     
    ]

    constructor(private initialState = false) {
        this.state = initialState;
    }

    public reset(): void {
        this.state = this.initialState;
    }
}