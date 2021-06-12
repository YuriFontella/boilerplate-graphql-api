const faker = require('faker')

exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE cats RESTART IDENTITY CASCADE')

  const [users] = await knex('users').count()

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  return knex('cats').del()
    .then(() => {
      return knex('cats').insert(
        Array(8).fill(null).map(() => ({
          name: faker.animal.cat(),
          user_id: random(1, users.count),
          image: `https://placekitten.com/200/${random(200, 220)}`
        }))
      )
    })
}
