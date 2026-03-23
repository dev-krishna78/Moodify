const mongoose  = require("mongoose")

async function connectToDb(){
    await mongoose.connect(process.env.MONGOOSE_URI)

    .then(()=>{
        console.log("connect to database")
})
  .catch(err => {
    console.log("Error connecting to DB", err)
  })
}


module.exports = connectToDb 