const multer = require("multer");
const shortid = require("shortid");

// Subida de archivos

exports.subirArchivo = async (req, res, next) => {
  const configurationMulter = {
    limits: { fileSize: req.usuario ? 1042 * 1024 : 1000000 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length,
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };

  const upload = multer(configurationMulter).single("archivo");

  upload(req, res, async error => {
    console.log(req.file);
    if (!error) {
      res.json({ archivo: req.file.filename });
    } else {
      console.log(error);
      return next;
    }
  });
};

exports.eliminarArchivo = async (req, res) => {};
