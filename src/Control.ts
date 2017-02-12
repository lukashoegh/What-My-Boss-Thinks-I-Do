import Connection from './Connection';
import Input from './Input';

interface Control {
    inputs: Array<Input>;
    reset(): void;
    state: any;
    registerConnection(connection: Connection): void;
}

export default Control;