import React from 'react';
import { Text, View } from 'react-native';
import { renderRouter } from 'expo-router/testing-library';
import { expect, test } from '@jest/globals';

// Mock components for testing
const HomeScreen = () => (
    <View>
        <Text>Home Screen</Text>
    </View>
);

const ProfileScreen = () => (
    <View>
        <Text>Profile Screen</Text>
    </View>
);

// Mock the router
jest.mock('expo-router', () => ({
    ...jest.requireActual('expo-router'),
    Stack: {
        Screen: ({ name }) => <Text>Screen: {name}</Text>,
    },
}));

// Mock the routes
jest.mock('expo-router/routes', () => ({
    '/': () => <HomeScreen />,
    '/profile': () => <ProfileScreen />,
}));

test('renders the home screen', async () => {
    const { getByText } = renderRouter({
        initialUrl: '/'
    });
    
    expect(getByText('Home Screen')).toBeTruthy();
});

test('renders the profile screen', async () => {
    const { getByText } = renderRouter({
        initialUrl: '/profile'
    });
    
    expect(getByText('Profile Screen')).toBeTruthy();
});