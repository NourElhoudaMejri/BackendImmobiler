const BienImmobilier = require("../models/BienImmobilier");
const express = require("express");
const router = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

router.post("/add", upload.single("image"), (req, res) => {
  /* if (req.file)
    res.json({
      imageUrl: `images/uploads/${req.file.filename}`
    });
  else res.status("409").json("No Files to Upload.");*/
  var bienImmobilier = new BienImmobilier({
    ...req.body
  });

  bienImmobilier
    .save()
    .then(bienImmobilier => {
      res.send(bienImmobilier);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/all", function(req, res) {
  let queries = handlingQueries(req.query);
  console.log(queries);
  BienImmobilier.find({ ...queries })
    .then(bienImmobilier => {
      res.send(bienImmobilier);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

router.delete("/remove/:id", function(req, res) {
  console.log("hello id");
  console.log(req.params.id);
  BienImmobilier.deleteOne({ _id: req.params.id }, function(err) {
    if (err) {
      res.send({ state: "not ok", msg: "err" + err });
    } else {
      res.send({ state: "ok", msg: "supp" });
    }
  });
});

// prolongation
router.put("/update/:id", function(req, res) {
  BienImmobilier.updateOne({ _id: req.params.id }, req.body, function(err) {
    if (err) {
      res.send({ state: "not ok", msg: "err updated" + err });
    } else {
      res.send({ state: "ok", msg: "updated ok" });
    }
  });
});

module.exports = router;

let handlingQueries = queries => {
  let query = {};
  if (queries.statut) {
    query.statut = queries.statut;
  }
  if (queries.region) {
    query.region = queries.region;
  }
  if (queries.categorie) {
    query.categorie = queries.categorie;
  }

  if (queries.nombreChambre) {
    if (queries.nombreChambre !== 3) {
      query.nombrePiece = queries.nombreChambre;
    } else {
      query.nombrePiece = { $gt: 2 };
    }
  }
  if (queries.nombreSalon) {
    if (queries.nombreSalon !== 3) {
      query.nombreSalon = queries.nombreSalon;
    } else {
      query.nombreSalon = { $gt: 2 };
    }
  }
  if (queries.nombreGarage) {
    if (queries.nombreGarage !== 3) {
      query.nombreGarage = queries.nombreGarage;
    } else {
      query.nombreGarage = { $gt: 2 };
    }
  }
  if (queries.nombreSalleDeBain) {
    if (queries.nombreSalleDeBain !== 3) {
      query.nombreSalleDeBain = queries.nombreSalleDeBain;
    } else {
      query.nombreSalleDeBain = { $gt: 2 };
    }
  }
  if (queries.surface) {
    if (queries.surface === "Inférieur à 100M2") {
      query.surface = { $lt: 101 };
    }
    if (queries.surface === "Entre 100 et 200 M2") {
      query.surface = { $lt: 201, $gt: 100 };
    }
    if (queries.surface === "Entre 200 et 300 M2") {
      query.surface = { $lt: 301, $gt: 200 };
    }
    if (queries.surface === "Entre 300 et 400 M2") {
      query.surface = { $lt: 401, $gt: 300 };
    }
    if (queries.surface === "Supéreieur à 400 M2") {
      query.surface = { $gt: 400 };
    }
  }
  if (queries.prix) {
    query.prix = queries.prix;
  }
  if (queries.titre) {
    query.titre = { $regex: queries.titre, $options: "i" };
  }

  return query;
};
