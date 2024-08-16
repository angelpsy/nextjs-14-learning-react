import "./App.css";
import Posts from "./components/posts";
import MainHeader from "./components/main-header";
import { useModal } from './hooks/modal';

function App() {
  const {
    isOpen: isOpenModal,
    open: openModal,
    close: closeModal,
  } = useModal();

  return (
    <>
      <MainHeader
        onCreatePost={openModal}
      />
      <main>
        <Posts
          isOpenModal={isOpenModal}
          openModal={openModal}
          closeModal={closeModal}
        />
      </main>
    </>
  );
}

export default App;
