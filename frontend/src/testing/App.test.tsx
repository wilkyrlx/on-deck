import React, { useState } from 'react';
import { render, screen, waitFor, prettyDOM } from '@testing-library/react';
import { within } from '@testing-library/dom';
import '@testing-library/jest-dom';
import App from '../App';
import { TEXT_calendar_button, TEXT_preferences_button } from '../components/Navigator';
import { mockEvents, MockRepository } from '../data/mock';
import { accessibleEvent } from '../components/MainCalendar';



beforeEach(() => {
    render(<App repository={new MockRepository()} />);
})

test('renders navigator architecture correctly', () => {
    const calendarButton = screen.getByLabelText(new RegExp(TEXT_calendar_button))
    expect(calendarButton).toBeInTheDocument()
    const preferencesButton = screen.getByLabelText(new RegExp(TEXT_preferences_button))
    expect(preferencesButton).toBeInTheDocument()
});

test('renders events correctly', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const todayEvents = mockEvents.filter(e => e.startTime.getDay() == new Date().getDay())
    const notTodayEvents = mockEvents.filter(e => e.startTime.getDay() != new Date().getDay())
    todayEvents.forEach((event) => {
        const label = "Calendar game:" + accessibleEvent(event)
        const eventItem = screen.getByLabelText(label)
        expect(eventItem).toBeInTheDocument()
    })
})

test('renders highlights correctly', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockEvents.forEach((event) => {
        const label = "Highlighted game:" + accessibleEvent(event)
        const eventItem = screen.getByLabelText(label)
        expect(eventItem).toBeInTheDocument()
    })
})