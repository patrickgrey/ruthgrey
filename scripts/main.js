((window, document) => {
  let allLinks = document.querySelectorAll("a.lightbox");

  for (let index = 0; index < allLinks.length; index++) {
    const link = allLinks[index];
    const innerWidth = window.innerWidth;
    link.href = link.href.replace("w_1024", `w_${innerWidth}`);
  }

  const superSecretWord = "rpgr";
  let secretInput = "";
  const ruth = document.querySelector("h1 span:nth-child(1)");
  const grey = document.querySelector("h1 span:nth-child(2)");
  const portfolio = document.querySelector("h1 span:nth-child(3)");

  function handleSpanClick(_letter) {
    secretInput += _letter;
    console.log(secretInput);
    if (secretInput === superSecretWord) {
      console.log("YOU MAY ENTERRRR!!");
      window.location.href = "upload/";
    }
  }

  ruth.addEventListener("click", function (event) {
    handleSpanClick("r");
  });

  portfolio.addEventListener("click", function (event) {
    handleSpanClick("p");
  });

  grey.addEventListener("click", function (event) {
    handleSpanClick("g");
  });
})(window, document);

const tobii = new Tobii();
