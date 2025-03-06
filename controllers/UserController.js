const {User, Profile} = require('../models')
class UserController {
    static registerForm(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            console.log(req.body);
            let userId = await User.max('id') //rawan bug
            let {name, username, gender, email, password, role, age} = req.body
            await User.create({
                username, password, email, role
            })
            await Profile.create({
                name, gender, age, UserId : +userId + 1
            })

            res.redirect('/login')

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    // static async showAllUser(req,res) {
    //     try {
    //        let data = await User.findAll({
    //         include: 'Profile'
    //        })
    //        res.json(data)
    //     } catch (error) {
    //         res.send(error)
    //     }
    // }//testing

    static loginForm(req, res) {
        try {
            res.render('login')
        } catch (error) {
            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {
           console.log(req.body); 
        } catch (error) {
            res.send(error)
        }
    }


}
module.exports = UserController