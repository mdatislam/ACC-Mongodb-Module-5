
const express = require("express");
const cors = require("cors");
const router = require("./routes/V1/route.user");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const {connectToServer}= require("./ultils/dbConnect")



//Midle ware
app.use(cors())
app.use(express.json())
app.use(express.static("public"));

 connectToServer(() => {
   if (!err) {
     app.listen(port, () => {
       console.log(`App Listening on Port ${port}`);
     });
   } else {
     console.log(err);
   }
 });


app.use('/api/V1/user',router)


app.get('/', (req, res) => {
    // console.log("Hello Random User API")
    res.send('welcome Random User Create API')
})

app.all('*', (req,res) => {
    res.send(" Route Not found")
})

app.listen(port, () => {
  console.log(`App Listening on Port ${port}`);
})
process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});

