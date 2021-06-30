const Wrapper = require("./wrapper");
const Date = require("./date");


let date = new Date({
    defaultDataCount:19
  });

const wrapper = new Wrapper({date, hightLoss:0.15, capital:300000});
wrapper.run();
wrapper.show(true);
// wrapper.history();
