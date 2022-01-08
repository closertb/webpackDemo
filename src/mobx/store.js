import { observable } from "mobx";

class Store {
    @observable
    title = 'mobxDemo'
}
const store = new Store();

export default store;