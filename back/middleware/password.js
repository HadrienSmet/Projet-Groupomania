const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);  

console.log("mddlware.mdp l:14 valid mdp: " + passwordSchema.validate('validPASS123'));
console.log("next log is mddlware.mdp l:16 invalid mdp:");
console.log(passwordSchema.validate('invalidPASS', { details: true }));

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({ error: `The password is not strong enough ${passwordSchema.validate(req.body.password, { list: true })}` })
    }
};