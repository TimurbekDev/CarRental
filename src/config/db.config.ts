export default () => ({
    database: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        name : process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT) || 4000
    }
})