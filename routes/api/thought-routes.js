const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  removeThought, 
  addReaction, 
  removeReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getOneThought)
  .put(updateThought)
  .delete(removeThought);

  router
    .route('/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;