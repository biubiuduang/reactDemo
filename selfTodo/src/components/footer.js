import React from 'react'

export default function Footer(props){
    return (
        <footer className="footer">
          <span className="todo-count">
            <strong> {props.leftItem} </strong>
            <span>item left</span>
          </span>
            <ul className="filters">
                <li>
                    <a
                        onClick={()=>props.todoFilter('all')}
                        className={props.todoType=== 'all' ? 'selected' : '' }
                    >All</a>

                </li>
                <li>
                    <a
                        onClick={()=>props.todoFilter('active')}
                        className={props.todoType === 'active' ? 'selected' : ''}
                    >Active</a>

                </li>
                <li>
                    <a
                        onClick={()=>props.todoFilter('completed')}
                        className={props.todoType === 'completed' ? 'selected' : ''}
                    >Completed</a>

                </li>
            </ul>
            {props.hasCompleted &&
                (
                    <button
                        className="clear-completed"
                        onClick={props.clearAllCompleted}
                    >
                        clear all completed
                    </button>
                )
            }

        </footer>
    )
}