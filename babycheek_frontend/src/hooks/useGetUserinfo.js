import * as React from 'react';

export function useGetUserInfo() {
    // Add a way to fetch user info here either directly from BE or redux

    return {
        firstName: "Leanne",
        lastName: "Dang",
        avatarURL: '/assets/avatar_leanne.jpeg',
        country: 'USA',
        city: 'Seattle',
        state: 'Washington',
        timezone: 'GTM-7',
        phoneNumber: '',
        email: '',
    }
}