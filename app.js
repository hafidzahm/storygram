const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
// homepage jika sudah login
// urutkan postingan dari yg paling baru
app.get('/', Controller.showAllProfilePosts)

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
app.get('/tags', (req, res) => {
    res.send('Hello World!')
  })

//tags baru
app.get('/tags/add', (req, res) => {
    res.send('Hello World!')
  })

app.post('/tags/add', (req, res) => {
    res.send('Hello World!')
  })

//tampilkan semua postingan dari tags tsb
app.get('/tags/:tagsId', (req, res) => {
    res.send('Hello World!')
  })
  

//ke profil user
app.get('/profiles/:profileId', (req, res) => {
  res.send('Hello World!')
})
//tambah postingan
//redirect ke homepage
app.get('/profiles/:profileId/add', (req, res) => {
  res.send('Hello World!')
})
app.post('/profiles/:profileId/add', (req, res) => {
  res.send('Hello World!')
})
//tampilkan semua postingan dari user yg login, tampilkan dari yang terbaru
app.get('/profiles/:profileId/posts', (req, res) => {
    res.send('Hello World!')
  })
//detail postingan
app.get('/profiles/:profileId/posts/:postId', (req, res) => {
    res.send('Hello World!')
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})