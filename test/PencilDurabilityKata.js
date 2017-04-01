'use strict';

const expect = require('chai').expect;
const Pencil = require('../lib/Pencil');

describe('PencilDurabilityKata', function () {
    describe('Write', function () {
        it('writes to paper', function () {
            let text = 'Hello world!';

            expect(new Pencil(500).write(text)).to.equal(text);
        });

        it('should append text to the paper', function () {
            let pencil = new Pencil(500);
            let paper = '';

            paper = pencil.write('She sells sea shells', paper);
            paper = pencil.write(' down by the sea shore', paper);

            expect(paper).to.equal('She sells sea shells down by the sea shore');
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
