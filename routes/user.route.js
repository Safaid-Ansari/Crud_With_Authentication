const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const protect = require("../middleware/protect");

/**
 * @openapi
 * /user/register:
 *   post:
 *     summary: User Signup
 *     description: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupInput'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Invalid request data
 *       '500':
 *         description: Internal server error
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     SignupInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the user's account
 *         confirm_password:
 *           type: string
 *           format: password
 *           description: Password for the user's account
 */

router.post("/register", userController.register);

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: User Login
 *     description: Login User and access the jwt token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginInput'
 *     responses:
 *       '201':
 *         description: Login Successfully
 *       '400':
 *         description: Invalid request data
 *       '500':
 *         description: Internal server error
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     loginInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the user's account
 */

router.post("/login", userController.login);
/**
 * @openapi
 * /user/welcome:
 *   get:
 *     summary: welcome message to the user if user is authenticated
 *     description: Check out the protect routes
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: integer
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 */
router.get("/welcome", protect, userController.welcomeUser);

/**
 * @openapi
 * /user/updateUser/{id}:
 *   put:
 *     summary: Update a user's profile
 *     description: Update a user using jwt token
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateUserInput'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Invalid request data
 *       '500':
 *         description: Internal server error
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     updateUserInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the user's account
 */

router.put("/updateUser/:id", protect, userController.updateUser);

/**
 * @openapi
 * /user/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete an existing user based on their ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/deleteUser/:id", protect, userController.deleteUser);

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: integer
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 */

router.get("/", protect, userController.getUser);

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user's information based on their ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: integer
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

router.get("/:id", protect, userController.getUserById);
module.exports = router;
