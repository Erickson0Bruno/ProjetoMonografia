

function like(slug, id){
  //token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
  card = document.getElementById("card_"+id);
  card.style.display = 'none';
  const idexterno = res.locals.

axios.post('http://localhost:8000/learningstyle/like/'+id_usuario+'/'+id_question)
  .then(function(response){
    console.log(response.data); 
    console.log(response.status); 
  });

}

function dislike(slug, id){
  //token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
  
  axios.post('http://localhost:8000/learningstyle/dislike/'+'111'+'/')
  .then(function(response){
    card = document.getElementById("card_"+id);
    card.style.display = 'none';

    console.log(response.data); 
    console.log(response.status); 
  });
}

