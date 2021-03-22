import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType, GrantType  } from 'expo-auth-session';
import axios from "axios";
import { Button, Platform } from 'react-native';
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
      grantType: 'authorization_code',
      clientId: '22C58S',
      clientSecret: 'ae99c2aecb225e4a0bf93effcbc5a7c3',
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
      const { code } = response.params;
      // axios
      //   .put(`http://10.0.0.249:5000/subscriber/fitbitTokens/${props.currentUser}`, {
      //     accessToken: response.params.accessToken,
      //     refreshToken:
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      console.log(response)
      }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        console.log(request)
        console.log(response)
        }}
    />
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.subscriber.currentUser,
});

export default connect(mapStateToProps, null)(Fitbit)