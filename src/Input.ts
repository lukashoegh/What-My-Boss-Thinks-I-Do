import Indicator from './Indicator';
import Control from './Control';

interface Input {
    receive(value?: any): void;
}

export default Input;

export class InputOn implements Input {
    constructor(private subject: Control | Indicator) { }

    public receive(): void {
        this.subject.state = true;
    }
}

export class InputOff implements Input {
    constructor(private subject: Control | Indicator) { }

    public receive(): void {
        this.subject.state = false;
    }
}

export class InputToggle implements Input {
    constructor(private subject: Control | Indicator) { }

    public receive(): void {
        this.subject.state = !this.subject.state;
    }
}

export class InputFromValue implements Input {
    constructor(private subject: Control | Indicator) { }

    public receive(value: any): void {
        if (value === true || value === 1) {
            this.subject.state = true;
        }
        else if (value === false || value === 0) {
            this.subject.state = false;
        }
    }
}