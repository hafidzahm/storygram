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

  //tampilkan semua tags
  static async showAllTag(req, res) {
    try {
      let data = await Tag.findAll()
      res.json(data)
    } catch (error) {
      res.send(error)
    }
  }

  //tampilkan semua postingan dari tags tsb (tagid) 
  static async showAllPostByTag(req, res) {
    try {
      let {tagId} = req.params
      let data = await Tag.findOne({
        include: 'Posts',
        where: {
          id: tagId
        }
      })

      res.json(data)
    } catch (error) {
      res.send(error) 
    }
  }
}
module.exports = Controller;
