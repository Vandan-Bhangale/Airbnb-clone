const path = require('path');

//Express
const express = require('express');

//Local modules
const {userRoute} = require(`./Routes/userRouter`);
const {hostRoute} = require(`./Routes/hostRouter`);
const errorController = require('./controllers/pageNotFound');

const rootDir = require('./utils/pathUtility');
const { default: mongoose } = require('mongoose');


//Running the express server
const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true})); 

app.use(express.static(path.join(rootDir,'public')));
app.use(express.json());

app.use(userRoute);
app.use(hostRoute);

app.use(errorController.pageNotFound);

const PORT = 3001;
mongoose.connect("mongodb+srv://root:vandan@airbnb.t3wolhz.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnbz").then(() => {
    console.log("Connected successflly.");
    app.listen(PORT,() => {
        console.log("Server is live now on http://localhost:3001"); 
    })
}).catch(err => {
    console.log("Error while connecting to the server.",err);
});