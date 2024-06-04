import {Router} from 'express';
import {createUser} from "../controllers/create-user-controller";
import {getUsers} from "../controllers/get-users-controller";
import {loginUser} from "../controllers/login-controller";
import {authJWT} from "../middleware/authMiddleware";

const router = Router();

router.get('/users', authJWT, getUsers);
router.post('/create-user',createUser);
router.post('/login', loginUser);

export default router;
