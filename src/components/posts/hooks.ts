import { useEffect, useMemo, useState } from "react";
import usePostsServiceInstance from "../../hooks/posts-service-instance";
import { Post } from "../../types/post";

type Item = {
  id: number | null;
  author: string;
  body: string;
};

const useLoading = <T, A extends any[]>(callback: (...args: A) => Promise<T>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fn = async (...args: A): Promise<T> => {
    setIsLoading(true);
    let res: T;
    try {
      res = await callback(...args);
      setIsLoading(false);
      return res;
    } catch (error) {
      setError((error as Error).message);
      setIsLoading(false);
      throw error;
    }
  };

  return {
    isLoading,
    error,
    fn,
  };
};

export const useItems = () => {
  const { fetchPosts, createPost, updatePost } = usePostsServiceInstance(
    "http://localhost:3000"
  ); // TODO url move to env
  const { fn: fetchData, isLoading: isLoadingFetchData, error: errorOfFetchData } = useLoading(fetchPosts);
  const { fn: createData, isLoading: isLoadingCreatePost, error: errorOfCreatePost } = useLoading(createPost);
  const { fn: updateData, isLoading: isLoadingUpdatePost, error: errorOfUpdatePost } = useLoading(updatePost);
  const [items, setItems] = useState<Item[]>([]);

  const [idSelectedPost, setIdSelectedPost] = useState<null | number>(null);

  const EMPTY_POST: Item = { id: null, author: "", body: "" };

  const selectedPost = useMemo<Item | null>(() => {
    return idSelectedPost
      ? items.find((item) => item.id === idSelectedPost) || EMPTY_POST
      : null;
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
    const updatedPost = await updateData(id, author, body);
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
    const newPost = await createData(author, body);
    setItems((prevItems) => {
      return [...prevItems, newPost];
    });
  }

  useEffect(() => {
    fetchData().then((data) => {
      setItems(data || []);
    });
  }, []);

  return {
    items,
    idSelectedPost,
    selectedPost,
    isLoadingFetchData,
    errorOfFetching: errorOfFetchData,
    isLoadingCreatePost,
    errorOfCreatePost,
    isLoadingUpdatePost,
    errorOfUpdatePost,
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
  const {
    items,
    idSelectedPost,
    selectedPost,
    isLoadingFetchData,
    errorOfFetching,
    isLoadingCreatePost,
    errorOfCreatePost,
    isLoadingUpdatePost,
    errorOfUpdatePost,
    selectPost,
    updateItem,
    addItem,
  } = useItems();

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

  const handleSubmitForm = async (data: {
    id: number | null;
    body: string;
    author: string;
  }) => {
    if (data.id) {
      await updateItem(data.id, data.author, data.body);
    } else {
      await addItem(data.author, data.body);
    }
    handleReset();
  };

  return {
    items,
    idSelectedPost,
    selectedPost,
    isOpenModal,
    isLoadingFetchData,
    errorOfFetching,
    isLoadingCreatePost,
    errorOfCreatePost,
    isLoadingUpdatePost,
    errorOfUpdatePost,
    handleResetForNewPost: handleReset,
    handleSelectPost,
    openModal,
    handleCloseModal,
    handleSubmitForm,
  };
};
