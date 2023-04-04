import { connectRefinementList } from 'instantsearch.js/es/connectors';

const tabMapping = {
    "Make": "New",
    "New": "Model",
    "Model": "Year",
    "Year": "Results",
    "Results": "Results"
}

const renderRefinementList = (renderOptions, isFirstRender) => {
    const {
      items,
      isFromSearch,
      refine,
      createURL,
      isShowingMore,
      canToggleShowMore,
      searchForItems,
      toggleShowMore,
      widgetParams,
    } = renderOptions;
  
    if (isFirstRender) {
      const select = document.createElement('div');
      select.classList.add('ais-custom-facet-radio');
      select.classList.add('w-full');
      select.classList.add('flex');
      select.classList.add('justify-between');

      select.addEventListener('change', (event) => {
          refine(event.target.value);
        });
  
      widgetParams.container.appendChild(select);

    }

    const select = widgetParams.container.querySelector('.ais-custom-facet-radio');
    
    select.innerHTML = `<ul class="items-center w-full text-sm font-medium cursor-pointer text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            ${items
                                .map(
                                (item) => `<li key=${item.value} class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div class="flex items-center pl-3">
                                                    <input id="${item.value}" type="radio" value="${item.value}" name="${widgetParams.attribute}" class="radio-facet w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                                    <label for="${item.value}" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${item.label}</label>
                                                </div>
                                            </li>`)
                                .join('')}
                        </ul>`;

    select.value = items[0]?.isRefined ? items[0]?.value : '';
  
    [...widgetParams.container.querySelectorAll('.radio-facet')].forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        refine(event.target.value);
        const tabName = `${widgetParams.attribute[0].toUpperCase()}${widgetParams.attribute.substring(1)}`;
        openPage(tabMapping[`${tabName}`])
      });
    });
  
  };

  const customFacetRadio = connectRefinementList(
    renderRefinementList
  );

  

    

  export default customFacetRadio;