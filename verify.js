import jwt from 'jsonwebtoken';
import sleep from 'sleep';
 
const jwtPayload = {
    email: 'user1@example.com',
    name: 'JWT Taro',
};
const jwtSecret = 'secret_key_goes_here';
const jwtOptions = {
    algorithm: 'HS256',
    expiresIn: '3s',
};

// Generate JWT token
console.log(`Payload: email=[${jwtPayload.email}], name=[${jwtPayload.name}]` );

console.log( '=== GENERATE JWT TOKEN ===');
const token = jwt.sign(jwtPayload, jwtSecret, jwtOptions);
console.log( `Token: ${token}` );

console.time( 'A' );
sleep.sleep( 1 );
console.timeEnd( 'A' );

// Verify JWT token
console.log( '=== VERIFY JWT TOKEN ===');
jwt.verify( token, jwtSecret, (err, decoded) => {
    if (err) {
        console.log( `ERROR: err.message=[${err.message}]` );
    } else {
        console.log( `OK: decoded.email=[${decoded.email}], name=[${decoded.name}]` );
    }
});
