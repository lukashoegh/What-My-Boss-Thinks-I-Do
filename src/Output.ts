import Input from './Input';
import Control from './Control';
import Indicator from './Indicator';

interface Output {
    sendTo: (input: Input) => void;
}

export default Output;

export class OutputWhenOn implements Output {
    constructor(private subject: Control & Indicator) {}

    public sendTo (input: Input): void {
        if (this.subject.state == true) input.receive();
    }
}

export class OutputWhenOff implements Output {
    constructor(private subject: Control & Indicator) {}

    public sendTo (input: Input): void {
        if (this.subject.state == false) input.receive();
    }
}

export class OutputWhenToggled implements Output {
    constructor(private subject: Control & Indicator) {}

    public sendTo (input: Input): void {
        input.receive(this.subject.state);
    }
}