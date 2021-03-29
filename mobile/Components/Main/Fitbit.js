import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType  } from 'expo-auth-session';
import { Text, Platform,TouchableHighlight } from 'react-native';
import axios from 'axios'
import styles,{color2Dark,color3} from '../../styles'
import { connect } from "react-redux";

WebBrowser.maybeCompleteAuthSession();
const useProxy = true;
// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
  revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
};

function Fitbit(props) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '22C63G',
      // '22C58S',
      clientSecret:'d0828f373ac2341d1f9275203c0dace2',
      // 'ae99c2aecb225e4a0bf93effcbc5a7c3',
      scopes: ['heartrate'],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        path: '/redirect'
        
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token, state } = response.params;
      console.log(access_token)
      console.log(response)
      console.log('got here')
      axios.put(`http://10.0.0.14:5000/subscriber/fitbitTokens/${props.currentUser}`, {accessToken: access_token})
        .then((res) => console.log(res))      

    
      }
  }, [response]);

  return (
    <TouchableHighlight style={styles.loginButton}
    activeOpacity={0.2}
    underlayColor={color2Dark}
    onPress={() => {
      promptAsync();
      console.log(request)
      }}
  >
    <Text style={{ fontSize: 20, color: color3 }}>Connect to Fitbit </Text>

    </TouchableHighlight>
   
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.subscriber.currentUser,
});

export default connect(mapStateToProps, null)(Fitbit)