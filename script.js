const todos = document.querySelectorAll('.todo');
const list = document.getElementById('todo-list');
let dragged = null;

todos.forEach(todo => {
  todo.addEventListener('dragstart', () => {
    dragged = todo;
    setTimeout(() => todo.style.display = 'none', 0);
  });

  todo.addEventListener('dragend', () => {
    setTimeout(() => {
      dragged.style.display = 'block';
      dragged = null;
    }, 0);
  });
});

list.addEventListener('dragover', (e) => {
  e.preventDefault();
});

list.addEventListener('drop', (e) => {
  e.preventDefault();
  if (dragged) {
    const afterElement = getDragAfterElement(list, e.clientY);
    if (afterElement == null) {
      list.appendChild(dragged);
    } else {
      list.insertBefore(dragged, afterElement);
    }
  }
});

function getDragAfterElement(container, y) {
  const elements = [...container.querySelectorAll('.todo:not(:hover)')];
  return elements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}