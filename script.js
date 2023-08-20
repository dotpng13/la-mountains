const container = document.querySelector(".carousel-container");
const track = document.querySelector(".carousel-track");
let groups = Array.from(track.children);
const carouselNav = document.querySelector(".carousel-nav");
let indicators = Array.from(carouselNav.children);

const images = [
    "images/photo1.png",
    "images/photo2.png",
    "images/photo1.png",
    "images/photo2.png",
    "images/photo2.png",
    "images/photo1.png",
    "images/photo2.png",
    "images/photo1.png",
    "images/photo1.png",
    "images/photo2.png",
    "images/photo2.png",
    "images/photo1.png"
];

function generateGroups(isFour, isThree, isTwo, isOne) {
    for (let i = 0; i < images.length; i++) {
        let hasHalf = isFour || isThree;
        let group = document.createElement("div");
        group.classList.add("carousel-group");
        for (let j = 0; j < 2; j++) {
            i += j;
            let half = document.createElement("div");
            if (hasHalf) {
                half.classList.add("carousel-half");
            }
            let leftImage = document.createElement("img");
            if (isOne) {
                leftImage.classList.add("carousel-single");
            } else {
                leftImage.classList.add("carousel-half-left");
            }
            leftImage.src = images[i];
            if (hasHalf) {
                half.appendChild(leftImage);
            } else {
                group.appendChild(leftImage);
            }
            if (isFour || (j === 0 && isThree) || isTwo) {
                i++;
                let rightImage = document.createElement("img");
                rightImage.classList.add("carousel-half-right");
                rightImage.src = images[i];
                if (isTwo) {
                    group.appendChild(rightImage);
                } else {
                    half.appendChild(rightImage);
                }
            }
            if (hasHalf) {
                group.appendChild(half);
            } else {
                break;
            }
        }
        track.appendChild(group);
    }
    track.firstChild.classList.add("current-group");
}

function initializeCarousel(hasHalf) {
    groups = Array.from(track.children);
    indicators = Array.from(carouselNav.children);

    let groupMargin = 0;
    if (hasHalf) {
        groupMargin = Number((getComputedStyle(groups[0].children[0]).marginRight).slice(0, -2));
    }

    let groupWidth = (groups[0].getBoundingClientRect().width) - groupMargin;

    container.style.width = `${groupWidth}px`;

    groups.forEach((group, index) => {
        group.style.left = `${(index * groupWidth)}px`;
    });
}

function generateIndicators(num) {
    for (let i = 0; i < num; i++) {
        let button = document.createElement("button");
        button.classList.add("carousel-indicator");
        carouselNav.appendChild(button);
    }
    carouselNav.firstChild.classList.add("current-group");
}

carouselNav.addEventListener("click", e => {
    const targetIndicator = e.target.closest("button");

    if (!targetIndicator) return;

    const currentGroup = track.querySelector(".current-group");
    const currentIndicator = carouselNav.querySelector(".current-group");
    const targetIndex = indicators.findIndex(indicator => indicator === targetIndicator);
    const targetGroup = groups[targetIndex];

    track.style.transform = `translateX(-${targetGroup.style.left})`;
    currentGroup.classList.remove("current-group");
    targetGroup.classList.add("current-group");

    currentIndicator.classList.remove("current-group");
    targetIndicator.classList.add("current-group");
});

function generateTabs(isAccordian) {
    let tabContainer = document.createElement("div");
    tabContainer.classList.add("team-tab-container");

    let tabDiv = document.createElement("div");
    tabDiv.classList.add("team-tab");

    let mtn1Button = document.createElement("button");
    mtn1Button.classList.add("team-tab-link");
    mtn1Button.classList.add("current-tab");
    mtn1Button.textContent = "MOUNTAIN 1";
    let mtn2Button = document.createElement("button");
    mtn2Button.classList.add("team-tab-link");
    mtn2Button.textContent = "MOUNTAIN 2";

    tabDiv.appendChild(mtn1Button);
    if (!isAccordian) tabDiv.appendChild(mtn2Button);

    tabContainer.appendChild(tabDiv);

    mountainContainer.appendChild(tabContainer);

    let contentContainer = document.createElement("div");
    contentContainer.classList.add("team-tab-content-container");

    let mountain1 = document.createElement("div");
    mountain1.id = "mountain-1";
    mountain1.classList.add("team-tab-content");
    mountain1.classList.add("current-tab");
    let mountain2 = document.createElement("div");
    mountain2.id = "mountain-2";
    mountain2.classList.add("team-tab-content");

    let textContainer1 = document.createElement("div");
    textContainer1.classList.add("team-tab-text-container");
    let textContainer2 = document.createElement("div");
    textContainer2.classList.add("team-tab-text-container");

    let textDiv1 = document.createElement("div");
    textDiv1.classList.add("team-tab-text");
    let textDiv2 = document.createElement("div");
    textDiv2.classList.add("team-tab-text");

    let schedule = document.createElement("h2");
    schedule.textContent = "SCHEDULE";

    let br = document.createElement("p");
    br.innerHTML = "<br>";

    textDiv1.appendChild(schedule.cloneNode(true));
    appendDate(textDiv1, "25 Nov 2016");
    appendDate(textDiv1, "28 Nov 2016");
    textDiv1.appendChild(br.cloneNode(true));
    appendDate(textDiv1, "18 Dec 2016");
    textDiv1.appendChild(br.cloneNode(true));
    appendDate(textDiv1, "7 Jan 2017");

    textDiv2.appendChild(schedule.cloneNode(true));
    appendDate(textDiv2, "17 Nov 2016");
    textDiv2.appendChild(br.cloneNode(true));
    appendDate(textDiv2, "13 Dec 2016");
    appendDate(textDiv2, "28 Dec 2016");
    textDiv2.appendChild(br.cloneNode(true));
    appendDate(textDiv2, "9 Jan 2017");

    textContainer1.appendChild(textDiv1);
    textContainer2.appendChild(textDiv2);

    mountain1.appendChild(textContainer1);
    mountain2.appendChild(textContainer2);

    contentContainer.appendChild(mountain1);
    if (!isAccordian) contentContainer.appendChild(mountain2);

    mountainContainer.appendChild(contentContainer);

    if (isAccordian) {
        let tabContainer2 = document.createElement("div");
        tabContainer2.classList.add("team-tab-container");

        let tabDiv2 = document.createElement("div");
        tabDiv2.classList.add("team-tab");

        tabDiv2.appendChild(mtn2Button);

        tabContainer2.appendChild(tabDiv2);

        mountainContainer.appendChild(tabContainer2);

        let contentContainer2 = document.createElement("div");
        contentContainer2.classList.add("team-tab-content-container");

        contentContainer2.appendChild(mountain2);

        mountainContainer.appendChild(contentContainer2);
    }
}

