import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todo from './Todo'

describe('Todo', () => {

test('Todo renders correctly', () => {

const todo =  {
text: "Testing Todo",
done: false
}


render(<Todo todo={todo} />)
 


expect(screen.getByText(todo.text)).toBeInTheDocument()


})
})
