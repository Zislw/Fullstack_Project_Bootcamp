const exp=require('express')
const router=exp.Router()
const {verifyToken}=require('../middleware/auth')
const role_bl=require('../BL/rolesBL')

const users=require('../BL/usersBL')




router.post('/' , async(req,res)=>{
    let u=req.body
    let data=await users.createUser(u)
    return res.json(data)
})

router.post('/login',async(req,res)=>{
    let email=req.body.email
    let password=req.body.password
    let data=await users.login(email,password)
    return res.json(data)
})


router.use(verifyToken("admin"))

router.get('/',async (req,res)=>{
    let data= await users.getAllUsers()
    return res.json(data)
})


router.put('/:id',async (req,res)=>{
    let id=req.params.id
    let u=req.body
    let data=await users.updateUser(id,u)
    return res.json(data)
})

router.delete('/:id',async (req,res)=>{
    let id=req.params.id  
    let data=await users.deleteUser(id)
    return res.json(data)
})


// router.use(verifyToken(role_bl.getRoleByName(["admin","user"])))

router.get('/:id' ,verifyToken(["admin","user"]),async (req,res)=>{
    let id=req.params.id
    let data=await users.getUserById(id)
    return res.json(data)
})




module.exports=router
