const get = target => {
  if (document.querySelector(target)) {
    return document.querySelector(target);
  } else {
    throw "ERROR - get";
  }
};
const getAll = target => {
  if (documentAll.querySelector(target)) {
    return documentAll.querySelector(target);
  } else {
    throw "ERROR - getAll";
  }
};
const form = get("form"),
  input = get("input"),
  output = get(".output");
let todoObj = JSON.parse(localStorage.getItem("todoObj")) || [];
let no = JSON.parse(localStorage.getItem("no")) || 0;

const todoDel = (del, id) => {
  del.addEventListener("click", () => {
    todoObj = todoObj.filter(item => item.id !== id);
    localStorage.setItem("todoObj", JSON.stringify(todoObj));
    showList();
  });
};
const showList = () => {
  output.innerHTML = "";
  todoObj.forEach((item, idx) => {
    const { id, todo, boolean } = item;
    let li = document.createElement("li");
    let check = document.createElement("span");
    let txt = document.createElement("p");
    let correction = document.createElement("span");
    let del = document.createElement("span");
    let xicheck = document.createElement("i");
    let xicor = document.createElement("i");
    let xidel = document.createElement("i");
    check.classList.add("check");

    check.append(xicheck);
    correction.classList.add("correction");
    xicor.classList.add("xi-pen");
    correction.append(xicor);
    del.classList.add("delete");
    xidel.classList.add("xi-trash");
    if (todoObj[idx].boolean) {
      xicheck.className = "xi-check-square-o";
      txt.style.textDecoration = "line-through";
      txt.style.color = "#dcdcdc";
    } else {
      xicheck.className = "xi-checkbox-blank";
      txt.style.textDecoration = "none";
      txt.style.color = "#000";
    }
    del.append(xidel);
    txt.textContent = todo;
    li.append(check, txt, correction, del);
    output.append(li);

    check.addEventListener("click", e => {
      if (todoObj[idx].boolean) {
        todoObj[idx].boolean = false;
        xicheck.classList.replace("xi-check-square-o", "xi-checkbox-blank");
        txt.style.textDecoration = "none";
        txt.style.color = "#000";
      } else {
        todoObj[idx].boolean = true;
        xicheck.classList.replace("xi-checkbox-blank", "xi-check-square-o");
        txt.style.textDecoration = "line-through";
        txt.style.color = "#dcdcdc";
      }
      localStorage.setItem("todoObj", JSON.stringify(todoObj));
    });

    correction.addEventListener("click", e => {
      txt.innerHTML = "";
      let corInput = document.createElement("input");
      txt.append(corInput);
      corInput.focus();
      corInput.addEventListener("keyup", e => {
        if (e.keyCode === 13) {
          if (corInput.value) {
            txt.textContent = corInput.value;
            todoObj[idx].todo = corInput.value;
            localStorage.setItem("todoObj", JSON.stringify(todoObj));
          } else {
            alert("변경할 일정을 입력해주세요");
          }
        }
      });
    });
    todoDel(del, id);
  });
  input.value = "";
  input.focus();
};
showList();

const todoAdd = () => {
  todoObj = [
    ...todoObj,
    {
      id: no++,
      todo: input.value,
      boolean: false,
    },
  ];
  localStorage.setItem("todoObj", JSON.stringify(todoObj));
  localStorage.setItem("no", JSON.stringify(no));
};

form.addEventListener("submit", e => {
  e.preventDefault();
  if (input.value) {
    todoAdd();
    showList();
  } else {
    alert("일정을 입력해주세요");
  }
});
