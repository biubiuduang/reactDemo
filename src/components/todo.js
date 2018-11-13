import React,{Component} from 'react';

export default class Todo extends Component{
    constructor(props) {
        super(props);

    }
    render() {
        let {content,deleteTodo,id,hasCompleted,toggleTodo} = this.props;
        return (
            <div>
                <li
                    // className="completed"
                    // className="editing"
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
                        <label ref="label">
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
                        ref="editInput"
                    />
                </li>
            </div>
        )
    }
}
