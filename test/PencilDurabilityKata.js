'use strict';

const expect = require('chai').expect;
const PencilDurabilityKata = require('../lib/PencilDurabilityKata');

describe('PencilDurabilityKata', function () {
    beforeEach(function () {
        this.kata = new PencilDurabilityKata;
    });

    describe('Write', function () {
        it('initializes with a blank paper', function () {
            expect(this.kata.paper).to.equal('');
        });

        it('writes to paper', function () {
            let text = 'Hello world!';

            this.kata.write(text);
            expect(this.kata.paper).to.equal(text);
        });
    });
});
