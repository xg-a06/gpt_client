const getAnswer = async (question: string) => {
  const dataObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    body: JSON.stringify({
      question,
    }),
  };

  const response = await fetch('http://localhost:8087/answer', dataObj);
  if (response.ok) {
    return response.body!.getReader();
  }
  return false;
};

export { getAnswer };
