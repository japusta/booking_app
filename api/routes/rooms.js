import express from "express"
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room_controller.js"
import {verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router()
//CREATE

router.post("/:hotelid",verifyAdmin, createRoom)

//UPDATE
router.put("/:id",verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability);


//DELETE
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)
//GET
router.get("/:id", getRoom)
//GET ALL
router.get("/", getAllRooms
    // const failed = true
    
    // if(failed){
        
    //     return next(createError(401, "not auth"))
    // }
    
    )

export default router