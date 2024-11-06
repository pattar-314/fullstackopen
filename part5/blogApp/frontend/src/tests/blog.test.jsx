import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

  const blogData = {
    title: 'this is a test',
    author: 'testy mctesterson',
    likes: 3,
    url: 'test.test',
    user: {
      name: 'pat',
      username: 'pattymcpatterson',
      id: 42069,
    }
  }

test('component displaying a blog does not initially open extended data', async () => {


  render(<Blog blog={blogData} />)

  const titleFound = screen.getByText('this is a test')
  const authorFound = screen.getByText('testy mctesterson')
  const likesFound = screen.queryByText(/3/)
  const urlFound = screen.queryByText('test.test')
  screen.debug(authorFound)
  screen.debug(likesFound)
  screen.debug(urlFound)
  expect(titleFound, authorFound).toBeDefined()
  expect(likesFound, urlFound).toBeNull()
})

test('component shows extended info when button is pressed', () => {

  const user = userEvent.setup()

  const expandButton = screen.queryByText('show')
  user.click(expandButton)

  const foundLikes = screen.queryByText('likes:')
  const foundUrl = screen.queryByText('url')

  expect(foundLikes, foundUrl).toBeDefined()
})

test('like button registers multiple clicks', () => {

  

  render(<Blog blog={blogData}  />)

  const likeFunction = vi.spyOn(handleLike)

  const extendButton = screen.queryByText('show')

  const user = userEvent.setup()
  user.click(extendButton)

  const mockHandler = vi.fn()

  const likeButton = queryByText('like')

  user.click(likeButton)
  user.click(likeButton)

  expect(likeButton.mock.calls).toHaveLength(2)
})

