const express = require('express');
const router = express.Router();
const controller = require('../controllers/listingController');
const validate = require('../middlewares/validate');
const { createListingSchema, updateListingSchema } = require('../validators/listingValidation');

router.post('/', validate(createListingSchema), controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', validate(updateListingSchema), controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
