import mva from "./mva";

export default action => {
  const app = mva._get_global_dva_app();
  app._store.dispatch(action);
};
