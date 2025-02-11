import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getAddress from '../../services/apiGeocoding';

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddess = createAsyncThunk('user/fetchAddress', async () => {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchAddess.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchAddess.fulfilled, (state, action) => {
      state.status = 'idle';
      state.position = action.payload.position;
      state.address = action.payload.address;
    })
    .addCase(fetchAddess.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
