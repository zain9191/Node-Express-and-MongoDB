const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const stuffCtrl = require("../controllers/stuff");

// Route to handle POST requests
router.post('/',auth, stuffCtrl.cretThing );
router.get("/:_id",auth,stuffCtrl.modifyThing );
router.delete("/:_id",auth, stuffCtrl.deletThing);
router.put("/:_id",auth, stuffCtrl.getOneThing );
router.get('/',auth, stuffCtrl.getAllThings );


module.exports = router;