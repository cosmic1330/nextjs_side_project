import { Context } from "@ch20026103/backTest";
import highterBefore from "../customMethods/buy/highterBefore";
import lowerBefore from "../customMethods/sell/lowerBefore";

let context;
addEventListener("message", (event) => {
  // console.log("worker event message", event.target, event.type);
  let { data, options, num } = event.data;
  if (data && options) {
    context = new Context(data, { ...options });
    postMessage(context);
  } else if (num) {
    context["customBuyMethod"] = highterBefore;
    context["customSellMethod"] = lowerBefore;
    for (let i = 1; i <= num; i++) {
      context.run();
      if (i === num) {
        /* postMessage 只接受實例化的 function 、 class */
        context["customBuyMethod"] = true
        context["customSellMethod"] = true;
        postMessage(context);
      }
    }
  }
});
