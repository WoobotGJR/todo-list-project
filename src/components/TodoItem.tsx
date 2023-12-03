import React, { useEffect } from 'react';
import style from '../styles/modules/todoItem.module.scss';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useAppDispatch } from '../redux/hooks';
import { deleteTodo, updateTodo } from '../redux/slices/todoSlice';
import Modal from './Modal';
import Checkbox from './Checkbox';

interface Todo {
  id: string;
  title: string;
  status: string;
  time: string;
}

const TodoItem: React.FC<Todo> = ({ id, title, status, time }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    if (status === 'Complete') {
      setChecked(true);
    }
  }, [status]);

  useEffect(() => {
    dispatch(
      updateTodo({ id, title, status: checked ? 'Complete' : 'Incomplete' })
    );
  }, [checked]);

  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTodo({ id }));
  };

  const handleEdit = () => {
    setModalOpen(true);
  };

  return (
    <>
      <li key={id} className={style.item}>
        <div className={style.todoDetails}>
          <Checkbox checked={checked} setChecked={setChecked} />
          <div className={style.texts}>
            <p
              className={[
                style.todoText,
                status === 'Complete' ? style['todoText--completed'] : '',
              ].join(' ')}
            >
              {title}
            </p>
            <p className={style.time}>{time}</p>
            <p className={style.status}>{status}</p>
          </div>
        </div>
        <div className={style.todoActions}>
          <div className={style.icon} onClick={handleDelete}>
            <MdDelete></MdDelete>
          </div>
          <div className={style.icon} onClick={handleEdit}>
            <MdEdit></MdEdit>
          </div>
        </div>
      </li>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        type="edit"
        todo={{ id, title, status }}
      />
    </>
  );
};

export default TodoItem;
