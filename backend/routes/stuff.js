const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff")

// Route to handle POST requests
router.post('/', stuffCtrl.cretThing );
router.get("/:_id",stuffCtrl.modifyThing );
router.delete("/:_id", stuffCtrl.deletThing);
router.put("/:_id",stuffCtrl.getOneThing );
router.get('/', stuffCtrl.getAllThings );


module.exports = router;