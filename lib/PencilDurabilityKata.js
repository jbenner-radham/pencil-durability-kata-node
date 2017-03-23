module.exports = class PencilDurabilityKata {
    /**
     * Initialize a new kata instance.
     */
    constructor() {
        this.paper = '';
    }

    /**
     * Write the supplied "text" argument to paper.
     *
     * @param {string} text - The text to write to the paper.
     * @returns {undefined}
     */
    write(text) {
        this.paper += text;
    }
}
