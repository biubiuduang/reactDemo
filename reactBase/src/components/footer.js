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
                    <span
                        onClick={()=>props.changeActiveType('all')}
                        className={props.activeType === 'all' ? "selected" : ''}
                    >All</span>

                </li>
                <li>
                    <span
                        onClick={()=>props.changeActiveType('active')}
                        className={props.activeType === 'active' ? "selected" : ''}
                    >Active</span>

                </li>
                <li>
                    <span
                        onClick={()=>props.changeActiveType('completed')}
                        className={props.activeType === 'completed' ? "selected" : ''}
                    >Completed</span>

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