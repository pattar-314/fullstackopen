import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from '../src/components/NoteForm'
import { expect, test } from 'vitest'


test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  console.log('test 1')
  const createNote = vi.fn()

  render(<NoteForm createNote={createNote} />)

  const input = screen.getByPlaceholderText('write note content here')
  const sendButton = screen.getByText('save')

  const user = userEvent.setup()

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  console.log('content: ', createNote.mock.calls)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})