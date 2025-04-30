import React, { useRef, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function BottomSheetTest() {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        console.log("Presenting test modal");
        bottomSheetRef.current?.present();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <Text style={styles.title}>Bottom Sheet Test</Text>
                    <Button
                        title="Open Bottom Sheet"
                        onPress={handlePresentModalPress}
                    />

                    <BottomSheetModal
                        ref={bottomSheetRef}
                        index={0}
                        snapPoints={['25%', '50%']}
                    >
                        <View style={styles.contentContainer}>
                            <Text>This is a test bottom sheet!</Text>
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
    },
}); 