function appendDate(divElement, date) {
    let para = document.createElement("p");

    let dateSpan = document.createElement("span");
    dateSpan.textContent = date;
    let vest = document.createElement("span");
    vest.textContent = "Vestibulum viverra";

    para.appendChild(dateSpan);
    para.appendChild(vest);

    divElement.appendChild(para);
}

function initializeTabs(isAccordian) {
    if (isAccordian) {
        tabContentContainer = document.querySelectorAll(".team-tab-content-container");
        pages = [];
        tabContentContainer.forEach((page) => {
            pages = pages.concat(Array.from(page.children));
        });
        tabNav = document.querySelectorAll(".team-tab");
        tabs = [];
        tabNav.forEach((tab) => {
            tabs = tabs.concat(Array.from(tab.children));
        });
    } else {
        tabContentContainer = document.querySelector(".team-tab-content-container");
        pages = Array.from(tabContentContainer.children);
        tabNav = document.querySelector(".team-tab");
        tabs = Array.from(tabNav.children);
    }
}

function addTabNavEventListener(isAccordian) {
    if (isAccordian) {
        tabNav.forEach((tab) => {
            tab.addEventListener("click", displayPage);
        });
    } else {
        tabNav.addEventListener("click", displayPage);
    }
}

function displayPage(e) {
    const targetTab = e.target.closest("button");

    if (!targetTab) return;

    const currentMountain = document.getElementsByClassName("current-tab");
    const currentPage = currentMountain[1];
    const currentTab = currentMountain[0];
    const targetPageIndex = tabs.findIndex(tab => tab === targetTab);
    const targetPage = pages[targetPageIndex];

    currentPage.style.display = "none";
    currentPage.classList.remove("current-tab");
    targetPage.style.display = "flex";
    targetPage.classList.add("current-tab");

    currentTab.classList.remove("current-tab");
    targetTab.classList.add("current-tab");
}

const mountainContainer = document.querySelector(".team-mountain-container");
let tabContentContainer = document.querySelector(".team-tab-content-container");
let pages = Array.from(tabContentContainer.children);
let tabNav = document.querySelector(".team-tab");
let tabs = Array.from(tabNav.children);

function deleteContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

const mediaFour = window.matchMedia("(max-width: 960px)");
const mediaThree = window.matchMedia("(max-width: 720px)");
const mediaTwo = window.matchMedia("(max-width: 480px)");

function checkFour(e) {
    if (e.matches) {
        // 3 image carousel
        deleteContainer(track);
        generateGroups(false, true, false, false);
        deleteContainer(carouselNav);
        generateIndicators(4);
        initializeCarousel(true);
        track.style.transform = `translateX(0)`;
    } else {
        // 4 image carousel
        deleteContainer(track);
        generateGroups(true, false, false, false);
        deleteContainer(carouselNav);
        generateIndicators(3);
        initializeCarousel(true);
        track.style.transform = `translateX(0)`;
    }
}

function checkThree(e) {
    if (e.matches) {
        // 2 image carousel
        deleteContainer(track);
        generateGroups(false, false, true, false);
        deleteContainer(carouselNav);
        generateIndicators(6);
        initializeCarousel(false);
        track.style.transform = `translateX(0)`;
    } else {
        checkFour(mediaFour);
    }
}

function checkTwo(e) {
    if (e.matches) {
        // 1 image carousel
        deleteContainer(track);
        generateGroups(false, false, false, true);
        deleteContainer(carouselNav);
        generateIndicators(12);
        initializeCarousel(false);
        track.style.transform = `translateX(0)`;
    } else {
        checkThree(mediaThree);
    }
}

checkFour(mediaFour);
mediaFour.addEventListener("change", checkFour);
checkThree(mediaThree);
mediaThree.addEventListener("change", checkThree);
checkTwo(mediaTwo);
mediaTwo.addEventListener("change", checkTwo);

const mediaMobile = window.matchMedia("(max-width: 400px)");

function checkMobile(e) {
    if (e.matches) {
        // accordian
        deleteContainer(mountainContainer);
        generateTabs(true);
        initializeTabs(true);
        addTabNavEventListener(true);
    } else {
        // tabs
        deleteContainer(mountainContainer);
        generateTabs(false);
        initializeTabs(false);
        addTabNavEventListener(false);
    }
}

checkMobile(mediaMobile);
mediaMobile.addEventListener("change", checkMobile);