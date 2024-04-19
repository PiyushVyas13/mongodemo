let express = require("express")
let mongoose = require("mongoose")
let cors = require("cors")
let bodyParser = require("body-parser")
// let dbConfig = require('./database/db')

const userRoute = require("../backend/routes/users")
const productRoute = require("../backend/routes/products")

// mongoose.set("useNewUrlParser", true)
// mongoose.set("useFindAndModify", false);
// mongoose.set('useCreateIndex', true)
// mongoose.set('useUnifiedTopology', true)

mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://mongo:mongo123@cluster0.s7yf8ga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0") 
    .then(() => {
        console.log("datbase connected")
    }, error => {
        console.log("Could not connect: " + error) 
    })

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true 
}))
app.use(cors())

app.use('/users', userRoute)
app.use('/products', productRoute)

const port = process.env.PORT || 8000

const server = app.listen(port, () => {
    console.log('Connected to port: ' + port)
})

app.use((req, res, next) => {
    res.status(404).send("Error 404!")
})

app.use(function (err, req, res, next)  {
    console.error(err.message)

    if(!err.statusCode) {
        err.statusCode = 500
    }

    res.status(err.statusCode).send(err.message);
})