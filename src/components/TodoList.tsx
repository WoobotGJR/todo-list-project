import React from 'react';
import { useAppSelector } from '../redux/hooks';
import TodoItem from './TodoItem';
import style from '../styles/modules/app.module.scss';

const TodoList: React.FC = () => {
  const todoList = useAppSelector((state) => state.todos.todoList);
  const [subtext, setSubtext] = React.useState('Enter your todo');
  const filterStatus = useAppSelector((state) => state.todos.filterStatus);

  const [filteredTodo, setFilteredTodo] = React.useState(todoList);

  React.useEffect(() => {
    if (filterStatus === 'All') {
      setFilteredTodo(todoList);
      return;
    }

    setFilteredTodo(todoList.filter((item) => item.status === filterStatus));
  }, [filterStatus, todoList]);

  return (
    <div className={style.content__wrapper}>
      {filteredTodo.length ? (
        <ul>
          {filteredTodo.map((todo) => (
            <TodoItem
              id={todo.id}
              title={todo.title}
              status={todo.status}
              time={todo.time}
            ></TodoItem>
          ))}
        </ul>
      ) : (
        <h2
          style={{
            textAlign: 'center',
            fontSize: '4rem',
            fontWeight: '300',
            padding: '25rem 0',
            backgroundColor: 'rgba(191, 77, 222,0.7)',
            borderRadius: '8px',
            color: 'white',
          }}
        >
          {subtext}
        </h2>
      )}
    </div>
  );
};

export default TodoList;
