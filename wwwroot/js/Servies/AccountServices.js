var AccountServies = {
    verifyUser: (UserName, Password,callback) => {
        $.get("http://localhost:55617/AccountApi/verifyUser?userName=" + UserName + "&password=" + Password, function (data, status) {
            callback(status)
           
        });
    }
}