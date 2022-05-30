
const axios = require('axios');

export default class NewFetchPictures {  
constructor() {
  this.picturesName = '';
  this.page = 1;
}
 
async fetchPictures() {
  
    const response = await axios.get(`https://pixabay.com/api/?key=27675363-36ea1c192b15f6a71011fab08&q=${this.picturesName}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
    this.page +=1;
    
    
    return response.data;         
 }

 get searchQuery() {
     return this.picturesName;
 }

 set searchQuery(newsearchQuery) {
   this.picturesName = newsearchQuery;
 }

 resetPage() {
   this.page = 1;
 }

 
   
  
 
}