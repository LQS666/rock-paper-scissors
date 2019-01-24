const startbtn = document.querySelector('.startbtn');
const startpage = document.querySelector('.startpage');
const game = document.querySelector('.game');

const startPage = () => {
    startpage.classList.add('startpagehide');
    game.classList.add('gameshow');
};

startbtn.addEventListener('click', startPage);