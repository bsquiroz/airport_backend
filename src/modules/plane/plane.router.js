const {
    deletePlane,
    getPlane,
    getPlanes,
    patchPlane,
    postPlane,
} = require("./plane.controller");

const { Router } = require("express");
const { restrictTo } = require("../auth/auth.middleware");

const router = Router();

router.get("/", restrictTo("receptionist", "developer", "admin"), getPlanes);
router.get("/:id", restrictTo("receptionist", "developer", "admin"), getPlane);
router.post("/", restrictTo("developer", "admin"), postPlane);
router.patch("/:id", restrictTo("developer", "admin"), patchPlane);
router.delete("/:id", restrictTo("developer", "admin"), deletePlane);

module.exports = {
    planeRouter: router,
};
