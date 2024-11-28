const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/blog_helper')
const config = require('../utils/config')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes: ', () => {
  const testBlogs = config.testBlogs

  test('of empty list is zero', () => {
    const emptyList = []
    assert.strictEqual(listHelper.totalLikes(emptyList), 0)
  })

  test('when list has only one blog equals likes of that', () => {
    const testList = [  {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },]

    assert.strictEqual(listHelper.totalLikes(testList), 10)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.totalLikes(testBlogs), 36)
  })
})

describe('later exercises', () => {
  test('favorite blog', () => {
  const testBlogs = config.testBlogs
  const hcFave =  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }
  
  assert.deepStrictEqual(listHelper.favoriteBlog(testBlogs), hcFave)
  })


  

})
