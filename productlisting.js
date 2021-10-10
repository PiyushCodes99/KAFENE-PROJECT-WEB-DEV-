$(document).ready(()=>{
    const tablebody=$("tbody");
    const url="https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products";
    const checkbox=$("#FilterSection input")
    let proddetails=[];
    let checked={
        expired:true,
        lowStock:true
    }
    const logoutbtn=$("#Logoutbtn")
    
    
    logoutbtn.click(()=>{
        localStorage.setItem("LoggedIn",false)
        window.location.assign("../index.html")
    })

    const createTableRow=(id,name,brand,date,price,stock)=>{
        const row=$("<tr>")
        const prodid=$("<td>").text(id).css("color","#8c8c8c")
        const prodname=$("<td>").text(name)
        const prodbrand=$("<td>").text(brand).css("color","#8c8c8c")
        const prodexpiry=$("<td>").text(date)
        const prodamount=$("<td>").text(`$${price}`).css("color","#8c8c8c")
        const prodstock=$("<td>").text(stock).css("color","#8c8c8c")
        row.append(prodid,prodname,prodbrand,prodexpiry,prodamount,prodstock);
        return row;
    }

    $.get(url,(resp)=>{
        proddetails=resp;
        resp.map(product =>{
            const createdRow=createTableRow(product.id,product.medicineName,product.medicineBrand,product.expiryDate,product.unitPrice,product.stock)
            tablebody.append(createdRow);
        })
        
    })


    checkbox.click((e)=>{
        tablebody.text("");
        checked[e.target.name]=e.target.checked;
        let count=0;
             if(checked.expired==false && checked.lowStock==true){
                console.log("case1")
                proddetails.map(product=>{
                    
                    if(new Date(product.expiryDate)>new Date())  {         
                    let createdRow=createTableRow(product.id,product.medicineName,product.medicineBrand,product.expiryDate,product.unitPrice,product.stock)
                    count++;
                    tablebody.append(createdRow);
                    }
                })
             }
             else if(checked.expired==true && checked.lowStock==false){
                proddetails.map(product=>{
                    if(product.stock>=100)  {       
                    let createdRow=createTableRow(product.id,product.medicineName,product.medicineBrand,product.expiryDate,product.unitPrice,product.stock)
                    count++;
                    tablebody.append(createdRow);
                    }
                })
             }
             else if(checked.expired==false && checked.lowStock==false){
                proddetails.map(product=>{      
                    if(product.stock>=100 && new Date(product.expiryDate)>new Date()){    
                    let createdRow=createTableRow(product.id,product.medicineName,product.medicineBrand,product.expiryDate,product.unitPrice,product.stock)
                    count++;
                    tablebody.append(createdRow);
                    }
                })
             }
             else{
                proddetails.map(product=>{          
                    let createdRow=createTableRow(product.id,product.medicineName,product.medicineBrand,product.expiryDate,product.unitPrice,product.stock)
                    count++;
                    tablebody.append(createdRow);
                })
             }
            
        
            $("#ProductCount").text(count)
    })


})