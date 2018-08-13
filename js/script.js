function toggleClass() {
    document.querySelector('nav').classList.toggle('active');
    //document.querySelector('nav').classList.toggle('inactive');
}

document.querySelector('.menu-toggle').addEventListener('click', toggleClass);