import { Request, Response, Router } from 'express';

const fetch = require('node-fetch');
const _ = require('underscore');

class Api {
    router: Router;

    constructor() {
        this.router = Router();
    }
}

const api = new Api();


export default api.router; 