import React, { useCallback, useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { v4 } from 'uuid';

const TODO_APP_STORAGE_KEY = 'TODO_APP';

function App() {
  // state, props
  const [todoList, setTodoList] = useState([]); // array
  const [textInput, setTextInput] = useState(''); // string

  // useEffect(() => {
  //   if (localStorage.getItem(TODO_APP_STORAGE_KEY)) {
  //     setTodoList(JSON.parse(localStorage.getItem(TODO_APP_STORAGE_KEY)));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  // }, [todoList]);

  useEffect(() => {
    console.log('🚀 ~ file: App.js:37 ~ App ~ todoList', todoList);
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const removeAccents = (str) => {
    return str
      .normalize('NFD')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s/g, '');
  };

  const onAddBtnClick = useCallback(
    (e) => {
      // them textInput vao danh sach todoList
      const isTodoExist = todoList.some(
        (todo) => removeAccents(todo.name) === removeAccents(textInput)
      );
      if (isTodoExist) {
        // Nếu công việc đã tồn tại, hiển thị thông báo cho người dùng
        alert('Công việc này đã tồn tại trong danh sách.');
      } else {
        // Nếu công việc chưa tồn tại, thêm nó vào danh sách
        setTodoList([
          { id: v4(), name: textInput, isCompleted: false },
          ...todoList,
        ]);

        setTextInput('');
      }

      console.log('🚀 ~ file: App.js:27 ~ App ~ todoList:', todoList);
    },

    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  return (
    <>
      <h3>Danh sách các việc cần làm</h3>
      <Textfield
        name="add-todo"
        placeholder="Thêm việc cần làm..."
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance="primary"
            onClick={onAddBtnClick}
            style={{ marginRight: '2px' }}
          >
            Thêm
          </Button>
        }
        css={{ padding: '2px 4px 2px' }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>

      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
