const firebaseConfig = {
    apiKey: "AIzaSyDBQbY94T_SdMJl4bs4iWz6QKc7YnBZd6o",
    authDomain: "spark-23.firebaseapp.com",
    databaseURL: "https://spark-23-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "spark-23",
    storageBucket: "spark-23.appspot.com",
    messagingSenderId: "899844768435",
    appId: "1:899844768435:web:29f0e4881816cf1ac6e6c6",
    measurementId: "G-DZ0MT180V7"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
var database = firebase.database();
var storage = firebase.storage();

var registerdata = database.ref("data");
var count = database.ref("count");

// ///////////////////////////////////////////////////////////////////////////////////////////////


function eventshow()
{
    const option = document.querySelectorAll('.op');
    option.forEach((element) => {
        const inputElement = element.querySelector('.gen');
        const name = inputElement.getAttribute('name');        
        database.ref('count/' + name).once('value').then((snapshot) => {
            const data = snapshot.val();
            let length = Object.keys(data).length;
            if (length >= 90) {
                console.log(name)
                element.style.display = 'none';
            }
        })
    });
}
// //////////////////////////////////////////////////////////////////////////////////////////////

let data = {};

document.getElementById('nextbtn').addEventListener('click', async (event) => {
    event.preventDefault();
    const formControls = document.querySelectorAll('.form1');
    let check = 0;

    // Create an array to hold promises
    const promises = [];

    for (const element of formControls) {
        if (element.value === "") {
            swal({
                icon: 'error',
                title: 'Please Enter all the Details'
            });
            check = 1;
            break;
        } else {
            if (element.name === "regno") {
                const snapshot = await registerdata.child(element.value).get();
                if (snapshot.exists()) {
                    swal("Error", "The register no is already taken.", "error");
                    check = 1;
                } else {
                    data[element.name] = element.value;
                }
            } else {
                data[element.name] = element.value;
            }
        }
    }

    // Wait for all promises to resolve
    await Promise.all(promises);

    if (check === 0) {
        document.getElementById('dataform1').style.display = 'none';

        if (data.dep.includes("cse")) {
            eventshow()
            document.getElementById('dataform3').style.display = 'block';
        } else {
            document.getElementById('dataform2').style.display = 'block';
        }

        formControls.forEach((element) => {
            element.value = "";
        });

    }
});

document.getElementById('eventdetails').addEventListener('click', event => {
    event.preventDefault();

    let otherreg=document.getElementById('otherreg')

     if (!otherreg.checked) {
        swal({
            icon: 'error',
            title: 'Please ( ✓ ) The Check Box That Present In The End Of The Page, To Register Your response.'
        });
      
    }

    if (otherreg.checked) {
        data['paid'] = "No";
        otherreg.checked = false;
        loaddata("other");
    }

    

});

document.getElementById('csestudentevent').addEventListener('click', event => {
    event.preventDefault();
   let getcsestudentevent1=document.querySelectorAll('.getcsestudentevent1')
   let getcsestudentevent2=document.querySelectorAll('.getcsestudentevent2')

   let techname=[];
   let nontechname=[];

   getcsestudentevent1.forEach(element=>{
        if(element.checked)
        {
            techname.push(element.name)
        }
   })

   getcsestudentevent2.forEach(element=>{
    if(element.checked)
    {
        nontechname.push(element.name)
    }
    })

    if(techname.length==2 && nontechname.length==2 )
    {
        for(let i=0;i<2;i++)
        {
            data['Technical'+(i+1)] = techname[i];
            data['NonTechnical'+(i+1)] = nontechname[i];
        }
        getcsestudentevent2.forEach(element=>{
            element.checked = false;
       })
       getcsestudentevent1.forEach(element=>{
        if(element.checked)
        {
            element.checked = false;
        }
   })
        loaddata("cse");
    }
    else
    {
        console.log(techname.length);
        console.log(nontechname.length)
        swal({
            icon: 'error',
            title: 'Exactly You Want To Select 2 - Technical Event & 2 - Non-Technical Event only',
        })
    }

});


function loaddata(type) {
    console.log(data)
    if (type == "cse") {
        let ename = [data.NonTechnical1, data.NonTechnical2, data.Technical1, data.Technical2];
        for (let i = 0; i < 4; i++) {
            count.child(ename[i]).child(data.regno).set({
                regno: data.regno
            });
        }
    }
    registerdata.child(data.regno).set(data, function (error) {
        if (error) {
            console.error("Data could not be saved.", error);
        } else {
            swal({
                icon: 'success',
                title: 'Your Event is Registered Successfully'
            });
            document.getElementById('dataform2').style.display = 'none';
            document.getElementById('dataform3').style.display = 'none';
            document.getElementById('dataform1').style.display = 'block';
        }
    });
    data = {}
}




// console.log(Object.keys(arr).length)
