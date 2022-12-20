import React, { useState } from 'react';
import { render, screen, waitFor, prettyDOM } from '@testing-library/react';
import { within } from '@testing-library/dom';
import '@testing-library/jest-dom';
import App from '../App';
import { Consent, TEXT_consent_button_text, TEXT_deny_button_text } from "../components/Consent";

// Setup: render the REPL component
beforeEach(() => {
    render(<App/>);
})

afterEach(() => {
    localStorage.removeItem("cookieConsent");
});

test('Consent form is shown', () => { 
    const buttonElement = screen.getByText(new RegExp(TEXT_consent_button_text));
    expect(buttonElement).toBeInTheDocument();

    const buttonElement2 = screen.getByText(new RegExp(TEXT_deny_button_text));
    expect(buttonElement2).toBeInTheDocument();
});

// TEST localStorage
test('consent button press', () => {
    const buttonElement = screen.getByText(new RegExp(TEXT_consent_button_text));
    buttonElement.click();
    const consent: string | null = localStorage.getItem("cookieConsent");
    expect(consent).toBe("true");
});

test('deny  button press', () => {
    const buttonElement = screen.getByText(new RegExp(TEXT_deny_button_text));
    buttonElement.click();
    const consent: string | null = localStorage.getItem("cookieConsent");
    expect(consent).toBe("false");
});