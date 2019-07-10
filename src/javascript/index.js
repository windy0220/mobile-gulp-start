setTimeout(showTitle, 300);
setTimeout(showTitleImg, 500);
setTimeout(showLink, 700);

function showTitle(){
    document.querySelector('.title').classList.remove('h');
}
function showTitleImg(){
    document.querySelector('.title-img-box ').classList.remove('h');
}
function showLink(){
    document.querySelector('.link ').classList.remove('h');
}