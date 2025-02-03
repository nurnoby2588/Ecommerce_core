var AccountController = {
    verifyUser: (actionBtn, url) => {
    
        let userName = $('#txtUserName').val();
        let password = $('#txtPassword').val();
        let userData = {
            UserName: userName,
            Password: password
        }

        AccountServies.verifyUser(userData, function (reponce) {
            if (reponce == "success") {
                localStorage.setItem("UserName", userName);
         
                window.location.href = url
               
            }
            else {
                window.location.href ='http://localhost:55617/Account/Login'
            }
         
        }) 

    }

}