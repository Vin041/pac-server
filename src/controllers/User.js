const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async function (req, res) {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ where: { username: username }});
        const isValid = await bcrypt.compare(password, user.dataValues.password);
        if(isValid) {
            const token = jwt.sign({username, password, iat: Date.now()}, 'NotSoSecret', {algorithm: 'HS256'});
            res.status(200).send({
                message: "Logged in successfully!",
                token: token
            });
        } else {
            res.status(401).send({message: "Incorrect username or password."});
        }
    } catch (error) {
        res.status(500).send({ message: "Something wrong happened. Please try again." });
    }
};

const register = async function (req, res) {
    try {
        const { firstName, lastName, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({firstName: firstName, lastName: lastName, username: username, password: hashedPassword});
        await newUser.save();
        res.status(201).send({message: "User created successfully!"});
    } catch (error) {
        res.status(500).send({ message: "Couldn't create user at the moment. Please try again later." });
    }
};

module.exports = {
    login,
    register
};