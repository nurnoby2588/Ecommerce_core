var AccountController = {
    verifyUser: (actionBtn,url) => {
        let userName = $('#txtUserName').val();
        let Password = $('#txtPassword').val();
      

        AccountServies.verifyUser(userName, Password, function (reponce) {
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