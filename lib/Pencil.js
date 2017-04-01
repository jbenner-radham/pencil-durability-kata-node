module.exports = class Pencil {
    /**
     * Initialize a new pencil instance.
     * @param {Number} pointDurability - The pencil's initial point durability.
     */
    constructor(pointDurability) {
        this.pointDurability = pointDurability;
    }

    /**
     * Write the supplied "text" argument to paper.
     *
     * @param {string} text - The text to write to the paper.
     * @param {string} paper - The paper to write to.
     * @returns {string} - The paper written to.
     */
    write(text, paper = '') {
        return (paper += text);
    }
}
