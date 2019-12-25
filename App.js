import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Text, BackHandler} from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';

function App() {
  const [loading, setLoading] = useState(true);
  const [webStyle, setWebStyle] = useState({})
  const [connected, setConnected] = useState(false);
  const [baseUrl] = useState("https://www.moghadamwelding.com/");
  const [inHomePage, setInHomePage] = useState(false);
  const androidRef = useRef(null);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setConnected(true)
      }
    });
  },[]);

  function loadings() {
    setLoading(false);
    setWebStyle({ flex: 1 });
  };

  function navigat(url) {

    if (url != baseUrl)
      setInHomePage(false);
    else
      setInHomePage(true);

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (inHomePage == true)
        BackHandler.exitApp();
      else {
        androidRef.current.goBack();
        return true;
      }
    });
  }

  function connectionError() {
    if (connected == false) {
      return (<Text>خطا در اتصال به اینترنت لطفا دسترسی به اینترنت خود را چک نمایید</Text>)
    }
  }

  function onLoadingFunc() {
    if (loading == true) {
      return (
        <View style={styles.loadingArea}>
          <Image style={styles.loadingAreaImage} source={require('./src/Assets/logo.png')} />
          <Text>درحال اتصال</Text>
          <ActivityIndicator size="small" animating={true} color="#000000" />
          {connectionError()}
        </View>)
    }
  }

  function webView() {
    if (connected) {
      return (<WebView
        ref={androidRef}
        onLoadEnd={() => {
          setTimeout(() => {
            return loadings();
          }, 4000);
        }}
        connectionError={() => {
          return connectionError();
        }}
        onError={() => {
          return connectionError()
        }}
        onNavigationStateChange={(a) => { navigat(a.url) }}
        style={webStyle}
        source={{ uri: baseUrl }}
        javaScriptEnabled={true}
        domStorageEnabled={true} />)
    }
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        {onLoadingFunc()}
        <View style={webStyle}>
          {webView()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loadingArea: {
    flex: 10,
    backgroundColor: '#ffeb3c',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingAreaImage: {
    width: 200,
    height: 200
  }
})

export default App;
