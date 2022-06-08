const express = require('express');
const bodyParser = require('body-parser');
import { createConnection, getRepository } from 'typeorm';
import { ormConfig } from './config';
import { User } from './entities/User';

const app = express();

require('dotenv').config()
createConnection(ormConfig);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getUsers', async (req, res) => {
    try {
        let response = await getRepository(User).createQueryBuilder('user')
            .select(['user.name as username', 'user.email as email', 'user.password as password'])
            .leftJoin('user.agency', 'agency')
            .where(`user.id between 1 and 100 OR agency.id between 1 and 100`)
            .getRawMany()
        return res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
    }
})


app.listen(process.env.PORT, function () {
    createConnection(ormConfig);
    console.log(`Listen on ${process.env.PORT}`);
});