import React, { useRef, useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export default function TestBottomSheet() {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        console.log("Presenting modal");
        bottomSheetRef.current?.present();
    }, []);

    return (
        <View style={{ padding: 24 }}>
            <Button
                title="Present Modal"
                onPress={handlePresentModalPress}
            />
            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={['25%', '50%']}
            >
                <View style={{ padding: 24 }}>
                    <Text>This is a test bottom sheet!</Text>
                </View>
            </BottomSheetModal>
        </View>
    );
} 