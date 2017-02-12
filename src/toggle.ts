import Input from './Input';
import Output from './Output';
import Connection from './Connection';
import Control from './Control';

export enum ToggleInputs {
    On,
    Off,
    Toggle
}
export enum ToggleOutputs {
    On,
    Off,
    Toggle
}

export default class Toggle implements Control {
    public inputs: Array<Input> = [
        {
            receive: (value: any) => {
                this.state = true;
            }
        },
        {
            receive: (value: any) => {
                this.state = false;
            }
        },
        {
            receive: (value: any) => {
                this.state = !this.state;
            }
        }
    ];
    private outputs: Array<Output> = [
        {
            sendTo: (input) => {
                if (this.state == true) input.receive();
            }
        },
        {
            sendTo: (input) => {
                if (this.state == false) input.receive();
            }
        },
        {
            sendTo: (input) => {
                input.receive(this.state);
            }
        }
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