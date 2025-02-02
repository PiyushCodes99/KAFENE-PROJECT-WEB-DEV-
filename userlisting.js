$(document).ready(()=>{
    const tablebody=$("tbody");
    const url="https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users";
    let userdetails=[];
    const userfilter=$("#UserSearch")
    const resetBtn=$("#Resetbtn")
    const closebtn=$(".fa-times")
    const logoutbtn=$("#Logoutbtn")
    
    
    logoutbtn.click(()=>{
        localStorage.setItem("LoggedIn",false)
        window.location.assign("./login-page.html")
    })

    const createTableRow=(id,avatar,name,dob,gender,location)=>{
        const row=$("<tr>")
        const userid=$("<td>").text(id).css("color","#8c8c8c")
        const useravatar=$("<td>")
        const avatimage=$("<img>").attr("src",avatar)
        useravatar.append(avatimage)
        const username=$("<td>").text(name).css("color","#8c8c8c")
        const Dob=$("<td>").text(dob)
        const gend=$("<td>").text(gender).css("color","#8c8c8c")
        const locat=$("<td>").text(location).css("color","#8c8c8c")
        row.append(userid,useravatar,username,Dob,gend,locat);
        return row;
    }

    $.get(url,(resp)=>{
        userdetails=resp;
        resp.map(user =>{
            const createdRow=createTableRow(user.id,user.profilePic,user.fullName,user.dob,user.gender,`${user.currentCity}, ${user.currentCountry}`)
            tablebody.append(createdRow);
        })
        
    })

    userfilter.keyup((e)=>{
        if(e.which==13){
            if(e.target.value.length>=2){
                tablebody.text("");
                userdetails.map(user=>{
                    if(user.fullName.toLowerCase().indexOf(e.target.value.toLowerCase())>-1){
                        const createdRow=createTableRow(user.id,user.profilePic,user.fullName,user.dob,user.gender,`${user.currentCity}, ${user.currentCountry}`)
                        tablebody.append(createdRow);
                    }
                })
            }
            else{
                window.alert("Please enter atleast 2 characters")
            }
        }
    })

    resetBtn.click(()=>{
        tablebody.text("")
        document.getElementById("UserSearch").value='';
        userdetails.map(user=>{
                const createdRow=createTableRow(user.id,user.profilePic,user.fullName,user.dob,user.gender,`${user.currentCity}, ${user.currentCountry}`)
                tablebody.append(createdRow);
            
        })
    })

    closebtn.click(()=>{
        document.getElementById("UserSearch").value='';
    })

})