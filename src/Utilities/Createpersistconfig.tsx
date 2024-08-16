import storage from 'redux-persist/lib/storage';

const createPersistConfig = (auth0Sub: string) => ({
  key: `cart_${auth0Sub}`,
  storage,
});

export default createPersistConfig;
