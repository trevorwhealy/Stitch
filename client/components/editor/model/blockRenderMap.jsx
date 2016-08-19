import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

const RenderMap = Map({
  todo: {
    element: 'div',
  },
  pagebreak: {
    element: 'div',
  },
}).merge(DefaultDraftBlockRenderMap);


export default RenderMap;
