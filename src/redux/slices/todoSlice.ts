import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todos } from '../../types/types';

interface TodoState {
  todoList: Todos[];
  filterStatus: 'All' | 'Incomplete' | 'Complete';
}

const initialState: TodoState = {
  todoList: [],
  filterStatus: 'All',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todos>) => {
      state.todoList.push({
        id: action.payload.id,
        title: action.payload.title,
        status: action.payload.status,
        time: action.payload.time,
      });
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todoList = state.todoList.filter(
        (item) => item.id !== action.payload.id
      );
    },
    updateTodo: (state, action) => {
      state.todoList = state.todoList.map((item) => {
        if (item.id === action.payload.id) {
          console.log(item.id === action.payload.id);

          return {
            ...item,
            title: action.payload.title,
            status: action.payload.status,
          };
        }
        return item;
      });
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
