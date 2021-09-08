const router = require('express').Router()

const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');
const Accounts = require('./accounts-model');

router.get('/', async (req, res, next) => {
try {
  const accounts = await Accounts.getAll()
  res.json(accounts)
} catch(error) {
next(error)
}
})

router.get('/:id', checkAccountId, (req, res, next) => {
   try{
      res.json(req.account)
    } catch {
      next()
    }     
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  try {
    const newAccount = Accounts.create(req.account)
    res.status(201).json(newAccount)
  } catch (err){
    next(err)
  } 
})

router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  try {
    const { id } = req.params.id
    const editedAccount = Accounts.updateById(id, req.body)
      res.json(editedAccount)
      } catch (err){
    next(err)
  } 
})

router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params.id
    const account = Accounts.getById(id)
    if(account) {
      Accounts.deleteById(id)
      res.jason(account)
    }
  } catch (err){
    next(err)
  } 
})

module.exports = router;

