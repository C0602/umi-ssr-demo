import {localStorageGet,localStorageSet} from '@/untils/localStorage';
import {formatTimestamp} from '@/untils/date';

export default {
    
    state: {
        list: [],
        isFinished: 0,
        isAll: false
    },
    subscriptions: {
        setup({ dispatch, history }) { },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
    effects: {
        *loadList({ type, payload }, { put, call, select }) {
            if(!localStorageGet('todolist-'+formatTimestamp(new Date().getTime()))){
                return;
            }
            const data = Array.from(JSON.parse(localStorageGet('todolist-'+formatTimestamp(new Date().getTime()))));
            let isFinished = 0;
            let isAll = false;
            if(!!data){
                data.map((temp)=>{
                    if(temp.done){
                        isFinished++;
                    }
                })
                if(isFinished>=data.length){
                    isAll = true;
                }
            }
            //更新
            yield put({
                type: 'save',
                payload: {
                    list: data,
                    isFinished,
                    isAll,
                },
            });

        },
        *allCheck({ type, payload }, { put, call, select }) {
            let newtodo = yield select(state => state.newtodo);
            newtodo.list.forEach(item => item.done = payload.flag)
            //更新
            yield put({
                type: 'save',
                payload: {
                    list: newtodo.list
                },
            });
            localStorageSet('todolist-'+formatTimestamp(new Date().getTime()), JSON.stringify(newtodo.list));
            console.log("allCheck");
        },
        *singleCheck({ type, payload }, { put, call, select }) {
            let newtodo = yield select(state => state.newtodo);
            newtodo.list.map(item => {
                console.log("item",item);
                if(item.id === payload.id){
                    item.done = payload.checked;
                }
            });
            if(payload.checked){
                newtodo.isFinished++;
            }else{
                newtodo.isFinished--;
            }
            //更新
            yield put({
                type: 'save',
                payload: {
                    list: newtodo.list
                },
            });
            localStorageSet('todolist-'+formatTimestamp(new Date().getTime()), JSON.stringify(newtodo.list));
            console.log("singleCheck");
        },
        *addtTask({ type, payload }, { put, call, select }) {
            
            let newtodo = yield select(state => state.newtodo);
            // let list = Array.from(newtodo.list);
            let list = newtodo.list;

            console.log('payload 类型：',typeof payload);
            console.log('list 类型：',typeof list);


            list.push({
                id: payload.id,
                title: payload.title,
                done: payload.done
            });
            //正确写法
            // list = [...list,{
            //     id: payload.id,
            //     title: payload.title,
            //     done: payload.done
            // }];
            //更新
            yield put({
                type: 'save',
                payload: {
                    list,
                },
            });
            localStorageSet('todolist-'+formatTimestamp(new Date().getTime()), JSON.stringify(list));
            console.log("addtTask");
        },
        *delCart({ type, payload }, { put, call, select }) {
            let newtodo = yield select(state => state.newtodo);
            let list = newtodo.list.filter(item => item.id !== payload.id)
            let a = newtodo.isFinished;
            a--;
            //更新
            yield put({
                type: 'save',
                payload: {
                    list,
                    isFinished:a
                },
            });
            localStorageSet('todolist-'+formatTimestamp(new Date().getTime()), JSON.stringify(list));
            console.log("delCart");
        },
    },
};