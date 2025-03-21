const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({ include: [{ model: Product, required: false, attributes: ["product_name"], as: 'products' }] });
    console.log(data)
    res.status(200).json(data);
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(req.params.id, { include: [{ model: Product, required: false, attributes: ["product_name"], as: 'products' }] });
    data ? res.status(200).json(data) : res.status(404).json({ message: "Category ID not found." });
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create(req.body);
    res.status(200).json(data);
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    data ? res.status(200).json(data) : res.status(404).json({ message: "Update category ID not found." });
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({
      where: { id: req.params.id }
    });
    data ? res.status(200).json(data) : res.status(404).json({ message: "Delete category ID not found." });
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
