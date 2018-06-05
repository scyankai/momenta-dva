import dva from "dva";

let global_dva_app = null;

function mva(opts) {
  global_dva_app = dva(opts);
  return mva;
}

mva.start = (...args) => {
  global_dva_app.start(...args);
  return mva;
};

mva.use = (...args) => {
  global_dva_app.use(...args);
  return mva;
};

mva.onError = (...args) => {
  global_dva_app.onError(...args);
  return mva;
};

mva.onAction = (...args) => {
  global_dva_app.onAction(...args);
  return mva;
};

mva.onStateChange = (...args) => {
  global_dva_app.onStateChange(...args);
  return mva;
};

mva.onEffect = (...args) => {
  global_dva_app.onEffect(...args);
  return mva;
};

mva.onHmr = (...args) => {
  global_dva_app.onHmr(...args);
  return mva;
};

mva.model = model => {
  const exist = global_dva_app._models.some(({ namespace }) => {
    return (
      namespace ===
      model.namespace.substring(model.namespace.lastIndexOf("/") + 1)
    );
  });
  if (exist) return;
  global_dva_app.model(model);
  return mva;
};

mva.unmodel = (...args) => {
  global_dva_app.unmodel(...args);
  return mva;
};

mva.router = (...args) => {
  global_dva_app.router(...args);
  return mva;
};

mva._get_global_dva_app = () => global_dva_app;

export default mva;
