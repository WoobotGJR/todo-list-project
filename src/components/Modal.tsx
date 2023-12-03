import React, { useEffect } from 'react';
import style from '../styles/modules/modal.module.scss';
import { MdOutlineClose } from 'react-icons/md';
import DropDown from './DropDown';
import Button from './Button';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import { useAppDispatch } from '../redux/hooks';
import { addTodo, updateTodo } from '../redux/slices/todoSlice';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type?: 'add' | 'edit';
  todo?: {
    id: string;
    title: string;
    status: string;
  };
}

const Modal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  type = 'add',
  todo = {
    id: '',
    title: '',
    status: '',
  },
}) => {
  const { values, setValues, handleChange, isValid, setIsValid } =
    useFormWithValidation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    });
    if (type === 'edit') {
      setValues({
        title: todo.title,
        status: todo.status,
      });
      setIsValid(true);
    } else {
      setValues({ title: '', status: '' });
    }
    setIsValid(false);

    return () => {
      document.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setModalOpen(false);
        }
      });
    };
  }, [modalOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (type === 'add') {
      dispatch(
        addTodo({
          id: new Date().toISOString(),
          title: values.title,
          status: values.status,
          time: new Date().toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          }),
        })
      );
    }

    if (
      type === 'edit' &&
      (values.title !== todo.title || values.status !== todo.status)
    ) {
      dispatch(
        updateTodo({
          title: values.title,
          status: values.status,
          id: todo.id,
        })
      );
    }

    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <div className={style.wrapper}>
          <div className={style.container}>
            <button
              className={style.closeButton}
              onClick={() => setModalOpen(false)}
            >
              <MdOutlineClose />
            </button>
            <form
              onSubmit={handleSubmit}
              className={style.form}
              action="submit"
            >
              <h2 className={style.formTitle}>
                {type === 'add' ? 'Add' : 'Edit'} task
              </h2>
              <label htmlFor="title">Title</label>
              <input
                value={values && values.title}
                onChange={handleChange}
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                required
              />
              <label htmlFor="status">Status</label>
              <DropDown
                value={
                  (values.status = values.status ? values.status : 'Incomplete')
                }
                onChange={handleChange}
                name="status"
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Complete">Complete</option>
              </DropDown>
              <div className={style.buttonContainer}>
                <Button variant="primary" type="submit" disabled={!isValid}>
                  {type === 'add' ? 'Add' : 'Edit'}
                </Button>
                <Button
                  onClick={() => setModalOpen(false)}
                  variant="secondary"
                  type="button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
