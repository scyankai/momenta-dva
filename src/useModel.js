import mva from "./mva";

function useModel(...models) {
  return target => {
    models.forEach(m => {
      mva.model(m);
    });

    return target;
  };
}

export default useModel;
