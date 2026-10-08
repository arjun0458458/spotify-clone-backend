const musicModel = require("../models/music.model")
const albumModel = require("../models/album.model") // for album model 
const  {uploadFile} = require("../services/storage.service")
const jwt = require("jsonwebtoken");


async function createMusic(req, res) {

    // const token = req.cookies.token;

    // if(!token){
    //     return res.status(401).json({
    //         message: "Unauthorized"
    //     })
    // }                                                               // Middleware doing this task

    // // We will check if artist role is present in token or not
    // try{
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET) // if token is correct then it will give the data from which token is created otherwise give error

    //     if(decoded.role !== "artist"){
    //         return res.status(403).json({
    //             message: "You don't have access to create an music"
    //         })
    //     }


    


    const {title} = req.body
    const file = req.file


    //Now imagekit se aa rhe uri buffer ko base64 me convert karenge
    const result = await uploadFile(file.buffer.toString('base64'))

    // NAye music model ko create karenge
    const music = await musicModel.create({
        uri: result.url,
        title,
        //artist: decoded.id,
        artist: req.user.id, //change as middlware updated
    })

    res.status(201).json({
        message: "Music created successfully",
        music:{
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,
        }
    })

    // }catch (err) {

    //     console.log("ACTUAL ERROR:",err)          // Middleware doing this task

    //     return res.status(500).json({
    //         //message:"Unauthorizedd"
    //         message: err.message

    //     })
    // }
    
} 


//NOW CREATE CONTROLLER FOR ALBUM
async function createAlbum(req, res) {
    // const token = req.cookies.token;

    // if(!token) {
    //     return res.status(401).json({ message: "Unauthorized" })
    // }

    // try{
                                                                                 // Middleware doing this task
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)// verify token
        
    //     if (decoded.role !== "artist") {
    //         return res.status(403).json({
    //             message: "You don't have access to create an album"
    //         })
    //     }

        const { title, music } = req.body

        //Album create karenge
        const album = await albumModel.create({
            title,
            // artist: decoded.id,
               artist: req.user.id, // as req.user has value of decoded through middleware
            musics: music
        })


        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics,
            }
        })


    // } catch(err){
    //     console.log(err);                                      // Middleware doing this task
    //     return res.status(401).json({ message: "Unauthorized" })
    // }
}



//NOW CREATE CONTROLLER WHERE USER CAN GET ALL MUSICS AND LISTENS
async function getAllMusics(req, res) {

    // const musics = await musicModel.find()
    const musics = await musicModel
    .find()
    //.skip(1) // it will skip that song(1) from databse and send other next songs on server
    .limit(2) // it will set the limit when user req for music only limited acc of music show on server
    .populate("artist", "username email" ) // It will give these details when u send req on postman after using .populate()
   
    res.status(200).json({
        message: "Musics fetched successfully",
        musicss: musics,
    })
}



async function getAllAlbums(req, res) {

    const albums = await albumModel.find().select("title artist").populate("artist", "username email")

    res.status(200).json({
        message: "Albums fetched successfully",

        albums: albums,
    })
}



async function getAlbumById(req, res) {
    
    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")

    return res.status(200).json({
        message: "Album fetched successfully",
        album : album,
    })
}



module.exports = {createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById}