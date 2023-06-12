import { get, getAll } from "./module/getEle.js";
import Todolist from "./module/todo.js";
(() => {
  const form = get("form"),
    input = get("input"),
    output = get(".output");
  const todolist = new Todolist(form, input, output);
  todolist.init();
})();
