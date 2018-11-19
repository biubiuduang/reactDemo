import React,{Component,createRef} from 'react';

export default class Todo extends Component{
    constructor(props) {
        super(props);

        this.state={
            isEdit: false
        }

        this.editInput = createRef();
    }

    onEdit=(content)=>{
        let input = this.editInput.current;
        this.setState({
            isEdit: true
        },()=>{
            input.value = content;
            input.focus();
        })
    };

    onBlur=()=>{
        if(!this.state.isEdit) return;
        this.setState({
            isEdit: false
        });
        this.commitAlter();
    };

    onKeyDown=(ev)=>{
        if(ev.keyCode === 27 || ev.keyCode === 13){
            this.setState({
                isEdit: false
            });
        }

        if(ev.keyCode === 13){
            this.commitAlter();
        }
    };

    commitAlter=()=>{
        let {current: input} = this.editInput;
        let content = input.value.trim();
        if(content){
            this.props.alterTodoContent(this.props.id,content);
        }else{
            this.props.deleteTodo(this.props.id);
        }
        input.value = '';
    };

    render() {
        let {id,content,deleteTodo,hadCompleted,toggleTodo} = this.props;
        let {isEdit} = this.state;
        let className = isEdit ? "editing" : "";
        className = hadCompleted ? className+" completed" : className;
        return (
            <li
                // className="completed"
                className={className}
            >
                <div className="view">
                    {/* 勾选按钮 */}
                    <input
                        checked={hadCompleted}
                        type="checkbox"
                        className="toggle"
                        onChange={()=>toggleTodo(id)}
                    />
                    {/* todo 的内容 */}
                    <label ref="label"
                        onDoubleClick={()=>this.onEdit(content)}
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