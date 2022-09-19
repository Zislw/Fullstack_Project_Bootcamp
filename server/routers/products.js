const exp = require('express')
const products = require('../BL/productsBL')
const router = exp.Router()
const {verifyToken}=require('../middleware/auth')


 //router.use(verifyToken(["user","admin"]))
//  ,verifyToken(["user","admin"])
 router.get('/',verifyToken(["user"]), async (req, res) => {
    let data = await products.getAllProducts()
    return res.json(data)
})

router.get('/:id',verifyToken(["user","admin"]), async (req, res) => {
    let id = req.params.id
    let data = await products.getProductById(id)
    return res.json(data)
})

// router.use(verifyToken("admin"))

router.post('/', async (req, res) => {
    let body = req.body
    let data = await products.addProduct(body)
    return res.json(body)
})

router.put('/:id',async (req, res) => {
   
    let id = req.params.id
    let body = req.body
    let data = await products.updateProduct(id, body)
    return res.json(data)
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    let data = await products.deleteProduct(id)
    return res.json(data)
})




 


module.exports=router