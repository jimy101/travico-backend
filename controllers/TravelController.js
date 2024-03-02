const Travel = require("../models/Travel");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utilites/cloudinary");

// const multer = require("multer");
// const path = require("path");
//
// storage
// const fullPath = path.join(__dirname, "..", "..", "uploads");
// const Storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, fullPath);
//   },
//   filename: (req, file, cb) => {
//     const fullName = Date() + file.originalname;
//     file.finalDist = `uploads/${fullName} `;
//     cb(null, fullName);
//   },
// });
// const upload = multer({ storage: Storage });
// all travels
const ShowAll = async (req, res) => {
  try {
    let data = await Travel.find(
      {},
      {
        _id: 1,
        title: 1,
        body: 1,
        imgUrl: 1,
        imgSrc: 1,
        imgScureSrc: 1,
        price: 1,
        cat: 1,
      }
    );
    res.json({
      travels: data,
      msg: "all Travels",
    });
  } catch (error) {
    console.log(error);
  }
};
// add
const AddTravel = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, authData) => {
    authData = jwt.decode(req.token);
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(req.body);
      console.log(req.file);
      let imgUrl = await req.file.finalDist;
      await cloudinary.uploader.upload(imgUrl, function (error, result) {
        console.log(result);
        let imgSrc = result.url;
        let imgScureSrc = result.secure_url;
        let { title, body, price, cat } = req.body;
        let data = Travel.create({
          title,
          body,
          price,
          imgSrc,
          imgScureSrc,
          // imgUrl,
          cat,
        });
        if (data == undefined) {
          res.send("Added faild ");
        } else {
          res.send("added successfully ");
          console.log(data);
        }
      });
    }
  });
};
// delete
const DeleteTravel = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, authData) => {
    authData = await jwt.decode(req.token);
    if (err) {
      res.sendStatus(403);
    } else {
      let item = await Travel.deleteOne({ _id: req.params.id });
      // console.log(item);
      res.send("succses");
    }
  });
};
// Update
const EditTravel = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, authData) => {
    authData = jwt.decode(req.token);
    if (err) {
      res.sendStatus(403);
    } else {
      let imgUrl = await req.file.finalDist;
      console.log(req.body);
      console.log(req.file);
      await cloudinary.uploader.upload(imgUrl, async function (error, result) {
        console.log(result);
        let imgSrc = result.url;
        let imgScureSrc = result.secure_url;
        let { title, body, price, cat } = req.body;
        let data = await Travel.findOneAndUpdate(
          { _id: req.params.id },
          {
            title: title,
            body: body,
            // imgUrl: imgUrl,
            imgSrc: imgSrc,
            imgScureSrc: imgScureSrc,
            price: price,
            cat: cat,
          }
        );
        res.json({
          travels: data,
          msg: `edit this one (${req.params._id})`,
        });
      });
    }
  });
};
// export
module.exports = {
  ShowAll,
  AddTravel,
  DeleteTravel,
  EditTravel,
};
