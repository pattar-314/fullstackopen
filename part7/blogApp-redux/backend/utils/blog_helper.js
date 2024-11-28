const config = require("./config")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const index = 0
  return blogs.reduce((accumulator, currentValue) => currentValue.likes ? Number(accumulator) + Number(currentValue.likes) : accumulator, 0 )
}

const favoriteBlog = (blogs) => {
  const favoriteReducer = blogs.reduce((topPlace, favoriteTest) => {
    console.log(`${JSON.stringify(favoriteTest)} vs ${JSON.stringify(topPlace)}`)
    return favoriteTest.likes > topPlace.likes ? favoriteTest : topPlace
  })

  console.log(`favorite reducer: ${JSON.stringify(favoriteReducer)}`)

  return favoriteReducer
}



module.exports = { dummy, totalLikes, favoriteBlog }