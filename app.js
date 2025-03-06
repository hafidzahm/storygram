const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'));

// homepage jika sudah login
// urutkan postingan dari yg paling baru (belum urut)
app.get('/', Controller.showAllProfilePosts)
// app.get('/testing', Controller.showAllPostTag)

// belum bang ini aku mau buat di view nya pake yang tadi di html nya

// tapi ini pake branch baru aja bang nanti terpisah gitu jadi biar ada beberapa branch yang di push
// eh gitu bagus ga sih??
// owh ok ini aku lagi di barnch asep nanti aku kerjain di sini aja dhe untuk di ejsnya tapi ngambil di branch htmldl nya
// ini udah dari main bang
// nggak ini dari main
// boleh ini aku coba ke ejs dlu ya

// jika user belum login
//redirect ke homepage
app.get('/login', (req, res) => {
    res.send('Hello World!')
  })
app.post('/login', (req, res) => {
    res.send('Hello World!')
  })
//jika user belum punya akun
//redirect ke halaman login
app.get('/register', (req, res) => {
    res.send('Hello World!')
  })
app.post('/register', (req, res) => {
    res.send('Hello World!')
  })

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