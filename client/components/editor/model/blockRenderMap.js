import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

const RenderMap = Map({
  todo: {
    element: 'div',
  },
}).merge(DefaultDraftBlockRenderMap);


export default RenderMap;
