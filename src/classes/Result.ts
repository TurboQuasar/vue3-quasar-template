//返回参数类型定义
export class Result<T> {
  code: number = 200;
  message?: string;
  data?: T;
  constructor(options: Partial<Result<T>>) {
    Object.assign(this, options);
  }
}
