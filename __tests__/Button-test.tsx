import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, TouchableOpacity, View } from 'react-native';

// A simple button component for testing
const Button = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} accessibilityLabel={title}>
        <View>
            <Text>{title}</Text>
        </View>
    </TouchableOpacity>
);

describe('Button Component', () => {
    test('calls onPress function when pressed', () => {
        // Arrange
        const onPressMock = jest.fn();
        const { getByLabelText } = render(
            <Button onPress={onPressMock} title="Press Me" />
        );
        
        // Act
        fireEvent.press(getByLabelText('Press Me'));
        
        // Assert
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
    
    test('renders the correct title', () => {
        // Arrange
        const { getByText } = render(
            <Button onPress={() => {}} title="Hello World" />
        );
        
        // Act & Assert
        expect(getByText('Hello World')).toBeTruthy();
    });
});