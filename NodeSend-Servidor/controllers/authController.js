const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const { validationResult } = require("express-validator");

exports.autenticarUsuario = async (req, res, next) => {
  // Revisar si hay errores con express validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Buscar el usuario para ver si está registrado
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  //console.log(usuario);

  if (!usuario) {
    res.status(401).json({ msg: "El usuario no existe " });
    return next();
  }

  //console.log(req.body)

  // Verificar el password y autenticar el usuario

  if (bcrypt.compareSync(password, usuario.password)) {
    // Crear jsonwebtoken
    //console.log("El password es correcto");
    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
      process.env.SECRETA,
      {
        expiresIn: "8h",
      },
    );

    //console.log(token);
    res.json({ token });
  } else {
    //console.log("Password Incorrecto");
    res.status(401).json({ msg: "Password incorrecto" });
    return next();
  }
};

exports.usuarioAutenticado = (req, res, next) => {
  res.json({usuario: req.usuario})
};
