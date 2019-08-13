module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3004,
    URL: process.env.BASE_URL || 'http:/localhost:3000',
    MONGOBD_URI: process.env.MONGOBD_URI || 'mongodb+srv://admin:lbJWuePR8B29aBTi@cluster0-1yrux.gcp.mongodb.net/restapi?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'secret1'
}