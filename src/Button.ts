import Control from './Control';
import Connection from './Connection';
import Output from './Output';
import Input from './Input';

export enum ButtonOutputs {
    Press
}

export default class Button implements Control {

    private outputs: Array<Output> = [
        {
            sendTo: (input: Input) => {
                input.receive();
            }
        }
    ];

    private connections: Array<Connection> = [];

    public registerConnection(con: Connection) {
        this.connections.push(con);
    }
    
}