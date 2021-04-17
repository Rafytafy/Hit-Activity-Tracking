import React from 'react'
import {render, fireEvent} from "@testing-library/react-native"
import Login from "../components/login"
it("renders default elemets", () => {
        const {getAllByText,getByPlaceholderText} =render(<Login />);
 
    expect (getAllByText("Login").length).toBe(1)
        getByPlaceholderText("E-mail")
})
  
