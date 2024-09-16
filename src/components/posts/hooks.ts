import { useEffect, useMemo, useState } from "react";
import usePostsServiceInstance from '../../hooks/posts-service-instance';

type Item = {
  id: number | null;
  author: string;
  body: string;
};
export const useItems = () => {
  const {
    fetchPosts,
    createPost,
    updatePost,
  } = usePostsServiceInstance('http://localhost:3000'); // TODO url move to env
  const [items, setItems] = useState<Item[]>([]);

  const [idSelectedPost, setIdSelectedPost] = useState<null | number>(null);

  const EMPTY_POST: Item = { id: null, author: "", body: "" };

  const selectedPost = useMemo<Item | null>(() => {
    return idSelectedPost ? items.find((item) => item.id === idSelectedPost) || EMPTY_POST : null;
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

  async function updateItem(id: number, author: string, body: string) {
    const updatedPost = await updatePost(id, author, body);
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return updatedPost;
        }
        return item;
      });
    });
  }

  async function addItem(author: string, body: string) {
    const newPost = await createPost(author, body);
    setItems((prevItems) => {
      return [
        ...prevItems,
        newPost,
      ];
    });
  }

  useEffect(() => {
    fetchPosts().then((data) => {
      setItems(data || []);
    });
  }, []);

  return {
    items,
    idSelectedPost,
    selectedPost,
    selectPost,
    addItem,
    updateItem,
  };
};

export const useIndex = ({
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
      updateItem(data.id, data.author, data.body);
    } else {
      addItem(data.author, data.body);
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
