## keepAlive
### keepAlive 只支持第一层路由缓存
### keepAlive 嵌套路由缓存如何解决？
需要把嵌套的```<router-view>```拍平

也就是在路由守卫中添加一个将无用的 layout 布局过消除的方法：
下面提供了两个方法：
- 使用方法一的话需要避免```layout```的按需加载，因为按需加载的异步操作会让第一个被开启的视图组件缓存失效，需要进行一次路由切换才能正常缓存的问题

- 第二个方法可以兼容```layout```的按需加载，但是感觉相对第一种方法比较麻烦
```js
router.beforeEach((to, from, next) => {
  ...
  handleKeepAlive(to)
  ...
}

/**
 * 递归处理多余的 layout : <router-view>，
 * 让需要访问的组件保持在第一层 index : <router-view> 之下
 * @param to
 */
function handleKeepAlive (to) {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i]
      if (element.components.default.name === 'Layout') {
        to.matched.splice(i, 1)
        handleKeepAlive(to)
      }
    }
  }
}

/**
 * 方法 2 （兼容按需加载）：
 * @param to
 */
async function handleKeepAlive (to) {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i]
      if (element.components.default.name === 'Layout') {
        to.matched.splice(i, 1)
        await handleKeepAlive(to)
      }
      if (typeof element.components.default === 'function') {
        await element.components.default()
        await handleKeepAlive(to)
      }
    }
  }
}
```
