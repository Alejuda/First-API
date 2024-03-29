const express = require('express');
const app = express();
const cors = require("cors")

const morgan = require('morgan');



//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.set('view engine', 'ejs');
app.use(cors());


//midlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// routes
app.use('/api/tasks',require('./routes/index'));



//starting the server

app.listen(app.get('port'), ()=>{
    console.log(`listening on port ${app.get('port')}`);
});