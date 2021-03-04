const WORDS = ["CODER", "TINKERER", "WIZARD", "DEVELOPER", "INVENTOR",
    "LINUX FANBOY", "USES ARCH BTW"];
const SHOWTIME = 20; // * 0.1s

window.addEventListener("load", () => {

    const elem = document.getElementById("desc-text");

    let ticks = 0;     // used for the blinking symbol
    let wordIndex = 0; // index of the current word
    let charShown = 0; // number of chars currently shown
    let waiting = 0;   // 0 -> typing; -1 -> deleting; >0 -> waiting
    window.setInterval(() => {
        ticks = (ticks + 1) % 8;
        elem.innerHTML = "&gt; " + WORDS[wordIndex].substring(0,charShown)
            + (ticks <= 3 ? "_" : "&nbsp;");

        if (waiting == -1) {
            if (charShown > 0) charShown--;
            else {
                waiting = 0;
                wordIndex = (wordIndex + 1) % WORDS.length;
            }
        } else {
            if (charShown <= WORDS[wordIndex].length) charShown++;
            else if (waiting == 0) waiting++;

            if (waiting <= SHOWTIME) waiting++;
            else {
                waiting = -1;
            }
        }
    },100);
});
