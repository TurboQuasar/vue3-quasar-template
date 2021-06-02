import {
  deserialize,
  JsonProperty,
  Serializable,
} from 'typescript-json-serializer';
import { mockApi } from 'boot/axios';
import { LOGIN_URL } from '../api';
export interface UserLoginReq {
  username: string;
  password: string;
}
@Serializable()
export class UserLogin {
  constructor() {}
  @JsonProperty() token: string;
  @JsonProperty({ name: 'username' }) role: string;
  @JsonProperty() username: string;

  static async login(payload: UserLoginReq) {
    const data = await mockApi.post(LOGIN_URL, payload);
    return deserialize<UserLogin>(data, UserLogin);
  }
}
