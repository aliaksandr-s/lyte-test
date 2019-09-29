import {
  action, observable, computed,
} from 'mobx';

import * as api from '../utils/api';

const DEFAULT_PAGES_TO_SHOW = 10;

class EventStore {
  @observable isLoading = true;
  @observable eventsCount = 0;
  @observable events = [];
  @observable currentEvent = {};
  @observable currentPage = 0;

  @computed get totalPages() {
    return Math.ceil(this.eventsCount / DEFAULT_PAGES_TO_SHOW)
  }

  @action
  getEvents = async (currentPage = this.currentPage) => {
    try {
      this.isLoading = true;
      const resp = await api.getEvents(DEFAULT_PAGES_TO_SHOW, currentPage * DEFAULT_PAGES_TO_SHOW);

      this.events = resp.data.results;
      this.currentPage = currentPage;
      this.eventsCount = resp.data.count;
    } catch (err) {
      console.error(err);
      // TODO: add better error handling later 
    } finally {
      this.isLoading = false;
    }
  }

  @action
  getEvent = async (id) => {
    try {
      this.isLoading = true;
      const resp = await api.getEvent(id);

      this.currentEvent = resp.data;
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }
}

export default EventStore;
