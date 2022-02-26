import { config } from 'dotenv';
config()

export default {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/src/migrations/*.js'],
    cli: {
        "migrationsDir": 'src/migrations'
    },
    migrationsTableName: 'migrations_typeorm',
    synchronize: false,

 }
