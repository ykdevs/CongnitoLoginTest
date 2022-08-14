import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import fs from 'fs';

let token = fs.readFileSync(".idtoken").toString().trim();
console.log( token );

var client = jwksClient({
  jwksUri: 'https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_5WePq2ghn/.well-known/jwks.json'
});
function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

jwt.verify(token, getKey, { algorithms: ['RS256'] }, function(err, decoded) {
    if (err) {
        console.log( `ERROR: err.message=[${err.message}]` );
    } else {
        console.log( `OK: decoded.email=[${decoded.email}], name=[${decoded.name}]` );
    }
});
