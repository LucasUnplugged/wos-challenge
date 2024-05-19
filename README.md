# WOS Challenge

## Dev Choices

- I chose to use my own (open-source, but alpha) styling lib + design system. It includes a zero-config, fully-typed CSS-in-JS API.
  - NOTE: this API uses shorthands akin to `styled-system`; e.g.: `bg` for `background, or `px`and`py`for`padding-left`and`padding-right`.
  - Most of the shorthands should be intuitive, but you can [see the mapping here](https://github.com/withneutron/neutron-ui/blob/main/packages/quarks/src/config/props/mappedProps.ts#L21), if you're curious.
  - This lib includes typography and animations built into it. I chose to use those, but felt that was still in the spirit of the assignment, since I created the entire lib by myself, from scratch.
  - In terms of _accessibility_, it includes high-contrast color scales using color pairs like `primary9` and `primaryText9` (guaranteed to meet WCAG AA when paired together); as well as helpers for semantic html, like `<Row.Main>`
- I chose to include a mock "delete" feature, with restore. The functionality was quite similar to adding toggling "admin" status, and I felt it better showed the patterns of having action buttons on the right side of the member cards.
- I chose to sort the users list, both in the grouped and ungrouped views.

## Considerations for Production Env

- The main one would be turning the admin and delete toggling into backend data, rather than just local, runtime state.
- Another would be to introduce pagination, which would also change the sorting and grouping approach, likely to be based on how the data is queried, rather than anything on the frontend.
- Similarly, I would introduce a search field, which I would focus by default, so users can immediately start typing when this page opens.
- And finally, I would introduce the ability to add new users to the data set.
