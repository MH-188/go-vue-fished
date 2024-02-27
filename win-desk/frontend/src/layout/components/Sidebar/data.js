
const data = [
    {
        name: 'index',
        path: '/home',
        meta: { title: '首页', icon: 'House' }
    },

    {
        path: '/rename',
        component: () => import('@/layout/index.vue'),
        name: 'Rename',
        meta: { title: '文件批量重命名', icon: 'Aim' },
        children: [
            {
                path: 'rename_file',
                name: 'renameFile',
                meta: { title: '文件重命名', icon: 'Edit' }
            },
        ]
    },
    {
        path: '/xhs',
        component: () => import('@/layout/index.vue'),
        name: 'Xhs',
        meta: { title: '小红书', icon: 'List' },
        children: [
            {
                path: 'red_book',
                name: 'redBook',
                meta: { title: '小红书文章图片获取', icon: 'Tools' }
            },
        ]
    },
    {
        path: '/ins',
        component: () => import('@/layout/index.vue'),
        name: 'Ins',
        meta: { title: 'Instagram', icon: 'Aim' },
        children: [
            {
                path: 'instagram',
                name: 'instagram',
                component: () => import('@/views/ins/Ins.vue'),
                meta: { title: 'instragram文章图片获取', icon: 'Edit' }
            },
        ]
    },

    // {
    //     path: '/mysql',
    //     name: 'MySQL',
    //     meta: { title: 'MySQL', icon: 'List' },
    //     children: [
    //         {
    //             path: 'sqlAnalysis',
    //             name: 'sqlAnalysis',
    //             meta: { title: 'SQL分析', icon: 'Tools' }
    //         },
    //         {
    //             path: 'sqlSlow',
    //             name: 'sqlSlow',
    //             meta: { title: 'SQL慢日志', icon: 'Histogram' }
    //         },
    //     ]
    // },

    // {
    //     path: '/redis',
    //     name: 'Redis',
    //     meta: { title: 'Redis', icon: 'Management' },
    //     children: [
    //         {
    //             path: 'rdb',
    //             name: 'rdb',
    //             meta: { title: 'rdb分析', icon: 'Histogram' }
    //         },
    //     ]
    // },

    // {
    //     path: '/nginx',
    //     name: 'Nginx',
    //     meta: { title: 'Nginx', icon: 'TrendCharts' },
    //     children: [
    //         {
    //             path: 'nginx',
    //             name: 'nginx',
    //             meta: { title: 'nginx分析', icon: 'TrendCharts' }
    //         },
    //     ]
    // },
    // {
    //     path: '/example',
    //     name: 'Example',
    //     meta: { title: '例子', icon: 'Aim' },
    //     children: [
    //         {
    //             path: 'table',
    //             name: 'Table',
    //             meta: { title: '表格', icon: 'Calendar' }
    //         },
    //         {
    //             path: 'query',
    //             name: 'query',
    //             meta: { title: '查询表格', icon: 'Calendar' }
    //         },
    //         {
    //             path: 'modal',
    //             name: 'modal',
    //             meta: { title: '函数式弹窗', icon: 'Calendar' }
    //         },
    //         {
    //             path: 'tree',
    //             name: 'Tree',
    //             meta: { title: 'Tree', icon: 'Present' }
    //         },
    //         {
    //             path: 'editor',
    //             name: 'editor',
    //             meta: { title: '富文本编辑器', icon: 'Edit' }
    //         },
    //         {
    //             path: 'drag',
    //             name: 'drag',
    //             meta: { title: '拖拽排序', icon: 'Edit' }
    //         },
    //         {
    //             path: 'button',
    //             name: 'button',
    //             meta: { title: '按钮', icon: 'Edit' }
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     name: 'form',
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'Form',
    //             meta: { title: '基础表单', icon: 'Edit' }
    //         },
    //         {
    //             path: 'stepform',
    //             name: 'stepform',
    //             meta: { title: '分步表单', icon: 'MessageBox' }
    //         },
    //         {
    //             path: 'customForm',
    //             name: 'customForm',
    //             meta: { title: '表单组件', icon: 'Form' }
    //         }
    //     ],
    //     meta: {
    //         title: '表单页面',
    //         icon: 'List',
    //     }
    // },
    // {
    //     path: '/nested',
    //     redirect: '/nested/menu1',
    //     name: 'Nested',
    //     meta: {
    //         title: '路由嵌套',
    //         icon: 'el-icon-s-operation'
    //     },
    //     children: [
    //         {
    //             path: 'menu1',
    //             name: 'Menu1',
    //             meta: { title: 'Menu1' },
    //             children: [
    //                 {
    //                     path: 'menu1-1',
    //                     name: 'Menu1-1',
    //                     meta: { title: 'Menu1-1' }
    //                 },
    //                 {
    //                     path: 'menu1-2',
    //                     name: 'Menu1-2',
    //                     meta: { title: 'Menu1-2' },
    //                     children: [
    //                         {
    //                             path: 'menu1-2-1',
    //                             name: 'Menu1-2-1',
    //                             meta: { title: 'Menu1-2-1' }
    //                         },
    //                         {
    //                             path: 'menu1-2-2',
    //                             name: 'Menu1-2-2',
    //                             meta: { title: 'Menu1-2-2' }
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     path: 'menu1-3',
    //                     name: 'Menu1-3',
    //                     meta: { title: 'Menu1-3' }
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'menu2',
    //             name: 'Menu2',
    //             meta: { title: 'menu2' }
    //         }
    //     ]
    // },
]



export default data;