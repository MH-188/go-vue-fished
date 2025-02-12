//路由
const routes = [
    {
        name: "layout",
        path: "/",
        redirect: '/home',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: "/home",
                component: () => import('@/views/home/index.vue'),
                meta: { title: "首页" }
            }
        ]
    },

    {
        path: '/rename',
        component: () => import('@/layout/index.vue'),
        name: 'Rename',
        meta: { title: '重命名', icon: 'Aim' },
        children: [
            {
                path: 'rename_file',
                name: 'renameFile',
                component: () => import('@/views/rename/Rename.vue'),
                meta: { title: '文件重命名', icon: 'Edit' }
            },
        ]
    },

    {
        path: '/xhs',
        component: () => import('@/layout/index.vue'),
        name: 'Xhs',
        meta: { title: '小红书', icon: 'Aim' },
        children: [
            {
                path: 'red_book',
                name: 'redBook',
                component: () => import('@/views/xhs/Xhs.vue'),
                meta: { title: '小红书文章图片获取', icon: 'Edit' }
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

    {
        path: '/mysql',
        component: () => import('@/layout/index.vue'),
        name: 'MySQL',
        meta: { title: 'MySQL', icon: 'Aim' },
        children: [
            {
                path: 'sqlAnalysis',
                name: 'sqlAnalysis',
                component: () => import('@/views/mysql/sqlAnalysis.vue'),
                meta: { title: 'SQL分析', icon: 'Edit' }
            },

            {
                path: 'sqlSlow',
                name: 'sqlSlow',
                component: () => import('@/views/mysql/sqlSlow.vue'),
                meta: { title: 'SQL慢日志', icon: 'Edit' }
            },
        ]
    },

    {
        path: '/redis',
        component: () => import('@/layout/index.vue'),
        name: 'Redis',
        meta: { title: 'Redis', icon: 'List' },
        children: [
            {
                path: 'rdb',
                name: 'rdb',
                component: () => import('@/views/redis/rdb.vue'),
                meta: { title: 'rdb分析', icon: 'Histogram' }
            },
        ]
    },

    {
        path: '/nginx',
        component: () => import('@/layout/index.vue'),
        name: 'Nginx',
        meta: { title: 'Nginx', icon: 'List' },
        children: [
            {
                path: 'nginx',
                name: 'nginx',
                component: () => import('@/views/nginx/nginx.vue'),
                meta: { title: 'nginx分析', icon: 'TrendCharts' }
            },
        ]
    },

    {
        path: '/example',
        component: () => import('@/layout/index.vue'),
        name: 'Example',
        meta: { title: '例子', icon: 'Aim' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/views/table/index.vue'),
                meta: { title: '表格', icon: 'Calendar' }
            },
            {
                path: 'query',
                name: 'query',
                component: () => import('@/views/table/list.vue'),
                meta: { title: '查询表格', icon: 'Calendar' }
            },
            {
                path: 'modal',
                name: 'modal',
                component: () => import('@/views/example/modal.vue'),
                meta: { title: '函数式弹窗', icon: 'Calendar' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () => import('@/views/example/tree.vue'),
                meta: { title: 'Tree', icon: 'Present' }
            },
            {
                path: 'editor',
                name: 'editor',
                component: () => import('@/views/example/editor.vue'),
                meta: { title: '富文本编辑器', icon: 'Edit' }
            },
            {
                path: 'drag',
                name: 'drag',
                component: () => import('@/views/example/drag.vue'),
                meta: { title: '拖拽排序', icon: 'Edit' }
            },
            {
                path: 'button',
                name: 'button',
                component: () => import('@/views/example/g-button.vue'),
                meta: { title: '按钮', icon: 'Edit' }
            }
        ]
    },
    {
        path: '/form',
        component: () => import('@/layout/index.vue'),
        name: 'form',
        children: [
            {
                path: 'index',
                name: 'Form',
                component: () => import('@/views/form/index.vue'),
                meta: { title: '基础表单', icon: 'Edit' }
            },
            {
                path: 'stepform',
                name: 'stepform',
                component: () => import('@/views/form/stepform.vue'),
                meta: { title: '分步表单', icon: 'MessageBox' }
            },
            {
                path: 'customForm',
                name: 'customForm',
                component: () => import('@/views/form/custom_form.vue'),
                meta: { title: '表单组件', icon: 'Form' }
            }
        ],
        meta: {
            title: '表单页面',
            icon: 'List',
        }
    },
    {
        path: '/nested',
        component: () => import('@/layout/index.vue'),
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: '路由嵌套',
            icon: 'el-icon-s-operation'
        },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index.vue'),
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index.vue'),
                name: 'Menu2',
                meta: { title: 'menu2' }
            }
        ]
    },
    {
        path: "/login",
        component: () => import('@/views/user/login.vue'),
        meta: {
            title: "登录"
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/exception/404.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }
]

export default routes
