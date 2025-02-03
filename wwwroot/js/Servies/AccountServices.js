var AccountServies = {
    verifyUser: (userData,callback) => {
        //$.get("http://localhost:55617/AccountApi/verifyUser?userName=" + UserName + "&password=" + Password, function (data, status) {
        //    callback(status)
        // });
       
        $.post("http://localhost:55617/AccountApi/verifyUser", { "modelAccount": userData }, function (data, status) {
                callback(data)
            });
        
    }
}