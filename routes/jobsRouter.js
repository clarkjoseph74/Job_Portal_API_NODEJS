const express = require('express');
const router = express.Router();

const userAuth = require('../middlewares/authMiddleware.js');
const {createJobController , deleteJobController , getAllJobsController , getAllUserJobsController ,updateJobController, getJobsStatsController} = require('../controllers/jobsController.js');

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API operations for managing jobs
 */


/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API operations for managing jobs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         company:
 *           type: string
 *           description: Company Name
 *         position:
 *           type: string
 *           description: Position
 *         desc:
 *           type: string
 *           description: Description
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - reject
 *             - interview
 *           default: pending
 *           description: Job status
 *         workType:
 *           type: string
 *           enum:
 *             - full-time
 *             - part-time
 *             - internship
 *           default: full-time
 *           description: Type of work
 *         workLocation:
 *           type: string
 *           default: 'Egypt , Cairo'
 *           description: Work location
 *         createdBy:
 *           type: string
 *           format: uuid
 *           description: ID of the user who created the job
 *       required:
 *         - company
 *         - position
 *         - desc
 *         - workLocation
 *       example:
 *         company: Example Company
 *         position: Example Position
 *         desc: Example Description
 *         status: pending
 *         workType: full-time
 *         workLocation: Egypt, Cairo
 *         createdBy: 60c9bf58b4387c001f6161f1
 */
/**
 * @swagger
 * /all-jobs:
 *   get:
 *     summary: Get a list of all jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter jobs by status (pending, reject, interview)
 *       - in: query
 *         name: workType
 *         schema:
 *           type: string
 *         description: Filter jobs by work type (full-time, part-time, internship)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search for jobs by position
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort jobs (ascending or descending)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               totalJobs: 100
 *               jobs:
 *                 - company: Example Company
 *                   position: Example Position
 *                   desc: Example Description
 *                   status: pending
 *                   workType: full-time
 *                   workLocation: Egypt, Cairo
 *                   createdBy: user123
 *               numOfPage: 10
 *       '400':
 *         description: Bad request
 */


/**
 * @swagger
 * /update:
 *   patch:
 *     summary: Update a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the job to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *                 description: Updated company name
 *               position:
 *                 type: string
 *                 description: Updated position
 *               desc:
 *                 type: string
 *                 description: Updated description
 *               status:
 *                 type: string
 *                 enum: ['pending', 'reject', 'interview']
 *                 description: Updated job status
 *               workType:
 *                 type: string
 *                 enum: ['full-time', 'part-time', 'internship']
 *                 description: Updated type of work
 *               workLocation:
 *                 type: string
 *                 description: Updated work location
 *             anyOf:
 *               - company
 *               - position
 *               - desc
 *               - status
 *               - workType
 *               - workLocation
 *     responses:
 *       '200':
 *         description: Job updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Job not found
 */

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the job to be deleted
 *     responses:
 *       '204':
 *         description: Job deleted successfully
 *       '404':
 *         description: Job not found
 */

/**
 * @swagger
 * /job-stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               totalJobs: 100
 *               stats:
 *                 pending: 20
 *                 interview: 50
 *                 reject: 30
 *               monthlyApplications:
 *                 - date: Jan 2023
 *                   count: 10
 *                 - date: Dec 2022
 *                   count: 15
 */


router.get('/all-jobs', userAuth, getAllJobsController);



router.post('/create', userAuth, createJobController);



router.patch('/update', userAuth, updateJobController);



router.delete('/delete', userAuth, deleteJobController);



router.get('/job-stats', userAuth, getJobsStatsController);


module.exports = router;

