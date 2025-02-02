$(document).ready(()=>{

    console.log(localStorage.getItem("LoggedIn")=="true")
    const loginform=document.getElementById("Loginform")
    localStorage.getItem("LoggedIn")=="true"?window.location.assign("./orderlisting.html"):loginform.style.display="block";
    loginform.addEventListener("submit",(e)=>{
        e.preventDefault();
        if(e.target.Username.value=="ashu" && e.target.Password.value =="ashu"){
            window.alert("Login Successful")
            localStorage.setItem("LoggedIn",true)
            window.location.assign("./orderlisting.html")
        }
        else{
            window.alert("Please enter valid credentials")
        }
    })
    })