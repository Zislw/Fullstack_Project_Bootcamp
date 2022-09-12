const exp = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const app = exp()

//routers
const productRouter = require('./routers/products')
const userRouter = require('./routers/users')
const loginGoogleRouter=require('./routers/loginGoogle')

//connect db
async function main() {
  await mongoose.connect('mongodb://localhost:27017/project1')
}

//create sever
main().then(_ => {
  console.log('mongoose');
  app.listen(8000, _ => console.log('http://localhost:8000'))
}).catch(err =>
  console.log(err))

app.use(exp.json())
app.use(exp.urlencoded({ extended: true }))
app.use(cors())//{ origin: 'http://localhost:3000' }


app.use('/api/products',productRouter)
app.use('/api/users',userRouter)
app.use('',loginGoogleRouter)
// app.use('api/roles',roleRouter)



