const { Router } = require("express");
const {
    login,
    register,
    changePassword,
    deleteAcount,
} = require("./auth.controller");
const { protect, restrictTo } = require("./auth.middleware");
const router = Router();

router.post("/login", login);
router.post("/register", protect, restrictTo("developer"), register);
router.patch("/change-password", protect, changePassword);
router.delete("/:id", protect, deleteAcount);

module.exports = {
    authRouter: router,
};
