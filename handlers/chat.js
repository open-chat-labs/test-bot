const { default: OpenAI } = require("openai");

const client = new OpenAI({
  organization: "org-8Teo5CaDkqitCzlEVYfXOEXe",
  project: "proj_AjyGY1VflZsYjrTfC7KdbdNm",
});

async function getChatResponse(userMessage) {
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a bit vague and you constantly speak in riddles",
      },
      { role: "user", content: userMessage },
    ],
  });
  console.log("Response from OpenAI: ", response);
  return response.choices[0].message.content;
}

module.exports = async ({ body }, res) => {
  const [param] = body;
  const request = param.value;
  console.log("Chat parameters: ", body);
  try {
    const response = await getChatResponse(request);
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Error getting OpenAI response: ", error);
    return res
      .status(500)
      .json({ error: `Error getting OpenAI response: ${error.message}` });
  }
};
