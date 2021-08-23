let perPage = 6;
let idPage = 1;
let start = 0;
let end = perPage;

const product = [
    { id: 1,
        image: "https://i.ibb.co/2SpSTp7/img2021-07-23-1.jpg",
        title: "Ready, Set, Go!",
        href: "/blog/2021/07/23/ready-set-go.html",
        date: "July 23, 2021",
        text: "Intro to the blog and setting the stage for the canoe project."
    },
    { id: 2,
        image: "https://i.ibb.co/B22XJKX/img2021-07-27-1.jpg",
        title: "How to loft canoe plans from a table of offsets",
        href: "/blog/2021/07/27/how-to-loft-canoe-plans-from-a-table-of-offsets.html",
        date: "July 27, 2021",
        text: "The first thing you need to do if you're starting a canoe project - drawing up the plans."
    },
    { id: 3,
        image: "https://i.ibb.co/vDNrgqF/img2021-07-30-3.jpg",
        title: "Building a cedar strip canoe: milling the wood and setup",
        href: "/blog/2021/07/30/building-a-cedar-strip-canoe-milling-the-wood-and-setup.html",
        date: "July 30, 2021",
        text: "Creating 1/4 inch cedar strips and setting up the station forms."
    },
    { id: 4,
        image: "https://i.ibb.co/M2zHmWZ/img2021-08-06.jpg",
        title: "Building a cedar strip canoe: stripping the hull and installing the outer stems",
        href: "/blog/2021/08/06/building-a-cedar-strip-canoe-stripping-the-hull-and-installing-the-outer-stems.html",
        date: "August 6, 2021",
        text: "Watching the shape of the hull emerge from the raw strips is incredibly satisfying."
    },
    { id: 5,
        image: "https://i.ibb.co/0m71bV0/img2021-08-10.jpg",
        title: "Sapiens: A Brief History of Humankind",
        href: "/blog/2021/08/10/book-review-sapiens-a-brief-history-of-humankind.html",
        date: "August 10, 2021",
        text: "A fun read, but with a few too many gross generalizations."
    },
    { id: 6,
        image: "https://i.ibb.co/KLbMxHS/img2021-08-12-3.jpg",
        title: "Building a cedar strip canoe: fiberglassing",
        href: "/blog/2021/08/12/building-a-cedar-strip-canoe-fiberglassing.html",
        date: "August 12, 2021",
        text: "The critical step for transitioning out of the hull-building phase."
    },
    { id: 7,
        image: "https://i.ibb.co/nr6CNzh/img2021-08-15.jpg",
        title: "How to weave cane seats for a canoe",
        href: "/blog/2021/08/15/how-to-weave-cane-seats-for-a-canoe.html",
        date: "August 15, 2021",
        text: "We've come this far, what the heck might as well do the seats from scratch too."
    },
    { id: 8,
        image: "https://i.ibb.co/r2n9hFC/img2021-08-22.jpg",
        title: "Dune",
        href: "/blog/2021/08/22/book-review-dune.html",
        date: "August 22, 2021",
        text: "Fascinating ecology and world-building, but flat and dull main characters."
    },
]

let productArr = [];
let showAdd = false;

productArr = product;

const pageConfig = document.querySelector('.page-config select');
const mySelect = document.getElementById('mySelect');
const countTotalPage = document.querySelector('.total-page');
const countTotalProduct = document.querySelector('.total-item');

let totalPages = Math.ceil(productArr.length / perPage);
const searchText = document.querySelector('.content__search input');
const searchBtn = document.getElementById('search');


function initRender(productAr, totalPage) {
    renderProduct(productAr);
    renderListPage(totalPage);
}

initRender(productArr, totalPages);

function getCurrentPage(indexPage) {
    start = (indexPage - 1) * perPage;
    end = indexPage * perPage;
    totalPages = Math.ceil(productArr.length / perPage);
    countTotalPage.innerHTML = `Total pages: ${totalPages}`;
    countTotalProduct.innerHTML = `Total Product:  ${productArr.length}`
}

getCurrentPage(1);


pageConfig.addEventListener('change', () => {
    idPage = 1;
    perPage = Number(pageConfig.value);
    getCurrentPage(idPage);
    initRender(productArr, totalPages);
    if (totalPages == 1) {
        $('.btn-prev').addClass('btn-active');
        $('.btn-next').addClass('btn-active');
    } else {
        $('.btn-next').removeClass('btn-active');
    }
    changePage();
});


function renderPost(product) {
    html = '';
    const content = product.map((item, index) => {
        if (index >= start && index < end) {
            html += '<div class="card mb-4">';
            html += '<a href=' + item.href + '>';
            html += '<img class="card-img-top" src=' + item.image + ' alt="..." />';
            html += '</a>';
            html += '<div class="card-body">';
            html += '<div class="small-text-muted">' + item.date + '</div>';
            html += '<h2 class="card-title h4>' + item.title + '</h2>';
            html += '<p class="card-text">' + item.text + '</p>';
            html += '<a class="btn btn-primary" href=' + item.href + '>Read more →</a>';
            html += '</div>';
            html += '</div>';
            return html;
        }
    });
    document.getElementById('product').innerHTML = html;
    highlightText();
}

function renderListPage(totalPages) {
    let html = '';
    html += `<li class="current-page active"><a>${1}</a></li>`;
    for (let i = 2; i <= totalPages; i++) {
        html += `<li><a>${i}</a></li>`;
    }
    if (totalPages === 0) {
        html = ''
    }
    document.getElementById('number-page').innerHTML = html;
}

function changePage() {
    const idPages = document.querySelectorAll('.number-page li');
    const a = document.querySelectorAll('.number-page li a');
    for (let i = 0; i < idPages.length; i++) {
        idPages[i].onclick = function () {
            let value = i + 1;
            const current = document.getElementsByClassName('active');
            current[0].className = current[0].className.replace('active', '');
            this.classList.add('active');
            if (value > 1 && value < idPages.length) {
                $('.btn-prev').removeClass('btn-active');
                $('.btn-next').removeClass('btn-active');
            }
            if (value == 1) {
                $('.btn-prev').addClass('btn-active');
                $('.btn-next').removeClass('btn-active');
            }
            if (value == idPages.length) {
                $('.btn-next').addClass('btn-active');
                $('.btn-prev').removeClass('btn-active');
            }
            idPage = value;
            getCurrentPage(idPage);
            renderProduct(productArr);
        };
    }
}

changePage();

$('.btn-next').on('click', () => {
    idPage++;
    if (idPage > totalPages) {
        idPage = totalPages;
    }
    if (idPage == totalPages) {
        $('.btn-next').addClass('btn-active');
    } else {
        $('.btn-next').removeClass('btn-active');
    }
    console.log(idPage);
    const btnPrev = document.querySelector('.btn-prev');
    btnPrev.classList.remove('btn-active');
    $('.number-page li').removeClass('active');
    $(`.number-page li:eq(${idPage - 1})`).addClass('active');
    getCurrentPage(idPage);
    renderProduct(productArr);
});

$('.btn-prev').on('click', () => {
    idPage--;
    if (idPage <= 0) {
        idPage = 1;
    }
    if (idPage == 1) {
        $('.btn-prev').addClass('btn-active');
    } else {
        $('.btn-prev').removeClass('btn-active');
    }
    const btnNext = document.querySelector('.btn-next');
    btnNext.classList.remove('btn-active');
    $('.number-page li').removeClass('active');
    $(`.number-page li:eq(${idPage - 1})`).addClass('active');
    getCurrentPage(idPage);
    renderProduct(productArr);
});
