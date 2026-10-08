const mongoose = require ('mongoose');



const userSchema = new mongoose.Schema({

    username:{
        type:String,
        require:true,
        unique: true
    },

    email: {
        type:String,
        require:true,
        unique: true
    },

    password: {
        type:String,
        require:true
        
    },
    role: {
        type: String,
        enum: [ 'user', 'artist' ],  // enum will make sure there is two role user and artist
        default: 'user'    // if u will not choose role  it will go default with user
    }

})


const userModel = mongoose.model("user", userSchema)

module.exports = userModel;