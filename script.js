const switch_DN = document.getElementById('switch-DN');
switch_DN.addEventListener('click', function() {
    if (switch_DN.classList.contains('night')) {
        document.body.style.background = '#fff'
        switch_DN.classList.remove('night');
    } else {
        document.body.style.background = '#313131'
        switch_DN.classList.add('night')
    }
})