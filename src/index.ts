const express = require('express');
const bodyParser = require('body-parser');
import { createConnection, getRepository } from 'typeorm';
import { ormConfig } from './config';
import { MysqlTest } from './entities/MysqlTest';
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
        return res.status(500).json(err);
    }
})


app.get('/addData', async (req, res) => {
    try {

        let dataToInsert = [{
            name: "DevOps",
            summary: `DevOps is the combination of cultural philosophies, practices, and tools that increases an organization's ability to deliver applications 
            and services at high velocity: evolving and improving products at a faster pace than organizations using traditional software development and infrastructure management processes.`
        },
        {
            name: "Cloud Architect",
            summary: `A cloud architect is an IT professional who is responsible for overseeing a company's cloud computing strategy. This includes cloud adoption plans, cloud application design, and cloud management and monitoring.`
        },
        {
            name: "Back-end Engineer",
            summary: `A back-end engineer is generally responsible for building the structure of a software application. They'll primarily spend time writing business logic, server scripts, and application programming interfaces (APIs) that will eventually be utilized by front-end engineers and UX designers.`
        },
        {
            name: "Front-end Engineer",
            summary: `Front end engineers plan, design, build, and implement the user interface systems of websites, software programs, and web-based applications. Their primary goal is to provide a satisfactory user experience with no issues, errors, or downtime.`
        },
        {
            name: "Machine Learning Engineer",
            summary: `A machine learning engineer (ML engineer) is a person in IT who focuses on researching, building and designing self-running artificial intelligence (AI) systems to automate predictive models.`
        },
        ]
        await getRepository(MysqlTest).insert(dataToInsert)
        return res.status(200).json({"ok": true, "message": "Insert Success"});
    }
    catch (err) {
        return res.status(500).json(err);
    }
})

app.listen(process.env.PORT, function () {
    createConnection(ormConfig);
    console.log(`Listen on ${process.env.PORT}`);
});