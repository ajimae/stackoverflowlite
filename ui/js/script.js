function toggleClass() {
    document.querySelector('nav').classList.toggle('active');
    //document.querySelector('nav').classList.toggle('inactive');
}

document.querySelector('.menu-toggle').addEventListener('click', toggleClass);

var show = document.querySelector('div#edit');
document.querySelector('span#toggle').addEventListener('click', function() {
    if(show.style.visibility == "") {
        document.querySelector('#edit').style.visibility = "visible";
    }else if(document.querySelector('#edit').style.visibility == "visible") {
        document.querySelector('#edit').style.visibility = "";
    }
});

document.querySelector('#close').addEventListener('click', function() {
    document.querySelector('#edit').style.visibility = "";
});