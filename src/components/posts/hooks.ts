import { useMemo, useState } from "react";

type Item = {
  id: number | null;
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

  const selectedPost = useMemo<Item>(() => {
    return items.find((item) => item.id === idSelectedPost) || { id: null, body: "", author: "" };
  }, [idSelectedPost, items]);

  function selectPost(id: number | null) {
    if (id === null || idSelectedPost === id) {
      setIdSelectedPost(null);
      return {
        body: "",
        author: "",
      };
    }
    setIdSelectedPost(id);
    const post = items.find((item) => item.id === id);
    if (post) {
      return {
        body: post.body,
        author: post.author,
      };
    }
    return {
      body: "",
      author: "",
    };
  }

  function updateItem(id: number, body: string, author: string) {
    setItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              body,
              author,
            };
          }
          return item;
        });
    });
  }

  function addItem(body: string, author: string) {
    setItems((prevItems) => {
      const id = prevItems.length + 1;
      return [
        ...prevItems,
        {
          id,
          body,
          author,
        },
      ];
    });
  }

  return {
    items,
    idSelectedPost,
    selectedPost,
    selectPost,
    addItem,
    updateItem,
  };
};

export const usePosts = ({
  isOpenModal,
  openModal,
  closeModal,
}: {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}) => {
  const { items, idSelectedPost, selectedPost, selectPost, updateItem, addItem } = useItems();

  const handleSelectPost = (id: number | null) => {
    selectPost(id);
    openModal();
  };

  const handleCloseModal = () => {
    selectPost(null);
    closeModal();
  };

  const handleReset = () => {
    handleCloseModal();
  };

  const handleSubmitForm = (data: { id: number | null; body: string; author: string }) => {
    if (data.id) {
      updateItem(data.id, data.body, data.author);
    } else {
      addItem(data.body, data.author);
    }
    handleReset();
  };

  return {
    handleResetForNewPost: handleReset,
    items,
    idSelectedPost,
    selectedPost,
    handleSelectPost,
    isOpenModal,
    openModal,
    handleCloseModal,
    handleSubmitForm,
  };
};
