import { useEffect, useRef } from 'react';
import { ActivityIndicator, BackHandler, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';


export default function HomeScreen() {
    const webViewRef = useRef<WebView>(null);
    const colorScheme = useColorScheme();

    const backgroundColor = colorScheme === "dark" ? "#000000" : "#ffffff";

    // Handle Android back button
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                webViewRef.current?.goBack();
                return true;
            }
        );

        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['top', 'bottom']}>

            <WebView
                ref={webViewRef}
                source={{ uri: 'https://test.bdchefchoice.com' }}
                startInLoadingState
                renderLoading={() => (
                    <ActivityIndicator size="large" style={styles.loader} />
                )}
                javaScriptEnabled
                domStorageEnabled
                allowsBackForwardNavigationGestures
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    },
});
