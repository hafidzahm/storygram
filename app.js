const express = require('express')
const Controller = require('./controllers/controller')
const UserController = require('./controllers/UserController')
const app = express()
const port = 3000
const session = require('express-session')

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(session({
  secret: 'rahasiaa',
  resave: false,
  saveUninitialized: true,
  cookie: {
     secure: false,
     sameSite: true 
    }
}))

// homepage jika sudah login
// urutkan postingan dari yg paling baru (belum urut)

app.get('/testing', UserController.showAllUser)

// belum bang ini aku mau buat di view nya pake yang tadi di html nya

// tapi ini pake branch baru aja bang nanti terpisah gitu jadi biar ada beberapa branch yang di push
// eh gitu bagus ga sih??
// owh ok ini aku lagi di barnch asep nanti aku kerjain di sini aja dhe untuk di ejsnya tapi ngambil di branch htmldl nya
// ini udah dari main bang
// nggak ini dari main
// boleh ini aku coba ke ejs dlu ya

// jika user belum login
//redirect ke homepage
app.get('/login', UserController.loginForm)
app.post('/login', UserController.postLogin)

// logout
//redirect ke homepage
app.get('/logout', UserController.postLogout)

//jika user belum punya akun
//redirect ke halaman login
app.get('/register', UserController.registerForm)
app.post('/register', UserController.postRegister)

//middleware zone
app.use(function (req, res, next) {
  if(!req.session.userId) {
    const error = 'Harap login terlebih dahulu'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
  console.log(req.session, '<------ Session');
})

app.get('/', Controller.showAllProfilePosts)
//daftar semua tags
app.get('/tags', Controller.showAllTag)

//tags baru
app.get('/tags/add', Controller.showFormAddTag)

app.post('/tags/add', Controller.postAddTag)

//tampilkan semua postingan dari tags tsb
app.get('/tags/:tagId', Controller.showAllPostByTag)
  

//ke profil user
app.get('/profiles/:profileId', Controller.showProfileAndPostsUser)

//tambah postingan
//redirect ke homepage ('/')
app.get('/profiles/:profileId/add', Controller.showFormAddPost)
app.post('/profiles/:profileId/add', Controller.postAddPostAndTag)

//detail postingan
app.get('/profiles/:profileId/posts/:postId', Controller.showDetailPost)
// hapus postingan redirect ke /profiles/:profileId
app.get('/profiles/:profileId/posts/:postId/delete', Controller.deletePost)
//edit postingan, redirect ke /profiles/:profileId/posts/:postId/edit
app.get('/profiles/:profileId/posts/:postId/edit', Controller.showEditForm)
app.post('/profiles/:profileId/posts/:postId/edit', Controller.postEditForm)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})