import React, {Fragment, Component, createRef} from 'react';
import ReactDOM from 'react-dom';

import Todo from './components/todo'
import Footer from './components/footer'

import './main.css';

class TodoList extends Component{
  constructor(props){
      super(props);

      this.state = {
          todoList : [],
          activeType: 'all'
      };

      this.inputValue = createRef();
  }

  addTodo=(ev)=>{
      let {value} = this.inputValue.current;
      if(ev.keyCode !== 13 || !value.trim()) return;

      let {todoList} = this.state;
      let time = new Date().getTime();

      this.setState({
          todoList: [
              {
                  id: time,
                  content: value,
                  hadCompleted: false
              },
              ...todoList
          ]
      },()=>{
          this.inputValue.current.value = '';
      })
  };

  deleteTodo=(id)=>{
      let {todoList} = this.state;
      todoList = todoList.filter((elt)=>{
          return elt.id !== id
      });
      this.setState({
         todoList
      })
  };

  alterTodoContent=(id,content)=>{
      let {todoList} = this.state;
      todoList = todoList.map((elt)=>{
          if(elt.id === id){
              elt.content = content.trim();
          }
          return elt;
      });
      this.setState({
          todoList
      })
  };

  toggleTodo=(id)=>{
      let {todoList} = this.state;
      todoList = todoList.map((elt)=>{
          if(elt.id === id){
              elt.hadCompleted = !elt.hadCompleted;
          }
          return elt;
      });
      this.setState({
          todoList
      })
  };

  toggleAll = (ev)=>{
      let {todoList} = this.state;
      todoList = todoList.map((elt)=>{
          elt.hadCompleted = ev.target.checked;
          return elt;
      });

      this.setState({
          todoList
      })
  };

  clearCompleted = ()=>{
      let {todoList} = this.state;
      todoList = todoList.filter((elt)=>{
          return !elt.hadCompleted;
      });
      this.setState({
         todoList
      })
  };
  changeActiveType=(name)=>{
      this.setState({
          activeType: name
      })
  };

  render(){
    let {todoList,activeType} = this.state;

    let activeTodo = todoList.find((elt)=>elt.hadCompleted === false);
    let showClearBtn = todoList.find(elt=>elt.hadCompleted);

    let leftItem = 0;

    let showTodoList = todoList.filter((elt)=>{
        if(!elt.hadCompleted) leftItem++;
        switch (activeType){
            case "active":
                return !elt.hadCompleted;
            case "completed":
                return elt.hadCompleted;
            case "all":
                default:
                return true;
        }
    });

    let todos = showTodoList.map((elt)=>{
        return (
            <Todo
                key={elt.id}
                id={elt.id}
                content={elt.content}
                hadCompleted={elt.hadCompleted}
                deleteTodo={this.deleteTodo}
                alterTodoContent={this.alterTodoContent}
                toggleTodo={this.toggleTodo}
            />
        )
    });

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          {/* 输入框 */}
          <input
            type="text"
            className="new-todo"
            placeholder="type something here"
            ref={this.inputValue}
            onKeyDown={this.addTodo}
          />
        </header>
          {
              todoList.length > 0 && (
                  <Fragment>
                      <section className="main">
                          {/* 全选按钮 */}
                          <input
                              type="checkbox"
                              className="toggle-all"
                              checked={!activeTodo && todoList.length > 0}
                              onChange={this.toggleAll}
                          />
                          <ul className="todo-list">
                              {todos}
                          </ul>
                      </section>
                      <Footer
                          clearCompleted={this.clearCompleted}
                          showClearBtn={showClearBtn}
                          activeType={activeType}
                          changeActiveType={this.changeActiveType}
                          leftItem={leftItem}
                      />
                  </Fragment>
              )
          }


      </div>
    )
  }
}


ReactDOM.render(
  <TodoList/>
  ,
  document.getElementById('root')
)
