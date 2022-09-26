require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

//Handles what happens when the user submits the sign up form
//Starts by hashing the password --> 10 times
// --> Warning: bcrypt.hash is async function
//If hash succes: -create a new Object to post to the database with the password hashed
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  //Handles what happens when the user submits the sign in form
  //Starts by searching an email in the data matching whit one provided by the user
  //Error if the mailadress can't be found
  //If not we compare the password provided by the user with the one in the database
  //Warning --> bcrypt.compare is async function
  //If passwords match: provides an authorisation token to the user
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Cet email n'est pas présent dans notre base de donnée"});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    console.log(jwt.sign(
                        { userId: user._id },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '24h' }
                    ));
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                        
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };