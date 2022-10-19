require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { setJwtToken } = require('../../front/src/utils/functions/tools');

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
        .then(() => {
            res.status(200).json({
                isProfileComplete: false,
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '24h' }
                ),
            });
        })
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
                    console.log("cntrllrs.user l: 43 signature jwt:" + jwt.sign(
                        { userId: user._id },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '24h' }
                    ));
                    res.status(200).json({
                        email: user.email,
                        isProfileComplete: user.isProfileComplete,
                        profilePicture: user.profilePicture,
                        pseudo: user.pseudo,
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '24h' }
                        ),
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

 exports.profile = (req, res, next) => {
    // const userObject = {
    //     ...JSON.stringify(req.body),
    //     profilePicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // }
    const userObject = JSON.stringify(req.body);
    console.log("cntrllrs.user l:79 userObject: " + userObject);
    let url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    let { _id, pseudo, date, isProfileComplete } = JSON.parse(userObject);
    let updateData = {
        _id: req.auth.userId,
        isProfileComplete,
        pseudo,
        profilePicture: url,
        date
    }
    User.findOne({ _id: req.params.id })
        .then((user) => {
            delete userObject._id;
            if ( user._id != req.auth.userId) {
                res.status(403).json({ error });
            } else {
                User.updateOne({ _id: req.params.id }, { ...updateData })
                        .then(() => {
                            res.status(200).json({
                                updateData,
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.ACCESS_TOKEN_SECRET,
                                    { expiresIn: '24h' }
                                )
                            })
                        })
                        .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
 }