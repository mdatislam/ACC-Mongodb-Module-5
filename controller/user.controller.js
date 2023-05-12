
const fs = require("fs");
const { json } = require("stream/consumers");
const { getDb } = require("../ultils/dbConnect");
const jsonString = fs.readFileSync("./public/userData.json");
const customer = JSON.parse(jsonString);
 
module.exports.getRandomUser = async (req, res, next) => {
  try {
  const db= getDb()
    
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    
    const query = req.query.query
    //console.log(query[0])
   
    let newCustomer = []
    if(query){
      customer.forEach((n) => {
        if (newCustomer.length < query) {
          newCustomer.push(n);
        }
      });
      //res.send(query)
      res.status(200).json({ success: true, data: newCustomer });
    }
    else {
       res.status(200).json({ success: true, data: customer });
      
    }
  } catch (error) {
    next(error);
  }
};


module.exports.addUser = async (req, res, next) => {
  try {
    let newUser = []
    customer.forEach(n => {
      newUser.push(n)
    })
    const newUserInfo = req.body;
    newUser.push(newUserInfo);
    //console.log(newUser)
    const userInfoString = JSON.stringify(newUser);
     const newCustomer = fs.writeFileSync(
       "./public/userData.json",
       userInfoString
     );
    res.status(200).json({ success: true, data: newCustomer});
  } catch (error) {
    next(error);
  }
};


module.exports.deleteUser = async (req, res, next) => {
  try {
    let randomUserId = Math.floor(Math.random() * customer.length + 1);

    const name = customer.filter((n) => n.id !== randomUserId);
   // console.log(name);
    //console.log(randomUserId);
    const userString = JSON.stringify(name);
//console.log(userString);
    const newUserList = fs.writeFileSync("./public/userData.json", userString);

    // console.log(newUserList);
    res.send("Delete success");
  } catch (error) {
    next(error);
  }
};
