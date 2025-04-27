import express from 'express';
import { OrganizationController } from '../controllers/OrganizationController.js';
const controller = new OrganizationController();
const router = express.Router();

router.get('/organization/staff', controller.getOrganizationsOfStaff);
router.get('organization/:id', controller.getOrganization);
router.get('/organization', controller.getOrganizations);

export default router;  