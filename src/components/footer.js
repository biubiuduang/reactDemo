import React from 'react';

export default function(props){
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong> {props.leftItem} </strong>
                <span>item left</span>
            </span>
            <ul className="filters">
                <li>
                    <a
                        onClick={()=>props.changeActiveType('all')}
                        className={props.activeType === 'all' ? "selected" : ''}
                    >All</a>

                </li>
                <li>
                    <a
                        onClick={()=>props.changeActiveType('active')}
                        className={props.activeType === 'active' ? "selected" : ''}
                    >Active</a>

                </li>
                <li>
                    <a
                        onClick={()=>props.changeActiveType('completed')}
                        className={props.activeType === 'completed' ? "selected" : ''}
                    >Completed</a>

                </li>
            </ul>
            {/* 清除完成按钮 */}
            {
                props.showButton && (
                    <button
                        onClick={props.clearCompleted}
                        className="clear-completed"
                    >
                        clear all completed
                    </button>
                )
            }

        </footer>
    )
}