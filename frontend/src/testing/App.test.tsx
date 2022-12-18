import React, { useState } from 'react';
import { render, screen, waitFor, prettyDOM } from '@testing-library/react';
import { within } from '@testing-library/dom';
import '@testing-library/jest-dom';
import App from '../App';
import { TEXT_calendar_button, TEXT_preferences_button } from '../components/Navigator';



beforeEach(() => {
    render(<App />);
})

test('renders navigator architecture correctly', () => {
    const calendarButton = screen.getByLabelText(new RegExp(TEXT_calendar_button))
    expect(calendarButton).toBeInTheDocument()
    const preferencesButton = screen.getByLabelText(new RegExp(TEXT_preferences_button))
    expect(preferencesButton).toBeInTheDocument()
});