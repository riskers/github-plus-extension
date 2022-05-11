import { IStar } from '@/common/api';
import { ISeachGroupParams, ISeachTagParams, starInstace } from '@/services/starInstance';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchStarsByGroup = createAsyncThunk('stars/fetchStarsByGroup', async (params: ISeachGroupParams) => {
  const stars = await starInstace.getStarsListByGroup(params);
  return stars;
});

export const fetchStarsByTag = createAsyncThunk('stars/fetchStarsByTag', async (params: ISeachTagParams) => {
  const stars = await starInstace.getStarsListByTag(params);
  return stars;
});

export interface IListState {
  loading: boolean;
  data: IStar[];
}

const initialState = {
  loading: false,
  data: [],
};

export const starsSlice = createSlice({
  name: 'stars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarsByGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStarsByGroup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchStarsByGroup.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchStarsByTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStarsByTag.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchStarsByTag.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default starsSlice.reducer;
