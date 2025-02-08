export default () => ({
    port: process.env.APP_PORT || "5000",
    baseUrl: process.env.BASE_URL || "http://localhost:5000",
    database: {
        uri: process.env.MONGOOSE_URI || "mongodb://127.0.0.1:27017",
        name: process.env.MONGOOSE_DB_NAME || "hospital",
    },
    secretKey: process.env.SECRET_KEY || "hospital_secret_key"
})