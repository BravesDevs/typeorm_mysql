import { ConnectionOptions } from 'typeorm';

require('dotenv').config();

export const ormConfig: ConnectionOptions = {
    type: 'mysql',
    host: process.env.MYSQL_DATABASE_HOST,
    username: process.env.MYSQL_DATABASE_USER,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
    charset: 'utf8mb4',
    synchronize: false,
    timezone: "UTC",
    extra: { connectionLimit: 10 },
    entities: [
        './**/entities/*.js'
    ],
    logging: false
};
    