import {Router} from 'express';
import {createUser} from "../controllers/create-user-controller";
import {getUsers} from "../controllers/get-users-controller";

const router = Router();

router.get('/users', getUsers);
router.post('/create-user',createUser)

export default router;
