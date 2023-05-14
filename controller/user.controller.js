const fs = require("fs");
const { json } = require("stream/consumers");
const { getDb, getDB } = require("../ultils/dbConnect");
const { ObjectId } = require("mongodb");
const jsonString = fs.readFileSync("./public/userData.json");
const customer = JSON.parse(jsonString);

module.exports.getRandomUser = async (req, res, next) => {
  try {
    const db= getDB()
    let x = Math.floor(Math.random() * customer.length + 1);
    //console.log(x)
    const name = customer.filter((n) => n.id === Number(x));

    res.status(200).json({ success: true, data: name });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection("atifa").find().toArray();

    // Pagination: query hisabe poa jabe page & limit
    //  const { limit, page } = req.query;
    // const result = await db
    // .collection("atifa")
    // .find()
    // .project({ _id: 0 })
    // .limit(+limit)
    // .skip(+page * +limit)
    // .toArray();

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserDetail = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;
    console.log(id);
    //id valid ki na seti age check korte hobe
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: " Not a valid Id" });
    }

    const filter = { _id: new ObjectId(id) };
    const result = await db.collection("atifa").findOne(filter);
    console.log(result);
    // if no data found with the given id

    if (!result) {
      return res
        .status(400)
        .json({ success: false, error: "Could't found any data with this id" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.addUser = async (req, res, next) => {
  try {
    const db = getDB();
    const userInfo = req.body;
    //console.log(userInfo)
    const result = await db.collection("atifa").insertOne(userInfo);
    console.log(result);
    res.send(result);
    if (!result.insertedId) {
      return res
        .status(400)
        .send({ status: false, error: "something went wrong" });
    }
    res.send({
      success: true,
      message: `Tools is added with id ${result.insertedId}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;
    console.log(id);
    //id valid ki na seti age check korte hobe
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: " Not a valid Id" });
    }

    const filter = { _id: new ObjectId(id) };

    /* General update format */

    // const result = await db
    //   .collection("atifa")
    //   .updateOne(filter, { $set: req.body });
    // console.log(result);


   /*  To explore other type query */
    const result = await db
      .collection("atifa")
      .updateMany({ contact: { $exists: true } }, { $set: { cellNo: "01999999999"} });
    console.log(result);


    // if no data found with the given id

    if (!result.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Could't found any data with this id" });
    }
    res
      .status(200)
      .json({ success: true, message: "successfully user updated" });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;
    console.log(id);
    //id valid ki na seti age check korte hobe
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: " Not a valid Id" });
    }

    const filter = { _id: new ObjectId(id) };

    /* General delete format */

    const result = await db
      .collection("atifa")
      .deleteOne(filter);
    console.log(result);

    
    
    console.log(result);

    // if no data found with the given id

    if (!result.deletedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Could't found any data with this id" });
    }
    res
      .status(200)
      .json({ success: true, message: "successfully user delete" });
  } catch (error) {
    next(error);
  }
};


/* Kuno collume er Index create korle query time kom lage setear explation niche deoa holo */

module.exports.insertTest = async (req, res, next) => {
  
  for (let i = 0; i < 100000; i++){
    const db = getDB();
    const result = await db.collection("test10").insertOne({ name: `test ${i}`, Age: i });
  
  }
    res.send("done");
}
module.exports.findTest = async (req, res, next) => {
  const db = getDB();
 
    const result = await db.collection("test10").findOne({Age:9999});
    res.json(result);
  
};