import { LitElement, html } from 'lit';
import './services/DBConn';
import { RealEstateProperties } from './services/RealEstateProperties';

class CustomTag extends LitElement {
  static properties = {
    realEstateProperties: { type: Array },
    searchValue: { type: String },
  };

  constructor() {
    super();
    this.realEstateProperties = [];
    this.searchValue = '';

    this.init();
  }

  async init() {
    this.realEstateProperties = await RealEstateProperties.getAll();
  }

  renderRealEstateProperties() {
    return (this.realEstateProperties.length > 0)
      ? this.realEstateProperties
          .filter(item => {
            const value = Object.keys(item).map(key => item[key]).join(' ');
            return value.toLowerCase().includes(this.searchValue.toLowerCase());
          })
          .map(item => {
            return html`
              <tr class="body__row">
                <td class="body__row__cell">${item.id}</td>
                <td class="body__row__cell">${item.type}</td>
                <td class="body__row__cell">${item.size}</td>
                <td class="body__row__cell">${item.price}</td>
                <td class="body__row__cell">${item.address}</td>
                <td class="body__row__cell">${item.phone}</td>
                <td class="body__row__cell">
                  <button class="cell__edit">Editar</button>
                  <button class="cell__delete">Eliminar</button>
                </td>
              </tr>
            `;
          })
      : html`<tr class="body__row"><td class="body__row__cell" colspan="7">No hay propiedades registradas</td></tr>`
    ;
  }

  render() {
    return html`
      <div class="or-properties">
        <h2 class="or-properties__title">Real Estate Properties</h2>
        <ul class="or-properties__controls">
          <li class="or-properties__controls__item">
            <input type="text" placeholder="Buscar" class="item__search" .value="${this.searchValue}" @keyup="${(e) => this.searchValue = e.target.value}">
          </li>
          <li class="or-properties__controls__item">
            <button class="item__new">Nuevo</button>
          </li>
        </ul>
        <table class="or-properties__table">
          <thead class="or-properties__table__head">
            <tr class="head__row">
              <th class="row__cell">ID</th>
              <th class="row__cell">Tipo</th>
              <th class="row__cell">Tamaño</th>
              <th class="row__cell">Precio</th>
              <th class="row__cell">Dirección</th>
              <th class="row__cell">Teléfono</th>
              <th class="row__cell"></th>
            </tr>
          </thead>
          <tbody class="or-properties__table__body">
            ${this.renderRealEstateProperties()}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('js-ecosystem', CustomTag);