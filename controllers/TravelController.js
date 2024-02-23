const Travel = require("../models/Travel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
// storage
const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "..", "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date() + file.originalname);
  },
});
const upload = multer({ storage: Storage });
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
  jwt.verify(req.token, "secret", (err, authData) => {
    authData = jwt.decode(req.token);
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(req.body);
      console.log(req.file);
      let imgUrl = req.file.filename;
      let { title, body, price, cat } = req.body;
      let data = Travel.create({
        title,
        body,
        price,
        imgUrl,
        cat,
      });
      if (data == undefined) {
        res.send("Added faild ");
      } else {
        res.send("added successfully ");
      }
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
      let imgUrl = req.file.filename;
      let { title, body, price, cat } = req.body;
      console.log(title);
      let data = await Travel.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title,
          body: body,
          imgUrl: imgUrl,
          price: price,
          cat: cat,
        }
      );
      res.json({
        travels: data,
        msg: `edit this one (${req.params._id})`,
      });
    }
  });
};
// search by title
// const SearchByTitle = async (req, res) => {
//   jwt.verify(req.token, "secret_Key", async (err, authData) => {
//     authData = await jwt.decode(req.token);
//     let sTitle = req.params.search;
//     console.log(sTitle);
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       let data = await Blog.find(
//         { title: sTitle },
//         {
//           ID: 1,
//           title: 1,
//           body: 1,
//           price: 1,
//           author: 1,
//           tags: 1,
//         }
//       );
//       res.json({
//         blogs: data,
//         msg: "all blogs",
//       });
//     }
//   });
// };

// export
module.exports = {
  ShowAll,
  AddTravel,
  DeleteTravel,
  EditTravel,
};
