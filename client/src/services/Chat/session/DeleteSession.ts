
function DeleteSession(sessionId: string) {
  return fetch(`http://localhost:3000/sessions?id=${sessionId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
  });
}
  export default DeleteSession