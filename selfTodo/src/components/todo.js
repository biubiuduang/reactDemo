import React,{Component,createRef} from 'react'

export default class Todo extends Component{
    constructor(props){
        super(props);

        this.state= {
            editing: false
        };

        this.editInput = createRef();
    }
    //双击编辑
    dbClick=()=>{
      let {current: input} = this.editInput;
      this.setState({
          editing: true
      },()=>{
          input.value = this.props.content;
          input.focus();
      })
    };

    onBlur=()=>{
       if(!this.state.editing) return;
       this.setState({
           editing: false
       });

       this.commitEdit();
    };

    onKeyDown=(ev)=>{
        if(ev.keyCode === 27 || ev.keyCode === 13){
            this.setState({
                editing: false
            });
        }

        if(ev.keyCode === 13){
            this.commitEdit();
        }
    };

    commitEdit=()=>{
        let {current: input} = this.editInput;

        if(input.value.trim()){
            this.props.alterTodoContent(this.props.id,input.value.trim());
        }else{
            this.props.deleteTodo(this.props.id);
        }
        input.value = '';
    };


    render(){
        let {editing} = this.state;
        let {id,content,deleteTodo,hadCompleted,todoCompleted} = this.props;

        let className = editing ? "editing" : "";
        className = hadCompleted ? className+ " completed" : className;

        return (
            <li
                // className="completed"
                className={className}
            >
                <div className="view">
                    {/* 勾选按钮 */}
                    <input
                        type="checkbox"
                        className="toggle"
                        onChange={()=>todoCompleted(id)}
                        checked={hadCompleted}
                    />
                    {/* todo 的内容 */}
                    <label
                        ref="label"
                        onDoubleClick={this.dbClick}
                    >
                        {content}
                    </label>
                    {/* 删除按钮 */}
                    <button
                        className="destroy"
                        ref="btn"
                        onClick={()=>deleteTodo(id)}
                    ></button>
                </div>
                {/* 编辑 todo 的输入框 */}
                <input
                    type="text"
                    className="edit"
                    ref={this.editInput}
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDown}
                />
            </li>
        )
    }
}
