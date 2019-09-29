import EventStore from './events';
import AuthStore from './auth';
import CategoriesStore from './categories';

class RootStore {
  constructor() {
    this.EventStore = new EventStore(this);
    this.AuthStore = new AuthStore(this);
    this.CategoriesStore = new CategoriesStore(this);
  }
}

const stores = new RootStore();

export default stores;
