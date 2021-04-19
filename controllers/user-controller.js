const { User, Thought } = require('../models')

const userController = {
    getAllUser(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUsers => res.json(dbUsers))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .select('-__v')
        .then(dbUsers => { 
            if (!dbUsers) {
                res.status(400).json({ message: "No user found with this id!"});
                return;
            }
            res.json(dbUsers);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    // create Users
    createUser({ body }, res) {
        User.create(body)
        .then(dbUsers => {
            res.json(dbUsers)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }, 

    // update users 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true})
        .then(dbUsers => {
            if(!dbUsers) {
                res.status(400).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUsers);
        })
        .catch(err => res.status(400).json(err));
    }, 

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .select('-__v')
        .then(dbUsers => res.json(dbUsers))
        .catch(err => res.json(err));

    },

    // friend routes 
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUser => {
                if (!dbUser) return res.statue(404).json({ message: 'No user found with this id!' });

                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUser => {
                if (!dbUser) return res.statue(404).json({ message: 'No user found with this id!' });

                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }

};

module.exports = userController;