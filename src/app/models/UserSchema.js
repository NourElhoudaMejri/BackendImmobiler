var mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10;

// const baseOptions = {
//   discriminatorKey: "itemtype", // our discriminator key, could be anything
//   collection: "Acteur" // the name of our collection
// };
Schema = mongoose.Schema;

const UserSchema = mongoose.model(
  "User",
  new mongoose.Schema({
    role: {
      type: String,
      enum: [
        "agent",
        "chefAgence",
        "client",
        "clientQuiPossedeBien",
        "clientQuiVeutBien",
        "visiteur"
      ]
      // required: true
    },
    activated: {
      type: Boolean
    },
    nom: {
      type: String,
      required: true,
      trim: true
    },
    prenom: {
      required: false,
      type: String
    },
    adress: {
      type: String
    },

    tel: {
      type: String
    },

    email: {
      required: true,
      type: String
    },

    motDePasse: {
      required: true,
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  })
);

module.exports = mongoose.model("User");
