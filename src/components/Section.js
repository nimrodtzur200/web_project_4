export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data; 
    this._renderer = renderer; 
    this._container = document.querySelector(containerSelector); 
  }

  renderer() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
