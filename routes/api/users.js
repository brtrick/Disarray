const express = require("express");
const router = express.Router();
// const User = require()
const keys = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User");
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require('../../validation/register');

router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username
    });
  });

  router.get("/", (req, res) => {
      User.find().sort({date: -1})
      .then(users => res.json(users))
      .catch(err => res.status(404).json(err))
  });




  router.patch("/:user_id", (req, res) => {
      User.findByIdAndUpdate(req.params.user_id,
         {gamesWon: req.body.win, gamesLost: req.body.loss, gamesPlayed: req.body.game},
          (err, user) => {
        if (err) {
            res.json(err)
        } else {
            res.json(user)
        }
      })
  });


router.post("/register", (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({username: req.body.username})
    .then(user => {
        if (user) {
            errors.username = "Username already exists"
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                      .then(user => {
                          const payload = {id: user.id, username: user.username};
                          jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                              res.json({
                                  success: true,
                                  token: "Bearer " + token
                              });
                          });
                      })
                      .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({username})
    .then(user => {
        if (!user) {
            errors.username = "User does not exist";
            return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
              const payload = {id: user.id, username: user.username};

              jwt.sign(
                payload,
                keys.secretOrKey,
                {expiresIn: 3600},
                (err, token) => {
                  res.json({
                  success: true,
                  token: "Bearer " + token
               });
              });
            } else {
                errors.password = "Incorrect password";
                return res.status(400).json(errors);
            }
        }) 
    })
})



module.exports = router;