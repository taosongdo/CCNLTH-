
import { View } from 'react-native';
import { WebView } from 'react-native-webview'


const VideoCallPage = () => {
    const go = () => {
        console.log("gg")
    }
    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://meet.jit.si/` }}
                style={{ flex: 1 }}
                handleNavigationStateChange={go}
                javaScriptEnabled
            />
        </View>
    );
};

export default VideoCallPage;
