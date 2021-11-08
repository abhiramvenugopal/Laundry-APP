function getToken(){
    if(window.localStorage){
        return window.localStorage.getItem("Token")
    }
    return ""
}
function getUser(){
    if(window.localStorage){
        var retrievedObject = window.localStorage.getItem("User");
        return JSON.parse(retrievedObject)
    }
    return ""
}
function isAuthenticated(){
    if(window.localStorage){
        const token=window.localStorage.getItem("Token");
        return Boolean(token);
    }
    return false;
}

export {isAuthenticated,getToken,getUser}