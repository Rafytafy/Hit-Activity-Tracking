import React from 'react'
import {render, fireEvent} from "@testing-library/react-native"
import Profile from "../Components/Main/Profile"
it('handles add date',()=>{

const {getByText,getByPlaceholderText}= render(<Profile />)
fetch.mockResponseOnce(JSON.stringify({passes:true}))
fireEvent.changeText(getByPlaceholderText('175'),'155')
fireEvent.press(getByText('Add Weight'))

})