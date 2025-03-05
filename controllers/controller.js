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

  //tampilkan detail postingan
  static async showDetailPost(req, res) {
    try {
      let {profileId, postId} = req.params
      let data = await Post.findOne({
        include: 'Tags',
        where: {
          id: +postId,
          ProfileId: +profileId
        }
      })

      res.json(data)
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  //tambah postingan baru
  static async postAddPostAndTag(req, res) {
    try {
      let {profileId} = req.params
      console.log(profileId);
      let {titlePost, imagePost, captionPost, tagId} = req.body
      await Post.create({
        titlePost, 
        picturePost: imagePost,
        captionPost,
        ProfileId: profileId,
        Tags: {
          "TagId": tagId
        }
      })
      res.redirect('/')
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async showFormAddPost(req, res) {
    try {
      let {profileId} = req.params
      let tags = await Tag.findAll()
      res.render('form', {profileId, tags})
    } catch (error) {
      res.send(error)
    }
  }
  static async postAddPostAndTag(req, res) {
    try {
      let {profileId} = req.params
      console.log(profileId);
      let {titlePost, imagePost, captionPost, tagId} = req.body
      let postId = await Post.max('id')
      console.log(postId, '<------ postId');
      await Post.create({
        titlePost, 
        picturePost: imagePost,
        captionPost,
        ProfileId: profileId,
      })

      await PostTag.create({
        PostId: +postId + 1,
        TagId: tagId
      })
      res.redirect('/')
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }
  //tampilkan form add post
  static async showFormAddPost(req, res) {
    try {
      let {profileId} = req.params
      let tags = await Tag.findAll()
      res.render('form', {profileId, tags})
    } catch (error) {
      res.send(error)
    }
  }
  //delete post
  // static async deletePost(req, res) {
  //   try {
  //     let {profileId, postId} = req.params
  //     await Post.destroy({
  //       where: {
  //         ProfileId: profileId,
  //         id: postId
  //       }
  //     })
  //     res.redirect(`/profiles/${profileId}`)
  //   } catch (error) {
  //     res.send(error)
  //   }
  // }

}
module.exports = Controller;
