const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

const create = async account => {
  const[id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = (id, account) => {
  return db('accounts').update({id: id, account: account})
}

const deleteById = id => {
  return db('accounts').where({id : id}).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}