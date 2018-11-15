import React,{Fragment,Component,createRef} from 'react';

export default class Todo extends Component{
    constructor(props) {
        super(props);

        this.state = {
          inEdit: false
        };

        this.editInput = createRef();
    }

    onEdit=()=>{
        let input = this.editInput.current;
        this.setState({
            inEdit: true
        },()=>{
            input.value = this.props.content;
            input.focus();
        });
    };

    onBlur=()=>{
        if(!this.state.inEdit) return;
        this.setState({
            inEdit: false,
        });
        this.commitAlter();
    };

    onKeyDown=(ev)=>{
        if(ev.keyCode === 27 || ev.keyCode === 13){
            this.setState({
                inEdit: false
            })
        }

        if(ev.keyCode === 13){
            this.commitAlter();
        }
    };

    commitAlter=()=>{
        let{current: input} = this.editInput;
        let content = input.value.trim();
        if(content){
            this.props.alterTodoContent(this.props.id,content);
        }else{
            this.props.deleteTodo(this.props.id);
        }
        input.value = '';
    };

    render() {
        let {content,
            deleteTodo,
            id,
            hasCompleted,
            toggleTodo,
            alterTodoContent
        } = this.props;
        let {inEdit} = this.state;

        let className = inEdit ? "editing" : '';
        className = hasCompleted ? className+" completed" : className;

        return (
            <li
                // className="completed"
                className={className}
            >
                <div className="view">
                    {/* 勾选按钮 */}
                    <input
                        checked={hasCompleted}
                        type="checkbox"
                        className="toggle"
                        onChange={()=>toggleTodo(id)}
                    />
                    {/* todo 的内容 */}
                    <label
                        ref="label"
                        onDoubleClick={this.onEdit}
                    >
                        {content}
                    </label>
                    {/* 删除按钮 */}
                    <button
                        onClick={()=>deleteTodo(id)}
                        className="destroy"
                        ref="btn"
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
