import Input from './Input';
import Control from './Control';
interface Output {
    sendTo: (input: Input) => void;
}

export default Output;

export class OutputOn implements Output {
    constructor(private subject: Control) {}

    public sendTo (input: Input): void {
        if (this.subject.state == true) input.receive();
    }
}

export class OutputOff implements Output {
    constructor(private subject: Control) {}

    public sendTo (input: Input): void {
        if (this.subject.state == false) input.receive();
    }
}

export class OutputToggle implements Output {
    constructor(private subject: Control) {}

    public sendTo (input: Input): void {
        input.receive(this.subject.state);
    }
}