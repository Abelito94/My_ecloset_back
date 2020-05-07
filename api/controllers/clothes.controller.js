const ClothesModel = require('../models/clothes.model')
const { handleError } = require('../utils')

module.exports = {
  getAllMyClothes,
  addCloth,
  deleteCloth
}

function getAllMyClothes (req, res) {
  const findObj = { user: res.locals.user._id }
  if (req.query.cloth_type) { findObj.cloth_type = req.query.cloth_type }
  // ['primavera-verano', 'otoño-invierno'
  if (req.query.season) { findObj.season = req.query.season }
  ClothesModel
    .find(findObj)
    .then((looks) => res.json(looks))
    .catch((err) => handleError(err))
}

function addCloth (req, res) {
  const clothBody = { user: res.locals.user, ...req.body }
  ClothesModel
    .create(clothBody)
    .then((response) => res.json(response))
    .catch((err) => handleError(err))
}

function deleteCloth (req, res) {
  ClothesModel
    .findByIdAndDelete({ _id: req.params.id })
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}
