import { UserLoginReq } from 'models/UserLogin';
import { createServer, Model, Response } from 'miragejs';
import { Result } from 'classes/Result';
import * as testData from 'raw-loader!./data/test.md';
export function makeServer({ environment = 'development' } = {}) {
  console.log('mock server started');
  return createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {},

    routes() {
      this.passthrough('/api/**');
      this.passthrough('/data/**');
      this.passthrough('https://www.baidu.com/**');
      this.passthrough('https://api.growingio.com/**');
      this.namespace = process.env.MOCK_API || '';
      this.get('/data/test.md', () => {
        return new Response(
          200,
          {},
          new Result({
            data: testData,
          })
        );
      });
      this.post('/login', (schema, request) => {
        const userLoginReq: UserLoginReq = JSON.parse(request.requestBody);
        if (['admin', 'test'].includes(userLoginReq.username)) {
          return new Response(
            200,
            {},
            new Result({
              data: {
                username: userLoginReq.username,
                token: '1111',
              },
            })
          );
        }
        return new Response(
          200,
          {},
          new Result({
            code: 401,
          })
        );
      });
    },
  });
}
