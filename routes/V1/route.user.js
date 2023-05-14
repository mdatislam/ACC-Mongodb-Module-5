const express = require('express')
const userController = require('../../controller/user.controller')
const router = express.Router()


router
  .route("/random")
  /**
   * @api {get} /get a  user
   * @apiDescription Get a random  user
   * @apiPermission all
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the user.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */

  .get(userController.getRandomUser);

  /**
   * @api {get} /get a  user
   * @apiDescription Get a random  user
   * @apiPermission all
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the user.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */

router.route("/all").get(userController.getAllUsers);
router.route("/:id").get(userController.getUserDetail);
router.route("/save").post(userController.addUser);
router.route("/update/:id").patch(userController.updateUser);
router.route("/delete/:id").delete(userController.deleteUser);

module.exports=router