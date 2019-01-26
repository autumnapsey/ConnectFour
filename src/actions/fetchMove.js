const responseHandler = response =>
  !response.ok ? { status: response.status, error: response.error } : response;

const fetchMove = async moves => {
  try {
    const raw = await fetch(
      `https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=[${moves}]`,
    );
    const formattedResponse = await responseHandler(raw).json();
    return formattedResponse;
  } catch (err) {
    throw err;
  }
};

export default fetchMove;
