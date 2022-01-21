let controllers = [];
addEventListener("message", async (event) => {
  let stockData = {};
  let promises = [];

  async function get(id) {
    const controller = new AbortController();
    const signal = controller.signal;
    controllers.push(controller);
    const res = await fetch(url + `id=${id}`, { signal });
    const data = await res.json();
    stockData[id] = data;
    return true;
  }

  async function splited(ids) {
    // for (let i = 0; i < ids.length; i++) {
    //   const id = ids[i];
    //   await get(id);
    //   if (i % 100 === 0 || i === ids.length - 1) postMessage(stockData);
    // }
    //  this will STATUS_BREAKPOINT
    promises = [];
    for (let i = 0; i < 100; i++) {
      const id = ids[i];
      promises.push(get(id));
    }
    await Promise.all(promises);
    postMessage(stockData);
    return true;
  }

  let { ids, url } = event.data;
  if (ids && url && ids.length > 0) {
    try {
      // abort before request
      controllers.forEach((controller) => {
        controller.abort();
      });
      // initial
      controllers = [];
      stockData = {};

      splited(ids);
    } catch (error) {}
  }
});
