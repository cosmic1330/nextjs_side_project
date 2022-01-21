import { Context } from "@ch20026103/backTest";
let context;
addEventListener("message", (event) => {
  // console.log("worker event message", event.target, event.type);
  let { data, options, num } = event.data;
  if (data && options) {
    context = new Context(data, { ...options });
    postMessage(context);
  } else if (num) {
    for (let i = 0; i <= num; i++) {
      context.run();
      if (i === num) postMessage(context);
    }
  }
});
