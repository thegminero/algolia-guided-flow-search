import { connectRefinementList } from 'instantsearch.js/es/connectors';

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
      const select = document.createElement('select');
      select.classList.add('ais-custom-facet-radio');

      select.addEventListener('change', (event) => {
          refine(event.target.value);
        });
  
      widgetParams.container.appendChild(select);

    }

    const select = widgetParams.container.querySelector('.ais-custom-facet-radio');
  
    select.innerHTML = `<option value=""></option>
      ${items
        .map(
          (item) => `<option value="${item?.value}" class="option-facet">
            ${item?.label} (${item?.count})
          </option>`
        )
        .join('')}`;

    select.value = items[0]?.isRefined ? items[0]?.value : '';

  
    [...widgetParams.container.querySelectorAll('option-facet')].forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        refine(event.currentTarget.dataset.value);
      });
    });
  
  };

  const customFacetDropdown = connectRefinementList(
    renderRefinementList
  );

    

  export default customFacetDropdown;