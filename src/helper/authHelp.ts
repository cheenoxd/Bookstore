import crypto from 'crypto';

const SECRET = 'TEST-API-KEY'

//create random string of cryptobytes
export const random = () => crypto.randomBytes(128).toString('base64');


//creates haspassword using the provided salt and password
export const authentication = (salt: string, password: string) => 
  crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
