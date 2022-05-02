const router = require('express').Router();
const { Category, Product } = require('../../models');
const { sequelize } = require('../../models/Product');

// The `/api/categories` endpoint
// Get All Categories & Associated Products DONE
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: [
      'id', 
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          [sequelize.literal('(SELECT product_name FROM product WHERE product.category_id = category.id)'), 'products' ]
        ],
      }
    ]    
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get A Category & Associated Products DONE
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          [sequelize.literal('(SELECT product_name FROM product WHERE product.category_id = category.id)'), 'products' ]
        ],
      }
    ]    
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a New Category DONE
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryCreateData => res.json(categoryCreateData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a Category Name DONE
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(categoryUpdateData => {
    if (!categoryUpdateData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(categoryUpdateData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete a Category DONE
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryDeleteData => {
    if (!categoryDeleteData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(categoryDeleteData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
