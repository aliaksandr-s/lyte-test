import {
  action, observable,
} from 'mobx';

import * as api from '../utils/api';
import { persistAuth, retriveAuth, revokeAuth } from '../utils/auth';

class AuthStore {
  @observable isLoading = false;
  @observable isRegisterSuccess = false;
  @observable registerErrors = {};
  @observable authErrors = {};
  @observable isAuthenticated = !!retriveAuth();

  @action
  registerUser = async (email, password) => {
    try {
      this.isLoading = true;
      await api.register(email, password)

      this.isRegisterSuccess = true;
      this.registerErrors = {};
    } catch (err) {
      // console.log('reg errors', err.data);
      this.registerErrors = err.data;
    } finally {
      this.isLoading = false;
    }
  }

  @action
  authenticateUser = async (username, password) => {
    try {
      this.isLoading = true;
      const resp = await api.login(username, password)

      this.isAuthenticated = true;
      persistAuth(resp.data.token);
      this.authErrors = {};
    } catch (err) {
      // console.log('auth errors', err.data);
      this.authErrors = err.data;
    } finally {
      this.isLoading = false;
    }
  }

  @action
  logout = () => {
    this.isAuthenticated = false;
    revokeAuth();
  }
}

export default AuthStore;