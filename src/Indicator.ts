import Input from './Input';

interface Indicator {
    inputs: Array<Input>;
    reset(): void;
    state: any;
}

export default Indicator;