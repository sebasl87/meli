import express from 'express';
import index from './Routes';
import morgan from 'morgan';

class Server {
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.middlewares();
        this.routes();
    }
    config(){
        this.app.set('port', process.env.port || 3030);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}))
    }
    middlewares(){
        this.app.use(morgan('dev'))
    }
    routes(){
        this.app.use('/api/items', index)

    }
    start(){
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`Server on Port ${this.app.get('port')}`)
        })
    }
}

export default Server;