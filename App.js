import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';


function App() {
  const [loading, setLoading] = useState(true);
  const [webStyle, setWebStyle] = useState({})
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setConnected(true)
      }
    })
  }, []);

  function loadings() {
    setLoading(false);
    setWebStyle({ flex: 1 });
  };

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

  function webView(){
    if(connected)
    {
      return(<WebView
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
        style={webStyle}
        source={{ uri: 'https://www.moghadamwelding.com/' }}
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
