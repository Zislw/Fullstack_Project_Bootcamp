const exp = require('express')
const router = exp.Router()
const jwt = require('jsonwebtoken')
require("dotenv").config()
const passport = require("passport");
// const gapi=require('gapi')
require("../passportConfig")(passport);




router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })//,
    // (req,res)=>{
    //     res.redirect('/callback')
    // }
);

router.get(
    "/auth/google/callback",
    // passport.authenticate('google', { session: false }),
    (req, res) => {
        console.log(req.user);
        jwt.sign(
            { user: req.user },
            "secretKey",
            { expiresIn: "1h" },
            (err, token) => {
                if (err) {
                    return res.json({
                        token: null,
                    });
                }

                res.json({
                    token
                });
                //  res.redirect('/profile')
            }
        );
    }
);

router.get("/profile", passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        console.log(req.user);
     //   fetch('https://www.googleapis.com/oauth2/v2/userinfo?access_token=')
        res.send("Welcome")
        // let google = require('googleapis').google
        // let OAuth2 = google.auth.OAuth2
        // let oauth2Client = new OAuth2()
        // let oauth2 = google.oauth2({
        //     auth: oauth2Client,
        //     version: 'v2'
        // })
        // oauth2.userinfo.get(
        //     function (err, res) {
        //         if (err)
        //             console.log(err)
        //         else
        //             console.log(res)
        //     }
      //  )
     // let auth2=gapi.auth2.init()
      
    });
module.exports = router