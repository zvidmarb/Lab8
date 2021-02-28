describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then($el => expect($el).to.have.value(75));
  });

  it('volume input changes when slider changes', () => {
    cy.get('#volume-number').invoke('val', 33).trigger('input');
    cy.get('#volume-slider').then($el => expect($el).to.have.value(33));
  });

  it('<audio> element volume changes when slider changes', () => {
    cy.get('#volume-number').invoke('val', 33).trigger('input');
    cy.get('#horn-sound').then($audio => expect($audio).to.have.prop('volume', 0.33));
  });

  //Test if the image and sound sources change when you select the party horn radio button
  it('img and sound sources change when selecting a horn radio button', () => {
    cy.get('#radio-party-horn').click();
    cy.get('#sound-image').then(
      $img => expect($img).to.have.attr('src', "./assets/media/images/party-horn.svg")
    );
    cy.get('#horn-sound').then(
      $audio => expect($audio).to.have.attr('src', "./assets/media/audio/party-horn.mp3")
    );
  });

  /*
   * Test if the volume image changes when increasing volumes (you must test for all 3 cases)
   */
  it('volume img changes when increasing volumes', () => {
    //testing muted volume
    cy.get('#volume-number').clear().type('0');
    cy.get('#volume-image').then(
      $img => expect($img).to.have.attr('src', "./assets/media/icons/volume-level-0.svg")
    );
    
    //testing volumes >0 and <34
    cy.get('#volume-number').clear().type('33');
    cy.get('#volume-image').then(
      $img => expect($img).to.have.attr('src', "./assets/media/icons/volume-level-1.svg")
    );

    //testing volumes >33 and <67
    cy.get('#volume-number').clear().type('66');
    cy.get('#volume-image').then(
      $img => expect($img).to.have.attr('src', "./assets/media/icons/volume-level-2.svg")
    );

    //testing volumes >66
    cy.get('#volume-number').clear().type('100');
    cy.get('#volume-image').then(
      $img => expect($img).to.have.attr('src', "./assets/media/icons/volume-level-3.svg")
    );
  });

 //Test if the honk button is disabled when the textbox input is a empty or a non-number
  it('honk button is disabled when volume text input is invalid', () => {
    //empty
    cy.get('#volume-number').clear();
    cy.get('#honk-btn').then($btn => expect($btn).to.have.attr('disabled', 'disabled'));

    //non-number
    cy.get('#volume-number').clear().type('non-number');
    cy.get('#honk-btn').then($btn => expect($btn).to.have.attr('disabled', 'disabled'));
    
  });

  //Test if an error is shown when you type a number outside of the given range for the volume textbox input
  it('an error is shown when volume text input is out of range', () => {
    cy.get('#volume-number').clear().type('105');
    cy.get('#volume-number').then($el => $el[0].checkValidity()).should('be.false');
  });
})
