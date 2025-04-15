// Your code here.
  const container = document.querySelector('.items');
  const cubes = document.querySelectorAll('.item');
  let selected = null;
  let offsetX = 0;
  let offsetY = 0;

  cubes.forEach(cube => {
    cube.addEventListener('mousedown', (e) => {
      selected = cube;
      const rect = cube.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });

  function onMouseMove(e) {
    if (!selected) return;

    const parentRect = container.getBoundingClientRect();
    let x = e.clientX - parentRect.left - offsetX;
    let y = e.clientY - parentRect.top - offsetY;

    // Boundaries
    const maxX = parentRect.width - selected.offsetWidth;
    const maxY = parentRect.height - selected.offsetHeight;
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    selected.style.left = `${x}px`;
    selected.style.top = `${y}px`;
  }

  function onMouseUp() {
    if (selected) {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      selected = null;
    }
  }
