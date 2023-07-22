"use strict";

const imgBtn = Array.from(document.querySelectorAll(".img-btn"));
const img = document.querySelector(".img-main");
const mainImgBtns = Array.from(document.querySelectorAll(".img-main__btn"));

const overlayCon = document.querySelector(".overlay-container");
const overlayImg = document.querySelector(".item-overlay__img");
const overlayImgBtn = Array.from(
    document.querySelectorAll(".overlay-img__btn")
);
const overlayBtnImgs = Array.from(
    document.querySelectorAll(".overlay-img__btn-img")
);
const overlayCloseBtn = document.querySelector(".item-overlay__btn ");
const overlayBtns = Array.from(document.querySelectorAll(".overlay-btn"));

const cartBtn = document.querySelector(".head-rgt__btn");
const cart = document.querySelector(".head-cart");
const cartItem = document.querySelector(".head-cart__item");
const emptyCartTxt = document.querySelector(".head-cart__txt");
const addToCart = document.querySelector(".price-cart__btn");
const clearCart = document.querySelector(".head-cart__item-btn");
const priceSingle = document.querySelector(".head-cart__price-single");
const priceTotal = document.querySelector(".head-cart__price-total");

const priceBtns = Array.from(document.querySelectorAll(".price-btn__img"));
const totalItems = document.querySelector(".price-btn__txt");

const menuOpen = document.querySelector(".head-lft__btn");
const menu = document.querySelector(".head-nav");
const menuBtnImg = document.querySelector(".head-lft__btn-img");

const bodyOverlay = document.querySelector(".body-wrapper");
const body = document.querySelector("body");

const headerCart = document.querySelector(".head-rgt");

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      568: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      1248: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });


/* Eventlisteners related to cart and items adding */
let nextImg = 0,
    noOfItems = 0,
    clicked,
    trasitionTimer;

const minQuery = window.matchMedia("(min-width: 850px)"),
    maxQuery = window.matchMedia("(max-width: 850px)");

/*//////////////////////
 Functions 
 /////////////////////*/
/*Function to stop transition animation from triggering when page resize and reloading  */
function transitionDelay() {
    body.classList.add("preload");
    clearTimeout(trasitionTimer);
    trasitionTimer = setTimeout(() => {
        body.classList.remove("preload");
    }, 1000);
}

/* Function to get next and previous images*/
function imgBtns(btns, img, imgName) {
    btns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            if (e.target.classList.contains(`${imgName}__btnlft-img`)) {
                if (nextImg <= 0) nextImg = 3;
                else nextImg--;

                img.src = `assets/images/image-product-${nextImg + 1}.jpg`;
            }

            if (e.target.classList.contains(`${imgName}__btnrgt-img`)) {
                if (nextImg >= 3) nextImg = 0;
                else nextImg++;

                img.src = `assets/images/image-product-${nextImg + 1}.jpg`;
            }
        });
    });
}

imgBtns(overlayBtns, overlayImg, "item-overlay");
imgBtns(mainImgBtns, img, "img-main");

/* Function to show single and total items price in the cart  */
function productPrice(items) {
    totalItems.textContent = items;
    priceSingle.textContent = `$125 * ${items}`;
    priceTotal.textContent = `$${125 * items}`;
    if (items >= 1) {
        headerCart.setAttribute("data-content", `${items}`);
        headerCart.style.setProperty("--display", `block`);
    } else {
        headerCart.style.setProperty("--display", `none`);
    }
}



/* Function to open navigation menu */

function openMenu() {
    menu.classList.add(".open-menu");
    menuBtnImg.src = "assets/images/icon-close.svg";
    body.style.overflow = "hidden";
    cart.classList.remove("open-cart");
    bodyOverlay.classList.add("open-overlay");
}

/* Function to delete cart item when cart items are zero */

function cartIt() {
    cartItem.classList.add("open-cart");
    emptyCartTxt.classList.remove("open-cart");
}

/* Function to delete cart text 'empty cart' when cart items are > 0 */

function cartTx() {
    cartItem.classList.remove("open-cart");
    emptyCartTxt.classList.add("open-cart");
}

/* Function to delete cart text cart item  */
function emptyCart() {
    cartItem.classList.remove("open-cart");
    emptyCartTxt.classList.remove("open-cart");
}

/*//////////////////////
 Event Listeners 
 /////////////////////*/

/*  Eventlistener to close and open cart   */


/*  Eventlistener to increase and decrease no. of items   */
priceBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        clicked = false;
        if (e.target.classList.contains("price-btn__add-img")) {
            if (noOfItems >= 10) return;
            noOfItems++;
            productPrice(noOfItems);
        } else if (e.target.classList.contains("price-btn__remove-img")) {
            if (noOfItems <= 0) return;
            noOfItems--;
            productPrice(noOfItems);
        }
    });
});

/*  Eventlistener for add to cart button  */
addToCart.addEventListener("click", function (e) {
    clicked = true;
    if (cart.classList.contains("open-cart")) {
        if (noOfItems >= 1) {
            cartIt();
        } else if (noOfItems <= 0) {
            cartTx();
        }
    }
});

/*  Eventlistener for  image to change when image button is clicked  */
imgBtn.forEach((btn, i) => {
    btn.addEventListener("click", function () {
        img.src = `assets/images/image-product-${i + 1}.jpg`;
    });
});





/*  Eventlistener to stop transition animation from triggering when page reloading  */
window.addEventListener("load", function () {
    transitionDelay();
});
