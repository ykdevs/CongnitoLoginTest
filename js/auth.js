function OnCognitoAuthenticateUser() {

  var username = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var authenticationData = {
    Username: username,
    Password: password,
  };

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  var poolData = {
    UserPoolId: 'ap-northeast-1_3kWFzAIbs', // Your user pool id here
    ClientId: '3d2r9p0skc4rqc1fb7d9dkk1v6', // Your client id here
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var userData = {
    Username: username,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      var idToken = result.getIdToken().getJwtToken();          // IDトークン
      var accessToken = result.getAccessToken().getJwtToken();  // アクセストークン
      var refreshToken = result.getRefreshToken().getToken();   // 更新トークン

      console.log("idToken : " + idToken);
      console.log("accessToken : " + accessToken);
      console.log("refreshToken : " + refreshToken);

      //POTENTIAL: Region needs to be set if not already set previously elsewhere.
      AWS.config.region = 'ap-northeast-1';

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-1:bd58d7ae-51c3-4a2f-81f5-a1f05e95bf47', // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          'cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_3kWFzAIbs': result
            .getIdToken()
            .getJwtToken(),
        },
      });

      //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
      AWS.config.credentials.refresh(error => {
        if (error) {
          console.error(error);
        } else {
          // Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3();
          console.log('Successfully logged!');
        }
      });
    },

    onFailure: function(err) {
      alert(err.message || JSON.stringify(err));
    },
  });
}
