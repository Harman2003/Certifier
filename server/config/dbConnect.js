const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.set("strictQuery", true);
    try {
        await mongoose.connect(
          process.env.MONGO_URI,
          {
            useUnifiedTopology: true,
            useNewUrlParser: true,
          }
        );
    } catch(err) {
        console.log(err)
    }
    
}
module.exports= connectDB