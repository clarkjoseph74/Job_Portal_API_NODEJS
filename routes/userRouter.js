const express = require('express');
const userAuth = require('../middlewares/authMiddleware');
const updateUserController = require('../controllers/userController');
const getUsersController = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /update:
 *   patch:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email for the user
 *               password:
 *                 type: string
 *                 description: New password for the user
 *               location:
 *                 type: string
 *                 description: New location for the user
 *             required:
 *               - name
 *               - email
 *               - password
 *               - location
 *     responses:
 *       '200':
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 _id: 60c9bf58b4387c001f6161f1
 *                 name: New Name
 *                 email: newemail@example.com
 *                 locations: New Location
 *               token: eyJhbGciOiJIUzI1NiIsIn...
 *       '400':
 *         description: Bad request
 */

router.put('/update', userAuth , updateUserController)
router.get('/', getUsersController)

module.exports = router