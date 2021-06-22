class Dictionary {
  // items作为私有变量，是字典的载体
  items: Record<any, any> = {};
  // has方法，如果某个键值存在于这个字典中，则返回true，反之则返回false
  has = (key) => {
    return key in this.items;
  };
  // set方法，向字典中添加新元素
  set = (key, value) => {
    this.items[key] = value;
  };
  // remove方法，通过使用键值来从字典中移除键值对应的数据值
  remove = (key) => {
    if (this.has(key)) {
      delete this.items[key];
      return true;
    }
    return false;
  };
  // get方法，通过键值查找特定的数值并返回
  get = (key) => {
    return this.has(key) ? this.items[key] : undefined;
  };
  // clear方法，将这个字典中的所有元素全部删除
  clear = () => {
    // 清空字典列表
    this.items = {};
  };
  // size方法，返回字典所包含元素的数量。与数组的length属性类似
  size = () => {
    // Object.keys不会遍历原型链上的属性
    return Object.keys(this.items).length;
  };
  // keys方法，将字典所包含的所有键名以数组形式返回
  keys = () => {
    return Object.keys(this.items);
  };
  // values方法，将字典所包含的所有数值以数组形式返回
  values = () => {
    const values: any[] = [];
    for (const k in this.items) {
      // 用has方法判断，避免遍历到原型链上的属性
      if (this.has(k)) {
        values.push(this.items[k]);
      }
    }
    return values;
  };
}

export class Graph {
  private _vertices: (string | number)[] = [];
  private _adjList = new Dictionary();
  constructor() {}
  addVertex = (v) => {
    this._vertices.push(v);
    this._adjList.set(v, []);
  };
  addEdge = (v, w) => {
    this._adjList.get(v).push(w);
    this._adjList.get(w).push(v);
  };
}
