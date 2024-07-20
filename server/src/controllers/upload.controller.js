const uploadController = {};

const path = require('path');
const { v4 } = require('uuid');

uploadController.uploadFile = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ message: 'No files were uploaded.' });
  }

  const file = req.files.photo;

  const id = v4();
  const extension = path.extname(file.name);
  const basename = path.basename(file.name, extension);

  let newFileName = basename + '-' + id + extension;
  newFileName = newFileName.replaceAll(/\s/g, '-');
  const uploadPath = path.resolve(__dirname, '../uploads', newFileName);

  file.mv(uploadPath, err => {
    if (err) return res.status(500).send(err);

    const fileUrl = `${req.protocol}://${req.get(
      'host'
    )}/uploads/${newFileName}`;

    return res.status(200).send({ url: fileUrl });
  });
};
module.exports = uploadController;
