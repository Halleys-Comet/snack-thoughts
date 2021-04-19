const { User, Thought } = require('../models');

const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__V')
            .sort({ _id: -1 })
            .then(dbThoughts => res.json(dbThoughts))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get thought by id
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.thoughstId })
            .select('-__V')
            .then(dbThoughts => {
                if (!dbThoughts) { res.status(400).json({ message: 'No thought found with this id!' });
                return;
            }
        res.json(dbThoughts);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    });
},
// create thought
    createThought({ body }, res) {
        Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughts => {
        console.log(dbThoughts);
        if (!dbThoughts) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUsers);
      })
      .catch(err => res.json(err));
    },

    // update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true}
        )
        .then(dbThoughts => {
            if (!dbThoughts) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughts);
          })
          .catch(err => res.json(err));
      },
      removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbUsers => {
            if (!dbUsers) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUsers);
          })
          .catch(err => res.json(err));
      },
    // reactions
      addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbThoughts => {
                if (!dbThoughts) {
                  res.status(404).json({ message: 'No thought found with this id!' });
                  return;
                }

                res.json(dbThoughts);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    // Delete reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughts => {
                if (!dbThoughts) return res.status(404).json({ message: 'No thought found with this id!' });

                res.json(dbThoughts);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    }
    

}

module.exports = thoughtController;