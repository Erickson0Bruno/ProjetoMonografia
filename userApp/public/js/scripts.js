const  API_GATEWAY_ADRESS  = 'http://localhost:8086'
const  API_USER  = 'http://localhost:8001'


function like(slug, id_question){
  console.log("API GATEWAY: "+API_USER+'/learningstyle/like/'+id_question)
  //token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
  //card = document.getElementById("card_"+id);
 // card.style.display = 'none';
  //const idexterno = res.locals.
  console.log("GET: "+API_USER+'/learningstyle/like/'+id_question)

axios.post(API_USER+'/learningstyle/like/'+id_question, {})
  .then(function(response){
    console.log("response.data: "+JSON.stringify(response.data)); 
    console.log("response.status: "+response.status); 
    card = document.getElementById("card_"+id_question);
    card.style.display = 'none';
  }).catch(function(err){
    console.log(err)
  });

}

function dislike(slug, id_question){
  
axios.post(API_USER+'/learningstyle/dislike/'+id_question, {})
  .then(function(response){
    console.log("response.data: "+JSON.stringify(response.data)); 
    console.log("response.status: "+response.status); 
    card = document.getElementById("card_"+id_question);
    card.style.display = 'none';
  }).catch(function(err){
    console.log(err)
  });

}

