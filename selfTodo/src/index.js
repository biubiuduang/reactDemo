import React, {Fragment, Component, createRef} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'

import Todo from './components/todo'

import './main.css';
import Footer from "./components/footer";

class TodoList extends Component{
  constructor(props){
      super(props);

      this.state = {
         todoList: [],
         todoType: 'all'
      };

      this.inputValue = createRef();
  }
  //添加 todo
  addTodo=(ev)=>{
      let {todoList} = this.state;
      let {current: input} = this.inputValue;
      if(ev.keyCode === 13 && input.value.trim()) {
          todoList = [
              {
                  id: new Date().getTime(),
                  content: input.value.trim(),
                  hadCompleted: false
              },
              ...todoList
          ];
          input.value = '';
      }

      this.setState({
          todoList
      })

  };
  //删除 todo
  deleteTodo=(id)=>{
      let {todoList} = this.state;
      todoList = todoList.filter(elt=>elt.id !== id)
      this.setState({
          todoList
      })
  };
  
  //修改 提交 todo 
  alterTodoContent=(id,content)=>{
     let {todoList} = this.state;
     todoList = todoList.map((elt)=>{
       if(elt.id === id) elt.content = content;
       return elt;
     });
      this.setState({
          todoList
      })
  };

  //todo Completed
  todoCompleted = (id)=>{
      let {todoList} = this.state;
      todoList = todoList.map((elt)=>{
          if(elt.id === id) elt.hadCompleted = !elt.hadCompleted;
          return elt;
      });

      this.setState({
         todoList
      })
  };

  changeToggleAll=(ev)=>{

      let {todoList} = this.state;
      todoList = todoList.map((elt)=> {
          elt.hadCompleted = ev.target.checked;
          return elt;
      });

      this.setState({
          todoList
      })
  };

  //footer
  clearAllCompleted=()=>{
     let {todoList} = this.state;
     todoList = todoList.filter(elt => !elt.hadCompleted);
     this.setState({
         todoList
     })
  };
  todoFilter=(type)=>{
     this.setState({
         todoType: type
     })
  };

  render(){
    let {todoList,todoType} = this.state;

    let leftItem = 0;
    let someTodos = todoList.filter((elt)=>{
        if(!elt.hadCompleted) leftItem++;
        switch (todoType){
            case 'active':
                return !elt.hadCompleted;
            case 'completed':
                return elt.hadCompleted;
            case 'all':
            default:
                return true;
        }
    });



    let todos = someTodos.map((elt)=>{
        return (
            <Todo
                key={elt.id}
                id={elt.id}
                content={elt.content}
                deleteTodo={this.deleteTodo}
                alterTodoContent={this.alterTodoContent}
                hadCompleted={elt.hadCompleted}
                todoCompleted={this.todoCompleted}
            />
        )
    });

    let activeTodo = todoList.find((elt)=>elt.hadCompleted === false);
    let hasCompleted = todoList.find(elt=>elt.hadCompleted);
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          {/* 输入框 */}
          <input
            ref={this.inputValue}
            type="text"
            className="new-todo"
            placeholder="type something here"
            onKeyDown={this.addTodo}
          />
        </header>
          {todoList.length > 0 &&
              (
                  <Fragment>
                      <section className="main">
                          <input
                              type="checkbox"
                              className="toggle-all"
                              ref={this.toggleAll}
                              checked={!activeTodo && todoList.length > 0}
                              onChange={this.changeToggleAll}
                          />
                          <ul className="todo-list">
                              {todos}
                          </ul>
                      </section>
                      <Footer
                          clearAllCompleted={this.clearAllCompleted}
                          hasCompleted={hasCompleted}
                          todoType={todoType}
                          todoFilter={this.todoFilter}
                          leftItem={leftItem}
                      />
                  </Fragment>
              )
          }

      </div>
    )
  }
}

function Aac(props){
    console.log(props);
    return (
        <div
            onClick={ev=> props.history.push('/')}
        >我的名字叫 Aac</div>
    )
}

function Bbc(props){
    console.log(props);
    return (
        <div>我的名字叫 Bbc</div>
    )
}


ReactDOM.render(
   <Router>
       <Fragment>
           <ul>
               <Link to="/" tag={'li'}>app</Link>
               <Link to={{
                   pathname:'/aac',
                   state:{
                       hk: 90
                   }
               }}>aac</Link>
               <Link to="/bbc">bbc</Link>
           </ul>
           <Route path="/" exact render={(props)=>{
               console.log(props);
               return (
                   <div>
                       <p>当前这个组件是app</p>
                       <TodoList/>
                   </div>
               )
           }} />
           <Route path="/aac" component={Aac} />
           <Route path="/bbc" component={Bbc} />
       </Fragment>
   </Router>
  ,
  document.getElementById('root')
);
