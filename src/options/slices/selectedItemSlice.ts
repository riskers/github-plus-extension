import { RootState } from '@/options/store';
import { IGroup } from '@/services/idb/group';
import { ITag } from '@/services/idb/tag';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const NO_SELECT_GROUP = { id: -1, name: '' };
const NO_SELECT_TAG = { id: -1, name: '' };

interface ISelectItem {
  group: IGroup;
  tag: ITag;
  active: 'tag' | 'group' | null;
  type: 'STAR' | 'GIST' | null;
}

export const DEFAULT_SELECTED_ITEM = {
  group: NO_SELECT_GROUP,
  tag: NO_SELECT_TAG,
  active: null,
  type: null,
};

const initialState: ISelectItem = DEFAULT_SELECTED_ITEM;

export const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState,
  reducers: {
    selectType: (state, action: PayloadAction<Pick<ISelectItem, 'type'>>) => {
      state.type = action.payload.type;
    },
    starSelectGroup: (state, action: PayloadAction<Pick<ISelectItem, 'group'>>) => {
      // https://github.com/reduxjs/redux-toolkit/issues/521#issuecomment-624796711
      state.group = action.payload.group;
      state.tag = NO_SELECT_TAG;
      state.active = 'group';
      state.type = 'STAR';
    },
    starSelectTag: (state, action: PayloadAction<Pick<ISelectItem, 'tag'>>) => {
      state.group = NO_SELECT_GROUP;
      state.tag = action.payload.tag;
      state.active = 'tag';
      state.type = 'STAR';
    },
    gistSelectGroup: (state, action) => {
      state.group = action.payload.group;
      state.tag = NO_SELECT_TAG;
      state.active = 'group';
      state.type = 'GIST';
    },
    gistSelectTag: (state, action) => {
      state.group = NO_SELECT_GROUP;
      state.tag = action.payload.tag;
      state.active = 'tag';
      state.type = 'GIST';
    },
  },
});

// export const { selectGroup, selectTag } = selectedItemSlice.actions;
export const selectorItem = (state: RootState) => state.selectedItem;
export default selectedItemSlice.reducer;
