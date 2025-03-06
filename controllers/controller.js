const { Tag, Post, Profile, User, PostTag } = require("../models");
const {Op} = require('sequelize')
class Controller {
  // tampilkan semua postingan dari semua user di homepage
  static async showAllProfilePosts(req, res) {
    try {
      // const { search } = req.query;
      // let data = await Post.showAllProfilePosts();
      // console.log(data.map(el => el.toMinutesAgoFormat()),'<----------Implementasi toMinutesAgo()');
      // // res.json(data);
      // res.render('landing', {data})
      const { search } = req.query;
        let data = await Post.showAllProfilePosts(); 

        if (search) {
            data = data.filter(post => 
                post.titlePost.toLowerCase().includes(search.toLowerCase()) ||
                post.captionPost.toLowerCase().includes(search.toLowerCase()) 
            );
        }

        console.log(data.map(el => el.toMinutesAgoFormat()), '<----------Implementasi toMinutesAgo()');
        res.render('landing', { data }); 
    } catch (error) {
      res.send(error);
    }
  }

  // tampilkan profil user dan postingan user
  static async showProfileAndPostsUser(req, res) {
    try {
      let {userId} = req.session
      let { profileId } = req.params;

      if(userId) {
        profileId = userId
      }
      
      let data = await Profile.findOne({
        include: ["Posts", "User"],
        where: {
          id: +profileId,
        },
      });
      console.log(data);
      // res.json(data);
      res.render('profile', {data, profileId})
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //tampilkan semua tags
  static async showAllTag(req, res) {
    try {
      let data = await Tag.findAll();
      // res.json(data);
      res.render('allTags', {data})
    } catch (error) {
      res.send(error);
    }
  }

  //tampilkan semua postingan dari tags tsb (tagid)
  static async showAllPostByTag(req, res) {
    try {
      let { tagId } = req.params;
      let data = await Tag.findOne({
        include: "Posts",
        where: {
          id: tagId,
        },
      });

      res.json(data);
    } catch (error) {
      res.send(error);
    }
  }

  //tampilkan detail postingan
  static async showDetailPost(req, res) {
    try {
      let { profileId, postId } = req.params;
      let { userId } = req.session
      if(userId) {
        profileId = userId
      }
      let data = await Post.findOne({
        include: "Tags",
        where: {
          id: +postId,
          ProfileId: +profileId,
        },
      });

      res.json(data);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  // tampilkan formulir tambah postingan
  static async showFormAddPost(req, res) {
    try {
      let { profileId } = req.params;
      let {userId} = req.session
      if (userId) {
        profileId = userId
      }
      let tags = await Tag.findAll();
      res.render("form", { profileId, tags });
    } catch (error) {
      res.send(error);
    }
  }

  //kirim data postingan baru
  static async postAddPostAndTag(req, res) {
    try {
      let { profileId } = req.params;
      let {userId} = req.session
      if (userId) {
        profileId = userId
      }
      console.log(profileId, 'userSession');
      let { titlePost, imagePost, captionPost, tagId } = req.body;
      let postId = await Post.max("id");
      console.log(postId, "<------ postId");
      await Post.create({
        titlePost,
        picturePost: imagePost,
        captionPost,
        ProfileId: profileId,
      });

      await PostTag.create({
        PostId: +postId + 1,
        TagId: tagId,
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  // delete post
  static async deletePost(req, res) {
    try {
      let { profileId, postId } = req.params;
      let {userId} = req.session
      if (userId) {
        profileId = userId
      }
      let data = await Post.findOne({
        where: {
          ProfileId: profileId,
          id: postId,
        },
      });

      await PostTag.destroy({
        where: {
          PostId: postId,
        },
      });

      await data.destroy();

      res.redirect(`/profiles/${profileId}`);
    } catch (error) {
      res.send(error);
    }
  }

  // show edit form
  static async showEditForm(req, res) {
    try {
      let { profileId, postId } = req.params;
      let {userId} = req.session
      if (userId) {
        profileId = userId
      }
      let tags = await Tag.findAll();
      let data = await Post.findOne({
        include: "Tags",
        where: {
          id: +postId,
          ProfileId: +profileId,
        },
      });
      let dataPost = data
      let tagPost = data.Tags
     
      res.render('edit', {dataPost, tagPost, tags, profileId, postId})
    } catch (error) {
      res.send(error);
    }
  }

  //kirim data yg udh di edit
  static async postEditForm(req, res) {
    try {

      let { profileId, postId } = req.params;
      let { titlePost, imagePost, captionPost, tagId } = req.body;
      let {userId} = req.session
      if (userId) {
        profileId = userId
      }

      console.log(postId, "<------ postId");
      await Post.update({
        titlePost,
        picturePost: imagePost,
        captionPost
      }, {
        where: {
          ProfileId: profileId,
          id: postId
        }
      });

      await PostTag.update({
        TagId: tagId,
      }, {
        where: {
          PostId: postId
        }
      });
      res.redirect(`/profiles/${profileId}/posts/${postId}`);
    } catch (error) {
      res.send(error)
    }
  }

  //tampilkan form tambah tag
  static async showFormAddTag(req, res) {
    try {
      res.render('add-tag')
    } catch (error) {
      res.send(error)
    }
  }

  static async postAddTag(req, res) {
    try {
      let {tagName} = req.body
      await Tag.create({tagName})
      res.redirect('/tags')
    } catch (error) {
      res.send(error)
    }
  }
}
module.exports = Controller;
