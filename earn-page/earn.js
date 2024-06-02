document.addEventListener('DOMContentLoaded', function() {

    var menuBtn1 = document.getElementById('menu1');
    var menuBtn2 = document.getElementById('menu2');
    var menuBtn3 = document.getElementById('menu3');

    menuBtn2.style.boxShadow = "none";
    menuBtn3.style.boxShadow = "none";
    var coreTasks =  document.getElementById('coreTasks');

    menuBtn1.onclick = function() {
        coreTasks.style.display='flex';
        menuBtn1.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
        menuBtn2.style.boxShadow = "none";
        menuBtn3.style.boxShadow = "none";
    }

    menuBtn2.onclick = function() {
        coreTasks.style.display='none';
        menuBtn2.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
        menuBtn1.style.boxShadow = "none";
        menuBtn3.style.boxShadow = "none";
    }

    menuBtn3.onclick = function() {
        coreTasks.style.display='none';
        menuBtn3.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
        menuBtn1.style.boxShadow = "none";
        menuBtn2.style.boxShadow = "none";
    }
});