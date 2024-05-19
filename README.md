# WOS Challenge

## Dev Choices

- I chose to use my own (open-source, but alpha) styling lib + design system. It includes a zero-config, fully-typed CSS-in-JS API.
  - NOTE: this API uses shorthands akin to `styled-system`; e.g.: `bg` for `background, or `px`and`py`for`padding-left`and`padding-right`.
  - Most of the shorthands should be intuitive, but you can [see the mapping here](https://github.com/withneutron/neutron-ui/blob/main/packages/quarks/src/config/props/mappedProps.ts#L21), if you're curious.
  - This lib includes typography and animations built into it. I chose to use those, but felt that was still in the spirit of the assignment, since I created the entire lib by myself, from scratch.

## Considerations for Production Env
