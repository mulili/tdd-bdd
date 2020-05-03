const timer = callBack => {
  setInterval(() => {
    callBack();
  }, 3000);
};

export default timer;
