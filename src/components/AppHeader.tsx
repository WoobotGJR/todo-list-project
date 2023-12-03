import React from 'react';
import Button from './Button';
import DropDown from './DropDown';
import style from '../styles/modules/app.module.scss';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateFilterStatus } from '../redux/slices/todoSlice';

interface AppHeaderProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppHeader: React.FC<AppHeaderProps> = ({ setModalOpen }) => {
  const dispatch = useAppDispatch();
  const filterStatus = useAppSelector((state) => state.todos.filterStatus);

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFilterStatus(event.target.value));
  };

  const toggleModal = () => {
    setModalOpen(true);
  };

  return (
    <div className={style.appHeader}>
      <Button onClick={toggleModal} variant="primary" type="button">
        Add new ToDo
      </Button>
      <DropDown name="filter" onChange={handleFilter} value={filterStatus}>
        <option value="All">All</option>
        <option value="Incomplete">Incomplete</option>
        <option value="Complete">Complete</option>
      </DropDown>
    </div>
  );
};

export default AppHeader;
