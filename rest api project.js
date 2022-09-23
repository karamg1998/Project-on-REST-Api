var save=document.querySelector('.save');

save.addEventListener('click',Run);

function Run(e){
    e.preventDefault();
    var expense=document.getElementById('expenseamount').value;
    var description=document.getElementById('description').value;
    var category=document.getElementById('category').value;
    
    var myobj={
        Expense:expense,
        Description:description,
        Category:category
        } 

    axios.post('https://crudcrud.com/api/52557cbb7d1043a3a00b6eeb84735902/expenses',myobj)
    .then((response)=> {
         console.log(response.data)
        
         showOutput(response.data);
    })
    .catch(err=> {
        document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong with post request</h4>";
        console.log(err)
    })

}



window.addEventListener('DOMContentLoaded', (event) => {
   
    axios.get("https://crudcrud.com/api/52557cbb7d1043a3a00b6eeb84735902/expenses")
    .then((response) =>{
        console.log(response.data)

        for(var i=0;i<response.data.length;i++)
        {
            showOutput(response.data[i]);
        }
    })
    .catch(err=> {
        document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong when dom content loaded</h4>";
        console.log(err)
    })

}); 

function showOutput(user)
{
           var m=document.querySelector('.data');
    
            var n_element=document.createElement('li');
            n_element.id=user._id;
            
            var d1=document.createTextNode(`Expense:${user.Expense} `);
            n_element.appendChild(d1);
        
            var d2=document.createTextNode(`Description:${user.Description} `);
            n_element.appendChild(d2);
        
            var d3=document.createTextNode(`Category:${user.Category} `);
            n_element.appendChild(d3);
        
            var button=document.createElement('button');
            button.className='delete';
            button.textContent='Delete';
            n_element.appendChild(button);

            var e_button=document.createElement('button');
            e_button.className='edit';
            e_button.textContent='Edit';
            n_element.appendChild(e_button);
            
            m.appendChild(n_element);
}

var del=document.querySelector('.data');
del.addEventListener('click',remove);
del.addEventListener('click',edit);

function remove(e)
{
    
      if(e.target.classList.contains('delete'))
      {
         var li=e.target.parentElement;
         del.removeChild(li);
         
         axios.delete(`https://crudcrud.com/api/52557cbb7d1043a3a00b6eeb84735902/expenses/${li.id}`)
        .then(res=>console.log(res))
        .catch(err=> {
            document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong with delete functionality</h4>";
            console.log(err)
           })
      }
        
}

function edit(e)
{
    
      if(e.target.classList.contains('edit'))
      {
        var li=e.target.parentElement;
        
        axios.get(`https://crudcrud.com/api/52557cbb7d1043a3a00b6eeb84735902/expenses/${li.id}`)
        .then((response) =>{
        console.log(response.data)
         retriveUser(response.data);
       })
       .catch(err=> {
        document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong with edit functionality(get)</h4>";
        console.log(err)
       })

        del.removeChild(li);
         
        axios.delete(`https://crudcrud.com/api/52557cbb7d1043a3a00b6eeb84735902/expenses/${li.id}`)
        .then(res=>console.log(res))
        .catch(err=> {
            document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong with edit functionality(delete)</h4>";
            console.log(err)
           })
       
      }
      
      function retriveUser(data)
      {
        var e=document.getElementById('expenseamount');
        e.value=data.Expense;
        var d=document.getElementById('description');
        d.value=data.Description;
        var c=document.getElementById('category');
        c.value=data.Category;
      }
        
}

