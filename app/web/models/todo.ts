export default {
    state: {
        list: [
            {
                id: 1,
                title: '学习react',
                done: true
            },
            {
                id: 2,
                title: '搞定mobx',
                done: true
            }
        ]
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
        *loadAd({ type, payload }, { put, call, select }) {

        },
    },
};