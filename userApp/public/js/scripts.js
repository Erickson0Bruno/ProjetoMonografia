const  API_GATEWAY_ADRESS  = 'http://localhost:8086'
const  API_USER  = 'http://localhost:8001'


function like(slug, id){
  console.log("API GATEWAY: "+API_USER)
  //token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
  //card = document.getElementById("card_"+id);
 // card.style.display = 'none';
  //const idexterno = res.locals.
  

axios.post(API_USER+'/learningstyle/like/'+id, {})
  .then(function(response){
    console.log("response.data: "+response.data); 
    console.log("response.status: "+response.status); 
    card = document.getElementById("card_"+id);
    card.style.display = 'none';
  }).catch(function(err){
    console.log(err)
  });

}

function dislike(slug, id){
  //token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
  
  axios.post(+'learningstyle/dislike/'+'111'+'/')
  .then(function(response){
    card = document.getElementById("card_"+id);
    card.style.display = 'none';

    console.log(response.data); 
    console.log(response.status); 
  });
}

