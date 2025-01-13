import View from './View';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded!';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnAddIng = document.querySelector('.btn--add-ingredient');
  _btnUpload = document.querySelector('.upload__btn');
  _ingContainer = document.querySelector('.ingredient-container');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerAddIngredient(handler) {
    this._btnAddIng.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const btn = e.target.closest('.btn--add-ingredient');
      if (!btn) return;
      handler();
    });
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup(ing) {
    return `
    <label>Quantity</label>
    <input value="2" class="ingredient" type="number" name="quantity-${ing}" placeholder="Quantity" />
    <label>Unit</label>
    <input value="cloves" class="ingredient" type="text" name="unit-${ing}" placeholder="Unit" />
    <label>Ingredient</label>
    <input value="Garlic" class="ingredient" type="text" required name="ingredient-${ing}" placeholder="Ingredient" />`;
  }
}

export default new AddRecipeView();
