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

        it('expends no point durability writing spaces', function () {
            expect(Pencil.degradation(' ')).to.equal(0);
        });

        it('expends no point durability writing newlines', function () {
            expect(Pencil.degradation('\n')).to.equal(0);
        });

        it('expends one point of durability writing a lowercase character', function () {
            expect(Pencil.degradation('a')).to.equal(1);
        });

        it('expends two points of durability writing an uppercase character', function () {
            expect(Pencil.degradation('A')).to.equal(2);
        });

        it('writes "text" to a paper with a point durability of 4', function () {
            let pencil = new Pencil(4);
            let text = 'text';

            expect(pencil.write(text)).to.equal(text);
        });

        it('writes "Tex " to a paper with a point durability of 4', function () {
            let pencil = new Pencil(4);
            let text = 'Text';

            expect(pencil.write(text)).to.equal("Tex ");
        });

        it('writes "Tex \\n" from "Text\\n" to a paper with a point durability of 4', function () {
            let pencil = new Pencil(4);
            let text = 'Text\n';

            expect(pencil.write(text)).to.equal("Tex \n");
        });
    });

    describe('Sharpen', function () {
        it('remembers the initial point durability the pencil was initialized with', function () {
            let durability = 9001;
            let pencil = new Pencil(durability);

            expect(pencil.initialPointDurability).to.equal(durability);
        });

        it('regains its initial point durability when the pencil is sharpened', function () {
            let durability = 55;
            let pencil = new Pencil(durability);

            pencil.write('Hello world!');
            expect(pencil.sharpen()).to.equal(durability);
        });

        it('should create a pencil with an initial length value', function () {
            expect(new Pencil(5).length).to.be.a('number');
        });

        it('reduces the length of the pencil by one each time it is sharpened', function () {
            let pencil = new Pencil(5);
            let initialLength = pencil.length;

            pencil.sharpen();
            expect(pencil.length).to.equal(initialLength - 1);
        });

        it('no longer sharpens the pencil when it\'s length is depleted', function () {
            let pencil = new Pencil(4);

            do {
                pencil.sharpen();
            } while (pencil.length > 0);

            pencil.write('text');
            pencil.sharpen();
            expect(pencil.pointDurability).to.equal(0);
        });
    });

    describe('Erase', function () {
        it('erases the last occurrence of the provided text on the paper', function () {
            let pencil = new Pencil(55);
            let erasureText = 'chuck';
            let paper = 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?';
            let expected = 'How much wood would a woodchuck chuck if a woodchuck could       wood?'

            expect(pencil.erase(paper, erasureText)).to.equal(expected);
        });
    });

    describe('Eraser Degradation', function () {
        it('initializes a pencil with eraser durability', function () {
            let eraserDurability = 9001;
            let pointDurability = 9001;
            let pencil = new Pencil(pointDurability, eraserDurability);

            expect(pencil.eraserDurability).to.equal(eraserDurability);
        });
    });
});
