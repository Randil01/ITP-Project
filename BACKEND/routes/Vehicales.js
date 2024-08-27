const router = require("express").Router();
const VehicaleAssets = require("../models/VehicalesModel");
let vehicle = require("../models/VehicalesModel");

//creating one calling-add
router.route("/add").post((req,res)=>{
    
    const Vehicale_Type = req.body.Vehicale_Type;
    const RecivedDate = Date(req.body.RecivedDate);
    const LastMaintanceDate = Date(req.body.LastMaintanceDate);
    const ReserveStatues = req.body.ReserveStatues;
    const Descrption = req.body.Descrption;

    const newVehicale = new vehicle({//vehicale object

        Vehicale_Type,
        RecivedDate,
        LastMaintanceDate,
        ReserveStatues,
        Descrption
    })

    newVehicale.save().then(()=>{
        res.json("Vehicale added");
    }).catch((err)=>{
        console.log(err);
    })

});

//display all the data
router.route("/displayVehi").get((req,res)=>{
    vehicle.find().then((Vehicle)=>{
        res.json(Vehicle)
    }).catch((err)=>{
        console.log(err)
    })
})

//upadte record
router.route("/updateVehi/:id").put(async(req,res)=>{//can use post(put)
    let vehiId = req.params.id;//param mean parameter above id is id
    const {type,recivedDate,MaintanceDate,reserveStatues,descrption} = req.body;//getdetails

    const upadteVehi = {
        Vehicale_Type,
        RecivedDate,
        LastMaintanceDate,
        ReserveStatues,
        Descrption  
    }
    const update = await vehicle.findByIdAndUpdate(vehiId,upadteVehi).then(()=>{//check vehi is avibale update object above
        //data pass to frontend
        res.status(200).send({status:"User updated",user:update})//user:update showed update data

    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error;User Not updated",error:err.message})//send if not updated
    })

})
//update end

//Delete vehicale
router.route("/deleteVehi/:id").delete(async(req,res)=>{
    let vehiId = req.params.id;

    await vehicle.findByIdAndDelete(vehiId).then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error;User Not deletd",error:err.message})
    })

})

module.exports = router;