import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async (event, context) => {

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }


  const BASE_URL = "https://api.mailersend.com/v1/email";
  const { REACT_APP_MAILER_SEND_TOKEN_ID } = process.env;

  const responseFetch = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${REACT_APP_MAILER_SEND_TOKEN_ID}`,
    },
    body: event.body  || null,
  });

  let response = {};
  try {
    const responseJson = await responseFetch.text;
    response = { succes: true, data: responseJson };
  } catch (error) {
    return {
      statusCode: 422,
      body: JSON.stringify({ succes: true, data: error }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export { handler };