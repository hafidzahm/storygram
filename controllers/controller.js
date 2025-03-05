const {Tag, Post, Profile, User, PostTag} = require('../models')
class Controller {
    // tampilkan semua postingan dari semua user di homepage
  static async showAllProfilePosts(req, res) {
    try {
        let data = await Post.showAllProfilePosts() 
        res.json(data)
    } catch (error) {
        res.send(error)
    }
  }
}
module.exports = Controller;
