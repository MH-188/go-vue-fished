import { createRouter, createWebHashHistory } from 'vue-router';
import routes from "./routes/index"

//创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;