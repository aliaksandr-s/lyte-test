import {
  action, observable, reaction
} from 'mobx';
import { find, debounce } from 'lodash';

import * as api from '../utils/api';

class CategoriesStore {
  @observable isLoading = false;
  @observable categories = [];
  @observable isUpdating = false;
  @observable isUpdated = false;

  normalizeCategories = (categories) => (
    categories.map((categorie) => ({
      ...categorie,
      key: categorie.id,
      text: categorie.name,
      value: categorie.name,
    }))
  )

  updateCategorieInStore = (id, newVal) => {
    const objToUpdate = find(this.categories, { id: Number(id) });
    const valsToUpdate = ['name', 'text', 'value'];

    valsToUpdate.forEach((key) => objToUpdate[key] = newVal)
  }

  constructor() {
    reaction(
      () => this.isUpdated, debounce(() => {
        this.isUpdated = false
      }, 1000))
  }

  @action
  getCategories = async () => {
    try {
      this.isLoading = true;
      const resp = await api.getCategories();

      this.categories = this.normalizeCategories(resp.data.results);
    } catch (err) {
      console.error(err)
    } finally {
      this.isLoading = false;
    }
  }

  @action
  updateCategorie = async (id, value) => {
    try {
      this.isUpdating = true;
      const resp = await api.updateCategorie(id, value);

      const newValue = resp.data.name;
      this.updateCategorieInStore(id, newValue)
      this.isUpdated = true;
    } catch (err) {
      console.error(err);
    } finally {
      this.isUpdating = false;
    }
  }
}

export default CategoriesStore;