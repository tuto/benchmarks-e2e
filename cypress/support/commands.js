let t0;
let quantityQuerys = 0;
let quantityQuerysFinished = 0;
let finishAllSelectors = false;
let selectors;
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })
Cypress.on('window:before:load', (win) => {
    win.document.addEventListener("DOMContentLoaded", () => {
        registerObservers(win)  
    }, false);
});
Cypress.Commands.add("registerSelectors", (s) => {
    quantityQuerys = s.length;
    selectors = s; 
    t0 = performance.now();   
})

function registerObservers(w) {

    if(selectors.length <= 0) {
      return;
    }
    quantityQuerys = selectors.length;
    selectors.forEach(query => {
      const observer = new MutationObserver((mutations, me) => {
        let element = w.document.querySelector(query);
        if (element) {
          quantityQuerysFinished++;
          console.log("Encontramos el elemento", query)
          console.log("El tiempo es", (performance.now() - t0)/1000)  
          if (quantityQuerys === quantityQuerysFinished) {
            finishAllSelectors = true
          }
          me.disconnect(); // stop observing
          expect(true).to.be.true;
          return;
        }
      });
  
      observer.observe(w.document, {
        childList: true,
        subtree: true,
        characterData: true
      });
    });
    
  }