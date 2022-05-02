const router = require('express').Router();
const { Model } = require('sequelize');
const { Tag, Product, ProductTag } = require('../../models');
const { sequelize } = require('../../models/Product');

// The `/api/tags` endpoint

// Get All Tags DONE
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: [
      'id', 
      'tag_name',
    ],
    include: [
      {
        model: Product,
        attributes: [
          'product_name',
        ],
        through: ProductTag,
        as: 'products',
      }
    ]
  })
    .then(TagData => res.json(TagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a Single Tag DONE
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 
      'tag_name',
    ],
    include: [
      {
        model: Product,
        attributes: [
          'product_name',
        ],
        through: ProductTag,
        as: 'products',
      }
    ]
  })
    .then(TagData => res.json(TagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a Tag DONE
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagCreateData => res.json(tagCreateData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a Tag's Name DONE
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(tagUpdateData => {
    if (!tagUpdateData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tagUpdateData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete a Tag DONE
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagDeleteData => {
    if (!tagDeleteData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tagDeleteData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
