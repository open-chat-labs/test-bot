# Example Bot implementation

This is a test bot implementation. It is designed to demonstrate the necessary steps to create an off-chain OpenChat bot in the simplest way possible and should not be considered production quality.

## Interacting with OpenChat

To interact with the OpenChat you will need to use an identity representing the same principal that you used to register the bot.

To obtain a principal, you can generate a pem file as follows:

```
openssl ecparam -genkey -name secp256k1 -out private_key.pem
```

Note that it is very important that you do not leak the contents of that key. Do not commit it to source control etc. One good option is to pass the contents of the private key into your bot using an environment variable.

Once you have the private key you can generate an identity and thereby a principal like this:

```
const { Secp256k1KeyIdentity } = require("@dfinity/identity-secp256k1");

function createIdentity() {
  const privateKeyPem = PRIVATE_PEM.replace(/\\n/g, "\n");
  try {
    return Secp256k1KeyIdentity.fromPem(privateKeyPem);
  } catch (err) {
    console.error(err);
  }
}

const id = createIdentity();
console.log(
  "Principal: ",
  id.getPrincipal().toText(),
  id.getPrincipal().isAnonymous()
);
```

This will give you the principal as a text string and you can use that to register your bot.
