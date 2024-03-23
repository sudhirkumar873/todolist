const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleErrors = (error) => {
  const err = {};
  if (error.code === 11000) {
    err.email = "that email is already registered";
    return err;
  }
  if (error.message.includes("user validation failed")) {
    console.log(error.errors);
    Object.values(error.errors).forEach(({ properties }) => {
      err[properties.path] = properties.message;
    });
  }
  return err;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "signature", { expiresIn: maxAge });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    if (!email || !password) {
      res.json({
        errors: {
          email: email ? "" : "email must be required.",
          password: password ? "" : "password must be required.",
        },
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      console.log(password, user.password)
      if (auth) {
        const token = createToken(user._id);
        // res.cookie('jwt', token, { maxAge: maxAge * 1000});
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
          secure: true,
          sameSite: "None",
        });

        res.json({ user: user, token });
      }
      res.status(404).json({ errors: "Invalid credential." });
    } else {
      res.status(404).json({ errors: "Invalid credential." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userResponse = await User.create({ name, email, password });
    const token = createToken(userResponse._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: userResponse._id });
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.json({ errors });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json({ status: true });
};
