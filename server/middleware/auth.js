const jwt = require('jsonwebtoken')
const role_bl=require('../BL/rolesBL')
const nameOfToken = "ankaflnbakjfndbdnbjafnadbknm"

 function verifyToken(roles = []) {

    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
      async  (req, res, next) => {
        const rolesId=await role_bl.getRoleByName(roles)
            const token = await req.headers.authorization?.split(' ')[1]
            const decodedToken = await jwt.verify(
                token,
                nameOfToken//"RANDOM-TOKEN"
            )

            const user = await decodedToken
            console.log("roles from  use");
            console.log(rolesId[0].valueOf());
            console.log("myrole")
            console.log(user.userRole)
            if (rolesId.length && !rolesId.find(item=>user.userRole.includes(item.valueOf()))) {
                console.log("o");
                return res.json({ message: 'Unauthorized' })
            }
            else {
                req.user = user
                console.log('token');
                next()
            }
        }
    ]
}


    async function createToken(user) {
        const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.email,
                userRole: user.role
            },
            nameOfToken,//"RANDOM-TOKEN",
            { expiresIn: "60s" }
        )
        return token;
    }

    module.exports = { verifyToken, createToken }