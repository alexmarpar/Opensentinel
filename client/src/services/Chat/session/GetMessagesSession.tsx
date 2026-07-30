type Props = {
  id: string;
};

async function GetMessagesSession({ id }: Props) {
  const res = await fetch(
    `http://localhost:3000/sessions?id=${id}&message=True`
  );

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.response;
}

export default GetMessagesSession;