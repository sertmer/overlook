import chai, { expect } from 'chai';
import spies from 'chai-spies';

chai.use(spies);

import Customer from '../src/Customer';

let customer;


beforeEach(() => {
  customer = new Customer(1, "Leatha Ullrich", [], [])
})

describe('Customer', () => {
  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });
})