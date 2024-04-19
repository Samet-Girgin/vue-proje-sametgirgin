import axios from "axios";


export default axios.create( {
baseURL : "https://fakestoreapi.com/products",
headers : {
    "Content-Type" : "application/json"
}

});