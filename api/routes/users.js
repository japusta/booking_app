import express from "express"
import {updateUser, deleteUser, getUser, getAllUsers} from "../controllers/user_controller.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"


const router = express.Router()

router.get("/checkauth", verifyToken, (req,res,next) => {
    res.send("hello you are logged in")
})

router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
    res.send("hello user, you are logged in and you can delete your account")
})

router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("hello ADMIN, you are logged in and you can delete all accounts")
})

//UPDATE
router.put("/:id",verifyUser, updateUser)
//DELETE
router.delete("/:id",verifyUser, deleteUser)
//GET
router.get("/:id",verifyUser, getUser)
//GET ALL
router.get("/",verifyAdmin, getAllUsers
    // const failed = true
    
    // if(failed){
        
    //     return next(createError(401, "not auth"))
    // }
    
    )

export default router