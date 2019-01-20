export function gameHasErrored(bool) {
  return { type: 'GAME_HAS_ERRORED', hasErrored: bool };
}

export function gameIsLoading(bool) {
  return { type: 'GAME_IS_LOADING', isLoading: bool };
}

export function fetchMoveSuccess(moves) {
  return { type: 'GAME_FETCH_MOVE_SUCCESS', moves };
}

const responseHandler = response =>
  !response.ok ? { status: response.status, error: response.error } : response;

const fetchMove = async moves => {
  try {
    const raw = await fetch(
      `https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=${moves}`,
    );
    const formattedResponse = await responseHandler(raw).json();
    console.log(formattedResponse);
    return formattedResponse;
  } catch (err) {
    console.log(err, 'shit is fucked');
    throw err;
  }
};

export default fetchMove;

// export function fetchMove(moves) {
//     console.log('butts')
//
//     const newMove = () => {
//         console.log('work pls')
//         gameIsLoading(true);
//         fetch('https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=' + moves).then( response => console.log(response))
//         //     .then((response) => {
//         //     if (!response.ok) {
//         //         throw Error(response);
//         //     }
//         //
//         //     gameIsLoading(false);
//         //     console.log(response)
//         //     return response;
//         // }).then( (response) => response.json())
//         //     .then( moves => fetchMoveSuccess(moves))
//         //     .catch( () => gameHasErrored(true));
//     };
//     return newMove()
// }
