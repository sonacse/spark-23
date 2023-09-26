let data={};

document.getElementById('nextbtn').addEventListener('click',event=>{
    event.preventDefault();
    const formControls = document.querySelectorAll('.form1');
    let check=0;
    formControls.forEach(element => {
        if(element.value=="")
        {
            swal({
                icon:'error',
                title:'Please Enter all the Details'
            })
            check=1;
        }
        else{
            data[element.name] = element.value;
        }
    });
    if(check==0)
    {
        
        document.getElementById('dataform1').style.display='none';
        
        if(data.dep.includes("cse"))
        {
            document.getElementById('dataform3').style.display='block';
        }
        else{
            document.getElementById('dataform2').style.display='block';
        }
       
        formControls.forEach(element => {
            element.value=""
        })
    }
})



document.getElementById('eventdetails').addEventListener('click', event => {
    let check2=0;
    let total=0;
    event.preventDefault();
    const tevent = document.getElementById("tevent");
    const ntevent = document.getElementById("ntevent");
    const cevent = document.getElementById("cevent");

    // Check if at least one checkbox is checked
    if (!tevent.checked && !ntevent.checked && !cevent.checked) {
        swal({
            icon: 'error',
            title: 'Please select at least one event'
        });
        check2=1;
       
    }

    // If any checkbox is checked, proceed to store the data
    if (tevent.checked) {
        data[tevent.name] = 'yes';
        total += 150;
    } else {
        data[tevent.name] = 'no';
    }
    if (ntevent.checked) {
        data[ntevent.name] = 'yes';
        total += 150;
    } else {
        data[ntevent.name] = 'no';
    }
    if (cevent.checked) {
        data[cevent.name] = 'yes';
        total += 150;
    } else {
        data[cevent.name] = 'no';
    }
    data['total'] = total;
    if(check2==0)
    {console.log(data)
        swal({
            icon:'success',
            title:'Your Event is Registered Successfully',
            text:'You want to pay the Total amount RS: '+total+' /-, During on the days of the event.'
        })
        tevent.checked = false;
        ntevent.checked = false;
        cevent.checked = false;
        document.getElementById('dataform2').style.display='none';
        document.getElementById('dataform1').style.display='block';

    }


});


document.getElementById('csestudentevent').addEventListener('click',event=>{
    let check3=0;
    event.preventDefault();
    const getdata=document.querySelectorAll('.form2')
    getdata.forEach(element => {
        if(element.value=="")
        {
            swal({
                icon:'error',
                title:'You Must Select Two Technical and Two Non-Technical Event'
            })
            check3=1;
        }
        else{
            data[element.name] = element.value;
        }
    });
    const cseclubevent=document.getElementById('cseclubevent')
    if(cseclubevent.checked)
    {
        data[cseclubevent.name] = 'yes';
    }
    else{
        data[cseclubevent.name] = 'no';
    }
    console.log(data)
    if(check3==0)
    {
        swal({
            icon:'success',
            title:'Your Event is Registered Successfully'
        })
        getdata.forEach(element => {
            element.value=""
        })
        document.getElementById('dataform3').style.display='none';
        document.getElementById('dataform1').style.display='block';

    }

})



