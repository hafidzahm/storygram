const {Tag, Post, Profile, User, PostTag} = require('../models')
class Controller {
  static async showAllProfilePosts(req, res) {
    try {
        let data = Post.showAllProfilePosts() 
        res.json(data)
    } catch (error) {
        res.send(error)
    }
  }
}
module.exports = Controller;
