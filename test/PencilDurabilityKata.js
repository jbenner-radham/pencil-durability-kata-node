'use strict';

const expect = require('chai').expect;
const Pencil = require('../lib/Pencil');
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

        it('should append text to the paper', function () {
            this.kata.write('She sells sea shells');
            this.kata.write(' down by the sea shore');
            expect(this.kata.paper).to.equal('She sells sea shells down by the sea shore');
        });
    });

    describe('Point Degradation', function () {
        it('initializes a pencil with a point durability', function () {
            let pointDurability = 9001;
            let pencil = new Pencil(pointDurability);

            expect(pencil.pointDurability).to.equal(pointDurability);
        });
    });
});
