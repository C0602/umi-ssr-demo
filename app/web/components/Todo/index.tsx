import { Input, Table, Space, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { localStorageSet, localStorageGet } from '@/untils/localStorage';
import { connect } from 'dva';

const { Search } = Input;


const Todo = (props) => {
    const [list, setList] = useState([]);
    // 
    // 获取列表
    const loadList = async () => {
        //获取待办列表
        const data = JSON.parse(localStorageGet('todolist'));
        setList(data)
    }
    useEffect(() => {
        console.log("props",props);
        const data = [
            {
                "id": 1,
                "name": "吃饭",
                "des": "干饭人干饭魂"
            },
            {
                "id": 2,
                "name": "睡觉",
                "des": "不如睡觉写代码不如睡觉"
            },
            {
                "id": 3,
                "name": "打豆豆",
                "des": "不如睡觉写代码不如睡觉"
            }
        ]
        localStorageSet('todolist', JSON.stringify(data));
        loadList()
    }, [])

    // 删除
    const del = async (id) => {
        //获取待办列表
        const data = JSON.parse(localStorageGet('todolist'));
        //过滤
        const filter_data = Array.from(data).filter(p => {
            if (p.id === id) {
                return false;
            }
            return true;
        })
        localStorageSet('todolist', JSON.stringify(filter_data));
        loadList()
    }

    // 搜索
    const onSearch = async (value) => {
        //获取待办列表
        const data = JSON.parse(localStorageGet('todolist'));
        const filter_data = Array.from(data).filter(p => {
            if (p.name.indexOf(value) >= 0) {
                return true;
            }
            return false;
        })
        setList(filter_data)
    }

    const columns = [
        {
            title: '任务编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '任务名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '任务描述',
            dataIndex: 'des',
            key: 'des',
        },
        {
            title: '操作',
            dataIndex: 'do',
            key: 'do',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm title="确定要删除吗?"
                        onConfirm={() => del(record.id)}>
                        <a href="#">删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.searchbox}>
                <Search
                    placeholder="请输入关键词"
                    allowClear
                    enterButton="搜索"
                    size="large"
                    onSearch={onSearch}
                />
            </div>
            <Table bordered
                dataSource={list}
                columns={columns}
                rowKey={(record) => record.id}
                pagination={false} />
        </div>
    )
}
export default connect(models => ({
    todo: models['todo'],
}))(Todo)
// export default Todo
