const {
    deletePlane,
    getPlane,
    getPlanes,
    patchPlane,
    postPlane,
} = require("./plane.controller");

const { Router } = require("express");

const router = Router();

router.get("/", getPlanes);
router.get("/:id", getPlane);
router.post("/", postPlane);
router.patch("/:id", patchPlane);
router.delete("/:id", deletePlane);

module.exports = {
    planeRouter: router,
};
