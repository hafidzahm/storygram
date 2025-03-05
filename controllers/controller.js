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

  // tampilkan profil user dan postingan user
  static async showProfileAndPostsUser(req, res) {
    try {
      let {profileId} = req.params
      let data = await Profile.findOne({
        include: ['Posts', 'User'],
        where: {
          id: +profileId
        },
      })
      res.json(data)
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
module.exports = Controller;
