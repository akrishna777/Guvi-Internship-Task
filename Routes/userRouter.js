import express from 'express'

import { signin, signup, updateUser } from '../Controllers/userController.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/updateUser', updateUser)

export default router
