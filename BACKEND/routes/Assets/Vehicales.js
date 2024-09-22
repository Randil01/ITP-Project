const router = require("express").Router();

let vehicle = require("../../models/Assets/VehicalesModel");

//creating one calling-add
//add new vehi
router.route("/add").post((req,res)=>{
    
    const Vehicale_Number = req.body.Vehicale_Type;
    const Vehicale_Type = req.body.Vehicale_Type;
    const RecivedDate = Date(req.body.RecivedDate);
    const LastMaintanceDate = Date(req.body.LastMaintanceDate);
    const ReserveStatues = req.body.ReserveStatues;
    const Descrption = req.body.Descrption;

    const newVehicale = new vehicle({//vehicale object
        
        Vehicale_Number,
        Vehicale_Type,
        RecivedDate,
        LastMaintanceDate,
        ReserveStatues,
        Descrption
    })

    newVehicale.save().then(()=>{
        res.json("Vehicale added");
    }).catch((err)=>{
        res.json("Vehicale not added");
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

//display one
router.route("/displayVehione/:id").get(async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const vehicleData = await vehicle.findById(vehicleId); // Find vehicle by ID

        if (!vehicleData) {
            return res.status(404).json({ message: "Vehicle not found" }); 
        }
        res.json(vehicleData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//upadte record
router.route("/updateVehi/:id").put(async(req,res)=>{//can use post(put)
    let vehiId = req.params.id;//param mean parameter above id is id
    const {Vehicale_Number,Vehicale_Type,RecivedDate,LastMaintanceDate,ReserveStatues,Descrption} = req.body;//getdetails

    const upadteVehi = {
        Vehicale_Number,
        Vehicale_Type,
        RecivedDate,
        LastMaintanceDate,
        ReserveStatues,
        Descrption  
    }
    const update = await vehicle.findByIdAndUpdate(vehiId,upadteVehi).then(()=>{//check vehi is avibale update object above
        //data pass to frontend
        res.status(200).send({status:"User updated"})//user:update showed update data

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