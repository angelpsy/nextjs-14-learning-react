import { useState } from "react";
import { useModal } from '../../hooks/modal';

export const useForm = () => {
  const [body, setBody] = useState("");
  const [name, setName] = useState("");

  function handleChangeBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setBody(getValueOfInput(event));
  }

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(getValueOfInput(event));
  }

  return {
    body,
    name,
    setBody,
    setName,
    onChangeBody: handleChangeBody,
    onChangeName: handleChangeName,
  };
};

export const getValueOfInput = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => event.target.value;

type Item = {
  id: number;
  author: string;
  body: string;
};
export const useItems = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      author: "Aleksei",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, impedit repudiandae alias ex nisi dolor perferendis sequi autem distinctio doloremque fugit delectus debitis magni doloribus? Odit ab corporis eos quisquam.",
    },
    {
      id: 2,
      author: "Aleksey",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, libero!",
    },
  ]);

  const [idSelectedPost, setIdSelectedPost] = useState<null | number>(null);

  function selectPost(id: number | null) {
    if (id === null || idSelectedPost === id) {
      setIdSelectedPost(null);
      return {
        body: "",
        name: "",
      };
    }
    setIdSelectedPost(id);
    const post = items.find((item) => item.id === id);
    if (post) {
      return {
        body: post.body,
        name: post.author,
      };
    }
    return {
      body: "",
      name: "",
    };
  }

  return {
    items,
    idSelectedPost,
    selectPost,
  };
};

export const usePosts = () => {
  const { items, idSelectedPost, selectPost } = useItems();
  const { body, name, setBody, setName, onChangeBody, onChangeName } =
    useForm();
  const {
    open: openModal,
    close: closeModal,
    isOpen: isOpenModal,
  } = useModal();

  const handleSelectPost = (id: number | null) => {
    const post = selectPost(id);
    setBody(post.body);
    setName(post.name);
    if (post.body) {
      openModal();
    } else {
      closeModal();
    }
  };

  const handlerCloseModal = () => {
    handleSelectPost(null);
  };

  return {
    body,
    name,
    setBody,
    setName,
    onChangeBody,
    onChangeName,
    items,
    idSelectedPost,
    handleSelectPost,
    isOpenModal,
    openModal,
    closeModal: handlerCloseModal,
  };
};
