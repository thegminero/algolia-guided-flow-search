# custom-guided-search

This is a sample component which displays a custom facet in the form of a radio button group.
Each selected option guides the user to the next tab, whilst filtering results.

Towards the end of the user flow, the narrowed down results are displayed with  the previously selected filters.

## Pre-deployment considerations

- Replace AppId, searchApi key and index name in `components/results-page.js`

- Replace the attribute names you want to display options for in `index.html` as well as tab headers and so on.

- Replace hit properties in the `templates/result-hit.js`

- make sure that the `tabMapping` variable contains the right mapping for switching tabs upon selecting a facet value. This can be changed for a button that triggers similar behavior for advancing in the flow, should each section contain multiple facets.

## Deployment
- Run npm run install to install dependencies

- Run npm run start to view how the custom guided search interface.

## Dependencies

This sample repo uses Tailwindcss & Flowbite in addition to instantsearch dependencies.