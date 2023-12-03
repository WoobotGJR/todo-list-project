import React, { useState, useEffect } from 'react';
import PageTitle from './components/PageTitle';
import style from './styles/modules/app.module.scss';
import AppHeader from './components/AppHeader';
import Modal from './components/Modal';
import TodoList from './components/TodoList';

function App(): React.ReactElement {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    });

    return () => {
      document.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setModalOpen(false);
        }
      });
    };
  }, []);

  return (
    <div className="container">
      <PageTitle>TODO LIST</PageTitle>
      <div className={style.wrapper}>
        <AppHeader setModalOpen={setModalOpen}></AppHeader>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}></Modal>
        <TodoList></TodoList>
      </div>
    </div>
  );
}

export default App;
