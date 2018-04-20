import React from 'react';
import
{
    Linking,
    WebView,
    AppRegistry,
    StyleSheet
} from 'react-native';
import { BackHandler } from 'react-native'
var WEBVIEW_REF = 'webview'
var BASEURL = 'http://digiato.com/0'


export default class App extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {url: 'http://digiato.com/', }
    }

    componentDidMount()
    {
        BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress.bind(this));
    }

    componentWillUnmount()
    {
        BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPress.bind(this));
    }

    onNavigationStateChange(nav_state)
    {
        console.log(nav_state)
        this.setState({backButtonEnabled: nav_state.canGoBack})
    }

    onHardwareBackPress()
    {
        if(this.state.backButtonEnabled)
        {
            this.refs[WEBVIEW_REF].goBack();
            return true;
        }
        return false
    }

    onLoadStart(nav_state)
    {
        if(!nav_state.nativeEvent.url.startsWith('http://digiato.com/'))
        {
            this.setState({url: nav_state.nativeEvent.url})
        }
    }

    render()
    {
        return (
            <WebView
                ref={WEBVIEW_REF}
                source={{uri: this.state.url}}
                style={styles.webView}
                scalesPageToFit={true}
                allowUrlRedirect={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                // onLoadStart={this.onLoadStart.bind(this)}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            />
        );
    }
}

const styles = StyleSheet.create
({
    webView: {
        flex: 1,
    }
});

AppRegistry.registerComponent('App', () => App);