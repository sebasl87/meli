"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fetch = require('node-fetch');
const _ = require('underscore');
class Api {
    constructor() {
        this.router = express_1.Router();
    }
}
const api = new Api();
exports.default = api.router;
