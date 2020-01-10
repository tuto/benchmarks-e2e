const devices = [ "macbook-15","ipad-2","iphone-6"];
devices.forEach((device) => {
    context('Benchmark' , () => {
        beforeEach(() => {
            cy.viewport(device)
        })
        it('Cargar google en ' + device, () => {
            let selectors = [
                '#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input'
            ]
            cy.registerSelectors(selectors);
            cy.visit('https://www.google.cl')
        })
    })    
});