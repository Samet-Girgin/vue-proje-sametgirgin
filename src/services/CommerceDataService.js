import http from "../httpcommon";

class CommerceDataService {
    getAllItems(){
        return http.get("/")
    }
    fetchGet() {
        return fetch("https://fakestoreapi.com/products")
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
            throw error;
          });
      }
      


    getItemDetail(id)
    {
        return http.get(`/home/${id}`);
    }
    
    updateItem(id,data)
    {
    
          //data {"id":11,"title":"testtest","description":"testtestdesc","published":false}
        return http.put(`/home/${id}`,data);
    }
    
    deleteItem(id)
    {
         //https://jsonplaceholder.typicode.com/todos/1
        return http.delete(`/home/${id}`);
    }
    
    
    createItem(data) 
    {
        //ilgili servise göndermiş olduğumuz json objesi 
        //backend servisinde nesneye dönüştürülüp database yazılıyor
        //database ilgili todo yazıldıktan sonra bize yine json olarak döndürülüyor
        return http.post("/home",data);
    }
   
    
    findByTitle(title){
        return http.get(`/home?title=${title}`);
    }
}     
    export default new CommerceDataService();