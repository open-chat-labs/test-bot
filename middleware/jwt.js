const jwt = require("jsonwebtoken");

/* JWT should look something like this
{
  exp: 1734627118,
  claim_type: 'BotCommand',
  initiator: 'dfdal-2uaaa-aaaaa-qaama-cai',
  bot: 't3zvm-f44r4-4jr6k-g5m5a',
  chat: { Channel: [ 'dmalx-m4aaa-aaaaa-qaanq-cai', 3946226325 ] },
  thread_root_message_index: null,
  message_id: '495508592178159919',
  command_name: 'calculate',
  command_args: '[{"kind":"number","name":"number_one","value":10},{"kind":"number","name":"number_two","value":20}]',
  version: 0,
  command_text: '@julian_jelfs executed the command /calculate',
  bot_api_gateway: 'be2us-64aaa-aaaaa-qaabq-cai'
}
*/

const verifyJwt = (ocPublic) => {
  return (req, res, next) => {
    const token = req.body;
    const publicKey = ocPublic.replace(/\\n/g, "\n");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token is missing." });
    }

    try {
      req.jwt = jwt.verify(token, publicKey, { algorithms: ["ES256"] });
      req.originalJwt = token;
      console.log("Verified jwt: ", req.jwt);
      next();
    } catch (err) {
      console.error("Couldn't verify the jwt", err);
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token." });
    }
  };
};

module.exports = verifyJwt;
