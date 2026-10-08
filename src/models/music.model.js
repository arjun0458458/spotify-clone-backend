const mongoose = require ('mongoose')

const musicSchema = new mongoose.Schema({
    uri:{          // it is music which will go on imageKit then url will returned
        type:String,
        required:true,
    },
    title:{
        type: String,
        required: true,
    },
    // now kis artist ne ye create kara hai usse id se mark karenge
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // artist ki details 'user' collection se save ho rhi so 'user' ka ref denge. In user.model.js
        required:true
    }
})


const musicModel = mongoose.model("music", musicSchema)

module.exports = musicModel