import User from "../models/user.model.js"
import Message from "../models/message.model.js"


export const getUsersForSidebar = async(req, res) => {
    try{
      const loggedInUserId = req.user._id;
      const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password");

      res.status(200).json(filteredUsers);
    }catch(err){
        console.error("Error in getUsersForSidebar:", err.message);
        res.status(500).json({error: "Internal Server error"});
        
    }
}

export const getMessages = async(req, res) => {
    try{
        const {id:userToChatId} = req.params    //“Take id from req.params and store it in a variable called userToChatId” ,const userToChatId = req.params.id
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}          
            ]
        })
        res.status(200).json(messages)
    }catch(error){
        console.error("Error in getMessages:", error.message);
        res.status(500).json({error: "Internal Server error"});

    }
}

export const sendMessages = async(req, res) => {
    try{

        const {text, image} = req.body;
        const{ id: receiverId} = req.params;
        const senderId = req.user._Id;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = newMessage({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();

        //todo realtime functionality goes here => socket.io

        res.status(201).json(newMessage)

    }catch(err){
        console.error("Error in sendMessages:", err.message);
        res.status(500).json({error: "Internal Server error"});


    }
}

// git add .
// git commit -m "s"
// git push