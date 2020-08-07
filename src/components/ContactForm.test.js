import React from 'react';
import {
    render,
    screen,
    fireEvent,
    act
} from '@testing-library/react';
import ContactForm from './ContactForm';

test('Renders form without errors', () => {
    render( < ContactForm /> )
})

test('Adds user information when user form filled out and submitted', async() => {
    // render ContactForm
    render( < ContactForm /> )


    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    
    fireEvent.change(firstNameInput, {
        target: {
            value: "Hanina"
        }
    });
    fireEvent.change(lastNameInput, {
        target: {
            value: "Syed"
        }
    });
    fireEvent.change(emailInput, {
        target: {
            value: "hanina_syed@yahoo.com"
        }
    });
    fireEvent.change(messageInput, {
        target: {
            value: "Hello!"
        }
    });

    const submitBtn = screen.getByRole('button', {
        name: /submit/i
    });

    await act(async () => {
        fireEvent.click(submitBtn);
    })
    expect(screen.getByText(/hanina/i)).toBeInTheDocument();

    await act(async () => {
        fireEvent.blur(firstNameInput);
        fireEvent.blur(lastNameInput);
        fireEvent.blur(emailInput);
        fireEvent.blur(messageInput)
    })

    const error = screen.queryByText(/looks like there was an error/i)
    expect(error).not.toBeInTheDocument()

})