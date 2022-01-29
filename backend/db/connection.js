const mongoose = require('mongoose')

const DB = process.env.DATABASE
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connected')
  })
  .catch((err) => console.log(`error connecting Db: ${err}`))
