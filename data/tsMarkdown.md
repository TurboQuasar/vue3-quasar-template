## ts + markdown
## 如何安装

```bash
yarn add raw-loader -D
```
```js
configureWebpack: (config) => {
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.md$/i,
      loader: 'raw-loader',
    },
  ];
}
```
```typescript
import * as testData from 'raw-loader!./data/test.md';
```
