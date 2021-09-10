import React from 'react'
import { render } from '@testing-library/react'
import Translations from '.'
const sut = render(
    <Translations />
)

describe('Translations component', () => {
  test.only('should ', async () => {
    const select = await sut.getByTestId('translations-select')

    expect(select.childNodes.length).toBe(2)
  })
})
