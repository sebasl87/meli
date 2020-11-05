import express from 'express';

import index from './Routes';


class Server {
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config(){
        this.app.set('port', process.env.port || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}))
    }
    routes(){
        this.app.use(index)

    }
    start(){
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`Server on Port ${this.app.get('port')}`)
        })
    }
}


const server = new Server();
server.start();