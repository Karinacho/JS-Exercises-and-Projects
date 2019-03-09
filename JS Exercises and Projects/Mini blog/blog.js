function attachEvents(){
    const URL ='https://baas.kinvey.com/appdata/kid_SJOg4rG4Q/'
    const USERNAME = 'karina'
    const PASSWORD = '123'
    const BASE_64 = btoa(USERNAME + ':' + PASSWORD)
    const AUTH = {"Authorization": 'Basic ' + BASE_64}
$('#btnLoadPosts').on('click', loadPosts)
$('#btnViewPost').on('click',viewPost)
function loadPosts(){
    $('#post-body').empty()
    $('#posts').empty();
    $('#post-comments').empty()
   $.ajax({
       method: "GET" ,
       url: URL + 'posts',
       headers: AUTH
   }).then(function(res){
      
      for(let obj in res){
         
        let option = $(`<option>`)
        option.attr('body',res[obj].body)
        option.attr('id', res[obj]._id)
        option.text(res[obj].title)
        $("#posts").append(option)
      }
      
   }).catch(function(e){
       console.log(e)
   })
}

function viewPost(){
    $('#post-body').empty()
    let post = $('#posts').val();
    
    if(post !==''){
        let body= $('#posts').find(':selected').attr('body')
        let id=$('#posts').find(':selected').attr('id')
        console.log($('#posts option:selected'))
        $('#post-title').text(post)
        $('#post-body').append($('<li>').text(body))
        $.ajax({
            method: "GET" ,
            url: URL + 'comments',
            headers: AUTH
        }).then(function(res){
            $('#post-comments').empty()
            for(let obj in res){
                if(res[obj].post_id === id){
                    let li = $('<li>')
                    li.text(res[obj].text)
                    $('#post-comments').append(li)
                }
              }
          
           
        }).catch(function(e){
            console.log(e)
        })
    }
}

}