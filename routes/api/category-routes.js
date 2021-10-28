const router = require('express').Router();
const { read } = require('fs');
const { Category, Product } = require('../../models');



router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product,}]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No catagory found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }
  catch (err){
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {id:req.params.id},
    }
  )
  .then (updatedData => {
    res.status(200).json(updatedData);
  })
  .catch(err => res.status(300).json(err))
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {id:req.params.id},
    });
    if(!categoryData) {
      res.status(404).json({message: 'No category with this ID'})
    };
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
