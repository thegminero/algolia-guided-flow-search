import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares';
import {
  searchBox,
  configure,
  hits,
  pagination,
  refinementList,
  dynamicWidgets,
} from 'instantsearch.js/es/widgets';
import aa from 'search-insights';

import resultHit from '../templates/result-hit';
import customFacetRadio from './custom-radio-facet';
import OrderCart from './order-cart';
import UpdateCart from './update-cart';
import ViewProduct from './view-products';

/**
 * @class ResultsPage
 * @description Instant Search class to display content on main page.
 */
class ResultsPage {
  constructor() {
    this._registerClient();
  }

  // eslint-disable-next-line jsdoc/require-description
  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @returns {void}
   */
  _registerClient() {
     //Ideally, fetch Search Token from server, do not expose API key on client side code
      this._searchClient = algoliasearch('YourAppId', 'ApiKey');
      this._searchInstance = instantsearch({
        indexName: 'IndexName',
        searchClient: this._searchClient,
      });
      this._addBindEvents();
      this._registerWidgets();
      this._startSearch();
  }

  // eslint-disable-next-line jsdoc/require-description
  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @returns {void}
   */
  _registerWidgets() {
    const currentCategory = decodeURI(sessionStorage.getItem('AlgoliaCategory'))
    if (this._searchInstance) {
      this._searchInstance.addWidgets([
        configure({
            analyticsTags: [currentCategory, 'location', 'anonymous', 'aparato', 'autocomplete'],
            ruleContexts: [currentCategory, 'location', 'anonymous', 'aparato', 'global-search']
        }),
        searchBox({
          container: '#searchbox',
        }),
        hits({
          container: '#hits',
          templates: {
            item: resultHit,
          },
        }),
        pagination({
          container: '#pagination',
        }),
        customFacetRadio({
          container: document.querySelector('#custom-radi-radio-make'),
          attribute: 'make',
          title: 'Select a make',
        }),
        customFacetRadio({
          container: document.querySelector('#custom-radi-radio-model'),
          attribute: 'model',
          title: 'Select a model',
        }),
        customFacetRadio({
          container: document.querySelector('#custom-radi-radio-year'),
          attribute: 'year',
          title: 'Select a year',
        }),
        customFacetRadio({
          container: document.querySelector('#custom-radi-radio-new'),
          attribute: 'new',
          title: 'new vehicle?',
        })
      ]);
    }
  }
  // eslint-disable-next-line jsdoc/require-description
  /**
   * @private
   * Starts instant search after widgets are registered
   * @returns {void}
   */
  _startSearch() {
    if (this._searchInstance) {
      this._searchInstance.start();
    }
  }
  _initUpdateToCart() {
    // Update Cart event DOM propertie and event listener(s)
    this.updateCart = new UpdateCart();
  }
  _initOrderCart() {
    // Order Cart event listener(s)
    this.orderCart = new OrderCart();
  }
  _initProductViewModal() {
    // View Product Modal DOM properties and event listener(s)
    this.viewProdModal = new ViewProduct();
  }
  _addBindEvents() {
    // add insights middleware for events
    const insightsMiddleware = createInsightsMiddleware({
      insightsClient: aa,
    });

    // register insights token/user
    aa('setUserToken', 'discount-user');

    this._searchInstance.use(insightsMiddleware);

    // wait for instasearch hits to render to attach eventListeners to
    // action items - such as add to cart and view buttons on each hit
    this._searchInstance.on('render', () => {
      this._initUpdateToCart();
      this._initProductViewModal();
    });
    // init the Order Cart Listeners btn
    this._initOrderCart();
  }
}

export default ResultsPage;