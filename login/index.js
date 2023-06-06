const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const routes = require('./routes/router')
const { jwtMiddleware } = require('./middleware/jwt_middleware')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwtMiddleware);
app.use(routes);


app.listen(port, () => {

    console.log(`server berjalan pada ${port}`)
})


