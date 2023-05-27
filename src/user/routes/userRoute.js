const { getAllUsers, getUserById, deleteUser, updateUser, signIn, addNewUser } = require('../controller/userController')
const isValidate = require('../../../common/middleware/isValidate')
const { addUserSchema, signInSchema } = require('../joi/userValidation')

const router = require('express').Router()

router.get('/user',getAllUsers)
router.get('/user:id',getUserById)
router.post('/user',isValidate(addUserSchema),addNewUser)
router.post('/auth',isValidate(signInSchema),signIn)
router.delete('/user:id',deleteUser)
router.put('/user:id',updateUser)

module.exports = router;
