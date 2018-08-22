document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
        if (target.hasAttribute('data-target')) {
            var m_ID = target.getAttribute('data-target');
            document.getElementById('modify').innerHTML = document.getElementById('mod_1').innerHTML;
            document.getElementById(m_ID).classList.add('open');
            e.preventDefault();
        }
    }

    
    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal1') {
        if (target.hasAttribute('data-target')) {
            var m_ID = target.getAttribute('data-target');
            document.getElementById('put').innerHTML = document.querySelector('.editProfile').innerHTML;
            document.getElementById(m_ID).classList.add('open');
            e.preventDefault();
        }
    }

    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal2') {
        if (target.hasAttribute('data-target')) {
            var m_ID = target.getAttribute('data-target');
            document.getElementById('put').innerHTML = document.querySelector('.postQuestions').innerHTML;
            document.getElementById(m_ID).classList.add('open');
            e.preventDefault();
        }
    }

    // Close modal window with 'data-dismiss' attribute or when the backdrop is clicked
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
        e.preventDefault();
    }
}, false);
