const chars = require('./chars');

module.exports = class Pencil {
    /**
     * Initialize a new pencil instance.
     *
     * @param {Number} pointDurability - The pencil's initial point durability.
     * @param {Number} eraserDurability - The pencil's initial eraser durability.
     */
    constructor(pointDurability, eraserDurability = 500) {
        this.length = 5;
        this.eraserDurability = eraserDurability;
        this.initialPointDurability = pointDurability;
        this.pointDurability = pointDurability;
    }

    /**
     * Get the degradation count for the provided text. Writing spaces and
     * newlines expends no graphite; therefore these are not counted. Lowercase
     * letters should degrade the pencil point by a value of one, and capital
     * letters should degrade the point by two.
     *
     * @param {String} text - The string to base point degradation off of.
     * @returns {Number} - The number of durability points expended.
     */
    static degradation(text) {
        return chars(text)
            .filter(char => char !== ' ')
            .filter(char => char !== '\n')
            .reduce((accumulator, character) => {
                // Use the `.toLowerCase` comparison instead of `.toUpperCase`
                // to properly value punctuation.
                let points = (character.toLowerCase() === character) ? 1 : 2;

                return (accumulator + points);
            }, 0);
    }

    /**
     * Make edits to a paper; overwriting whitespace.
     *
     * @param {String} paper - The paper to edit.
     * @param {String} addendum - The additional text to insert.
     * @param {Number} index - The zero based index to start at.
     * @returns {String} - The edited paper.
     */
    edit(paper, addendum, index) {
        let paperCharacters = chars(paper);
        let addendumCharacters = chars(addendum);
        let paperPosition = index;
        let addendumPosition = 0;

        do {
            // Account for character collisions.
            paperCharacters[paperPosition] = (paperCharacters[paperPosition] !== ' ')
                ? '@'
                : addendumCharacters[addendumPosition];
        } while (++paperPosition < (index + addendum.length) && ++addendumPosition);

        return paperCharacters.join('');
    }

    /**
     * Erase the last instance of the supplied word from a paper.
     *
     * @param {String} paper - The paper to erase from.
     * @param {String} erasureText - The term to erase (replace with spaces).
     * @returns {String} - The erased paper.
     */
    erase(paper, erasureText) {
        let index = paper.lastIndexOf(erasureText);
        let length = erasureText.length;
        let characters = chars(paper);
        let position = (index + (length - 1));

        while (this.eraserDurability-- && length--) {
            characters[position--] = ' ';
        }

        return characters.join('');
    }

    /**
     * Resets the pencil's point durability to it's initial value if there is
     * remaining length.
     *
     * @returns {Number} - The reinitialized point durability.
     */
    sharpen() {
        if (this.length === 0) {
            return this.pointDurability;
        }

        this.length -= 1;
        this.pointDurability = this.initialPointDurability;

        return this.pointDurability;
    }

    /**
     * Write the supplied "text" argument to paper.
     *
     * @param {String} text - The text to write to the paper.
     * @param {String} paper - The paper to write to.
     * @returns {String} - The paper written to.
     */
    write(text, paper = '') {
        return chars(text).reduce((accumulator, character) => {
            let degradation = Pencil.degradation(character);

            // If we have enough durability write the character.
            if (degradation <= this.pointDurability) {
                this.pointDurability -= degradation;

                return (accumulator + character);
            }

            // Newlines don't count against durability.
            if (character === '\n') {
                return (accumulator + character);
            }

            // If we don't have enough durability write a blank space.
            return (accumulator + ' ');
        }, paper);
    }
}
