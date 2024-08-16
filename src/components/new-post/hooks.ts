import { useState } from 'react';

const getValueOfInput = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => event.target.value;

type Props = {
  defaultBody: string;
  defaultName: string;
};
export const useForm = ({defaultBody, defaultName}: Props) => {
  const [body, setBody] = useState(defaultBody);
  const [name, setName] = useState(defaultName);

  function handleChangeBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setBody(getValueOfInput(event));
  }

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(getValueOfInput(event));
  }

  function handleReset() {
    setBody("");
    setName("");
  }

  return {
    body,
    name,
    setBody,
    setName,
    handleChangeBody,
    handleChangeName,
    handleReset,
  };
};