import Connection from './Connection';
import Input from './Input';

interface Control {
    registerConnection(connection: Connection): void;
}

export default Control;