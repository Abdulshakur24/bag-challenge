const { default: axios } = require("axios");

// By default, Heroku dyno ildes after half an hour of inactivity.
// so we want to ping these dyno after every 29 minutes, leaving no chance for dynos to idle.
function startKeepAlive() {
  let counts = 0;
  setInterval(function () {
    const urls = [
      "https://audiophile-e-commerce.herokuapp.com",
      "http://bag-2022.herokuapp.com",
    ];

    console.log(`request made: ${counts}`);

    for (let i = 0; i < urls.length; i++) {
      counts += 1;
      axios
        .get(urls[i], { method: "GET" })
        .then((data) => console.log(data.config.url));
    }
  }, 29 * 60 * 1000); // load every 58 minutes
}

startKeepAlive();
