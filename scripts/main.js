((window, document) => {
  let allLinks = document.querySelectorAll("a.lightbox");

  for (let index = 0; index < allLinks.length; index++) {
    const link = allLinks[index];
    const innerWidth = window.innerWidth;
    link.href = link.href.replace("w_1024", `w_${innerWidth}`);
  }
})(window, document);

const tobii = new Tobii();
