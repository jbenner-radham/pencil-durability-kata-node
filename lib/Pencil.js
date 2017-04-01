module.exports = class Pencil {
    /**
     * Initialize a new pencil instance.
     * @param {Number} pointDurability - The pencil's initial point durability.
     */
    constructor(pointDurability) {
        this.pointDurability = pointDurability;
    }

    /**
     * Get the degradation count for the provided text. Writing spaces and
     * newlines expends no graphite; therefore these are not counted.
     *
     * @param {string} text - The string to base point degradation off of.
     * @returns {Number} - The number of durability points expended.
     */
    static degradation(text) {
        return text.split('')
            .filter(char => char !== ' ')
            .filter(char => char !== '\n')
            .reduce(accumulator => (accumulator + 1), 0);
    }

    /**
     * Write the supplied "text" argument to paper.
     *
     * @param {string} text - The text to write to the paper.
     * @param {string} paper - The paper to write to.
     * @returns {string} - The paper written to.
     */
    write(text, paper = '') {
        return (paper + text);
    }
}
