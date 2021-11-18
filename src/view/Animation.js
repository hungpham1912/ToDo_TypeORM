


function updateTodo(ids) {
    document.getElementById('update').style.display = 'block';
    document.getElementById('ids').value = ids;
   const a = document.getElementById('data'+ids).innerText 
    document.getElementById('data_update').value= a;

    

}

signup = function(){
    document.getElementById('signin').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
}

signin = function(){
    document.getElementById('signin').style.display = 'block';
    document.getElementById('signup').style.display = 'none';
}

change_user = function(){
    document.getElementById('signin').style.display = 'block';
}

exit = function(){
    document.getElementById('signin').style.display = 'none';
    document.getElementById('signup').style.display = 'none';

}

closeUpdate = function () {
    document.getElementById('update').style.display = 'none';

}
