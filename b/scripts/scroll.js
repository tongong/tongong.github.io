window.addEventListener("load", function() {
    const scrollicons = Array.from(document.querySelectorAll(".scroll-circle"));
    let pageNumber = scrollicons.length;
    Array.from(document.querySelectorAll(".page")).forEach((e,i) => {
        scrollicons[i].onclick = () => {
            e.scrollIntoView({behavior: "smooth"});
        }
    });

    let prevPage = 0; // previously viewed page
    const scrollElem = document.getElementById("scroll-highlight");
    let startedAnim = false;
    function scrollAnimation() {
        // get current viewed page
        let page = Math.round(document.scrollingElement.scrollTop / (document.scrollingElement.scrollHeight - document.scrollingElement.clientHeight) * (pageNumber-1));
        if (page != prevPage && !startedAnim) {
            startedAnim = true;
            if (page > prevPage) {
                scrollElem.style.height = (8 + (page-prevPage) * 22) + "px";
                setTimeout(() => {
                    scrollElem.style.height = "8px";
                    scrollElem.style.top = page * 22 + "px";
                    setTimeout(() => {
                        scrollElem.style.height = "8px";
                        startedAnim = false;
                        // run animation multiple times if the user scrolls fast
                        scrollAnimation(page);
                    }, 200);
                }, 200);
            } else {
                scrollElem.style.top = page * 22 + "px";
                scrollElem.style.height = (8 + (prevPage-page) * 22) + "px";
                setTimeout(() => {
                    scrollElem.style.height = "8px";
                    setTimeout(() => {
                        startedAnim = false;
                        scrollAnimation(page);
                    }, 200);
                }, 200);
            }
            prevPage = page;
        }
    }
    document.onscroll = scrollAnimation;

    function toPage(pageNum) {
        document.querySelectorAll(".page")[pageNum].scrollIntoView({behavior: "smooth"});
    }
    document.getElementById("projects-link").onclick = () => { toPage(1); };
    document.getElementById("about-link").onclick = () => { toPage(2); };
});
