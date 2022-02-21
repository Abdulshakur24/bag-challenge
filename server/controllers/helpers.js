const redis = require('redis')
const client = redis.createClient()

const setCache = async (key, value) => {
  await client.connect()
  const result = await client.setEx(key, 3600 * 24, JSON.stringify(value))
  await client.disconnect()
  if (result) return true
  return false
}

const getCache = async (key) => {
  await client.connect()
  const result = await client.get(key)
  await client.disconnect()
  if (result) return JSON.parse(result)
  return false
}

module.exports = {
  setCache,
  getCache,
}
