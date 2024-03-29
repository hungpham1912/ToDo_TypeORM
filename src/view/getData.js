let tokens = "";
let cout = 0;
let idt;
let check_first_signin = 0;
//GET START
async function getStart(token) {
    console.log(token)
    const response = await fetch('http://localhost:3006/todos', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
    let result = await response.json();
    const a = result.length;
    cout = a;
    const htmlObj = document.getElementById('root');
    htmlObj.innerHTML = htmlObj.innerHTML + '<div id="list"></div>'
    const listHtml = document.getElementById('list')

    for (let i = 1; i <= a; i++) {
        idt = result[i - 1].id;
        listHtml.innerHTML = listHtml.innerHTML + ` <div id="` + result[i - 1].id + `" style="width: 100%;height: 100px;">
    <table style="width: 100%;">
        <tr>
            <td>
                <b style="font-size: 30px; margin-right: 20px;color:red;">∎
                
                </b>
                <span id='data`+ result[i - 1].id + `' style="font-size: 30px;font-family: 'Courier New', Courier, monospace;">` + result[i - 1].note + `</span>
                <div>
                    <div style="width: 5%;height: 50px;float: right;" onclick="deleteTodo(`+ result[i - 1].id + `)">
                        <img src="/asset/bin.png" style="width: 50%;height: 50%;">
                    </div>
                    <div style="width: 5%;height: 50px;float: right;" onclick="updateTodo(`+ result[i - 1].id + `)">
                        <img src="/asset/setting.png" style="width: 50%;height: 50%;">
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div style="width:90% ;height: 1px;background-color: black ; transform: translateY(-20px);">
                </div>

            </td>
        </tr>
    </table>

</div>`;
    }

}



//CREATE
async function createTodo() {
    if (tokens == "") {
        alert("Please Sign in");
    } else {
        const response = await fetch('http://localhost:3006/todos', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokens,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
        let result = await response.json();
        const data = {
            id: 0,
            note: document.getElementById('note').value
        }

        let demID = result.length;
        if (result.length == 0) {
            data.id = 1;
        }
        else {
            data.id = result[demID - 1].id + 1;
        }
        let c = cout + 1;
        const htmlObj = document.getElementById('list');
        htmlObj.innerHTML = htmlObj.innerHTML + ` <div id="` + data.id + `" style="width: 100%;height: 100px;">
        <table style="width: 100%;">
            <tr>
                <td>
                <b style="font-size: 30px; margin-right: 20px;color:red;">∎
                
                </b> <span id='data`+ data.id + `' style="font-size: 30px;font-family: 'Courier New', Courier, monospace;">` + document.getElementById('note').value + `</span><div>
                        <div style="width: 5%;height: 50px;float: right;" onclick="deleteTodo(`+ data.id + `)"><img src="/asset/bin.png" style="width: 50%;height: 50%;">
                        </div>
                        <div style="width: 5%;height: 50px;float: right;" onclick="updateTodo(`+ data.id + `)">
                            <img src="/asset/setting.png" style="width: 50%;height: 50%;">
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div style="width:90% ;height: 1px;background-color: black ; transform: translateY(-20px);">
                    </div>

                </td>
            </tr>
        </table>
    </div>`;
        document.getElementById('note').value = "";
        const responsep = await fetch('http://localhost:3006/todo', {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        cout = cout + 1;
        let i_color = 1;
        let update_color = setInterval(function () {
            document.getElementById(data.id).style.backgroundColor = 'rgb(255, ' + i_color + ',' + i_color + ')';
            i_color += 2;
            if (i_color == 255) {
                clearInterval(update_color)
            }
        }, 1)

    }
}


//DELETE
async function deleteTodo(id) {
   
    const response = fetch('http://localhost:3006/todo/' + id, {
        method: 'DELETE',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
        },
    })
    let root = document.getElementById('list');
    let list = document.getElementById(id);
    root.removeChild(list);
    let i_op_delete = 1;
    document.getElementById('delete').style.display = "block";
    let delete_op = setInterval(function () {
        document.getElementById('delete').style.opacity = i_op_delete;
        i_op_delete -= 0.1;
        if (i_op_delete < 0) {
            clearInterval(delete_op);
        }
    }, 100)
}

//UPDATE
async function updateConfirm() {
    let ids = document.getElementById('ids').value;
    let notes = document.getElementById('data_update').value;
    document.getElementById('update').style.display = 'none';

    let data = {
        id: ids,
        note: notes
    }
    document.getElementById('data' + ids).innerHTML = notes;
    document.getElementById('data_update').value = "";
    let i_color = 1;
    let update_color = setInterval(function () {
        document.getElementById(ids).style.backgroundColor = 'rgb(' + i_color + ', 255,' + i_color + ')';
        i_color += 2;
        if (i_color == 255) {
            clearInterval(update_color)
        }
    }, 1)
    const responsep = await fetch('http://localhost:3006/todo', {
        method: 'PUT',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })

}

//Sign in
async function SignIn() {

    const data = {
        username: document.getElementById('user').value,
        password: document.getElementById('password').value
    }


    const response = await fetch('http://localhost:3006/signin', {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    let check = 0;
    let result = await response.json();
    if (result.length == 0) {
        document.getElementById('check').style.opacity = '1';
    }
    else {
        document.getElementById('signin').style.display = 'none';
        document.getElementById('personal').innerHTML = data.username;
        if (check_first_signin == 0) {
            tokens = result[0].accessToken;
            getStart(result[0].accessToken);
            check_first_signin = 1;
        }
    }
}

//Sign up
async function SignUp() {
    let user = document.getElementById('user_signup').value;
    let pw = document.getElementById('password_signup').value
    let cpw = document.getElementById('confirm_password').value;
    if (pw != cpw) {
        document.getElementById('check_signup').style.opacity = '1';
        document.getElementById('check_signup2').style.opacity = '0';

    }
    else {
        let data = {
            username: user,
            password: pw,
            level: 0
        }
        const responsep = await fetch('http://localhost:3006/signup', {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        let result = await responsep.json();
        let dem = result.length;
        if (dem == 0) {
            document.getElementById('signin').style.display = 'block';
            document.getElementById('signup').style.display = 'none';
            document.getElementById('user').value = document.getElementById('user_signup').value
            document.getElementById('password').value = document.getElementById('password_signup').value;
        }
        else {

            document.getElementById('check_signup2').style.opacity = '1';
        }
    }
}





