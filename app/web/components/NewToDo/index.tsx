import { Input, Table, Space, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { localStorageSet, localStorageGet } from '@/untils/localStorage';
import { connect } from 'dva';
import { nanoid } from 'nanoid';

const NewToDo = (props) => {
    const { dispatch, newtodo } = props;
    const [taskValue, setTaskValue] = useState('')
    useEffect(() => {
        loadList()
    }, [])
    // 获取列表
    const loadList = async () => {
        //获取待办列表
        dispatch({
            type: 'newtodo/loadList'
        })
    }
    // 全选
    const allCheck = (e) => {
        dispatch({
            type: 'newtodo/allCheck', 
            payload: {
                flag: e.target.checked
            }
        })
    }
    // 回车新增
    const keyUpHandler = (e) => {
        // enter
        if (e.keyCode === 13) {
            addtTask()
            setTaskValue('')
        }
    }

    // 新增
    const addtTask = () => {
        dispatch({
            type: 'newtodo/addtTask', 
            payload: {
                id: nanoid(),
                title: taskValue,
                done: false
            }
        })
    }

    // 单选
    const singleCheck = (id, e) => {
        dispatch({
            type: 'newtodo/singleCheck', 
            payload: {
                id,
                checked: e.target.checked,
            }
        })
    }

    // 删除
    const delTask = (id) => {
        dispatch({
            type: 'newtodo/delCart', 
            payload: {
                id
            }
        })
    }
    return (
        <>
            <section className={styles.todoapp}>
                <header className={styles.header}>
                    <h1>todos</h1>
                    <input
                        className={styles.newtodo}
                        autoFocus
                        autoComplete="off"
                        placeholder="What needs to be done?"
                        value={taskValue}
                        onChange={(e) => setTaskValue(e.target.value)}
                        onKeyUp={keyUpHandler}
                    />
                </header>
                <section className={styles.main}>
                    <input
                        id="toggle-all"
                        className={styles.toggleall}
                        type="checkbox"
                        onChange={allCheck}
                        checked={newtodo.isAll}
                    />
                    <label htmlFor="toggle-all"></label>
                    <ul className={styles.todolist}>
                        {
                            newtodo.list.map(task => (
                                <li
                                    key={task.id}
                                    className={task.done ? styles.todofinish : styles.todo}
                                >
                                    <div className={styles.view}>
                                        <input
                                            className={styles.toggle}
                                            type="checkbox"
                                            checked={task.done}
                                            onChange={(e) => singleCheck(task.id, e)} />
                                        <label > {task.title} </label>
                                        <button className={styles.destroy} onClick={() => delTask(task.id)}></button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </section>
                <footer className={styles.footer}>
                    <span className={styles.todocount}>
                        任务总数: {newtodo.list.length} 已完成: {newtodo.isFinished}
                    </span>
                </footer>
            </section>
        </>
    )
}
export default connect(models => ({
    newtodo: models['newtodo'],
}))(NewToDo)
