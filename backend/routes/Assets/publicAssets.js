const router = require("express").Router();
let publicAssets = require("../../models/Assets/publicModel");

router.route("/addAssets").post((req,res)=>{
    console.log('POST /addAssets endpoint hit');
    const Assets_Type = req.body.Assets_Type;
    const RecivedDate = new Date(req.body.RecivedDate);
    const ReserveStatues = req.body.ReserveStatues;
    const RecivaedTimePeriod = new Date(req.body.RecivaedTimePeriod);
    const maintanceCost = req.body.maintanceCost;
    const Description = req.body.Description;

    const newAssets = new publicAssets({//vehicale object

        Assets_Type,
        RecivedDate,
        ReserveStatues,
        RecivaedTimePeriod,
        maintanceCost,
        Description
    })

    newAssets.save().then(()=>{
        res.json("public assets added");
    }).catch((err)=>{
        res.json("public assets not added");
        console.log(err);
    })

});

//display all the data
router.route("/displayAssets").get((req,res)=>{
    publicAssets.find().then((PublicAssets)=>{
        res.json(PublicAssets)
    }).catch((err)=>{
        console.log(err)
    })
})

//display one
router.route("/displayAssetsone/:id").get(async (req, res) => {
    try {
        const AssetsID = req.params.id;
        const AssetsData = await publicAssets.findById(AssetsID); // Find vehicle by ID

        if (!AssetsData) {
            return res.status(404).json({ message: "Assets not found" }); 
        }
        res.json(AssetsData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//upadte record
router.route("/updateAssets/:id").put(async(req,res)=>{//can use post(put)
    let AssetsId = req.params.id;//param mean parameter above id is id
    const {Assets_Type,RecivedDate,ReserveStatues,RecivaedTimePeriod,maintanceCost,Description} = req.body;//getdetails

    const upadteAssets = {
        Assets_Type,
        RecivedDate,
        ReserveStatues,
        RecivaedTimePeriod,
        maintanceCost,
        Description 
    }
    const update = await publicAssets.findByIdAndUpdate(AssetsId,upadteAssets).then(()=>{//check vehi is avibale update object above
        //data pass to frontend
        res.status(200).send({status:"User updated"})//user:update showed update data

    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error;User Not updated",error:err.message})//send if not updated
    })

})

//Delete vehicale
router.route("/deleteAssets/:id").delete(async(req,res)=>{
    let AssetsId = req.params.id;

    await publicAssets.findByIdAndDelete(AssetsId).then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error;User Not deletd",error:err.message})
    })

})

module.exports = router;