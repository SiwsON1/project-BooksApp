/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';


  const select = {
    templateOf: {
      books: '#template-book',

    },
    containerOf: {
      books: '.books-list',
      booksImage: '.books-list .book__image',
      filters: '.filters',

    },
  };
  const templates = {
    menuBooks: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
    // CODE ADDED START

  };
  
  
 

  class BooksList{
    constructor(id, data){
      const thisBookList = this;
      thisBookList.id = id;
      thisBookList.data = data;

      thisBookList.render();
      thisBookList.getElements();
      thisBookList.initActions();
      thisBookList.filterBooks();

    }

    render (){
      const thisBookList = this;
      
      this.data = dataSource.books;
      for (let books of this.data) {
  
        const ratingBgc = thisBookList.determineRatingBgc(books.rating);
        const ratingWidth = books.rating * 10;
        books.ratingWidth = ratingWidth;
        books.ratingBgc = ratingBgc;
  
        const generatedHTML = templates.menuBooks(books);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(select.containerOf.books);
        booksContainer.appendChild(generatedDOM);
  
  
      }
  
    }
    getElements(){
      const thisBookList = this;
    
      thisBookList.coversContainer = document.querySelector(select.containerOf.books);
      thisBookList.filtersContainer = document.querySelector(select.containerOf.filters);
      
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
      
      
    }

    initActions(){
      const thisBookList = this;


      thisBookList.coversContainer.addEventListener('dblclick', function(event){
        event.preventDefault();
        console.log(event.target.offsetParent);
  
        if(event.target.offsetParent.classList.contains('book__image')){
  
          if(event.target.offsetParent.classList.contains('favorite')){
            event.target.offsetParent.classList.remove('favorite');
            const index = thisBookList.favoriteBooks.indexOf(event.target.offsetParent.getAttribute('data-id'));
            thisBookList.favoriteBooks.splice(index, 1);
  
          }else{
            event.target.offsetParent.classList.add('favorite');
            const fav = event.target.offsetParent.getAttribute('data-id');
            thisBookList.favoriteBooks.push(fav);
  
          }
        }
      });
  
      thisBookList.filtersContainer.addEventListener('click', function(event){
  
        if(event.target.tagName == 'INPUT'){
  
          if(event.target.checked){
  
            thisBookList.filters.push(event.target.value); 
            console.log(thisBookList.filters);
          }else{
  
            thisBookList.filters.splice(thisBookList.filters.indexOf(event.target.value, 1));
            console.log(thisBookList.filters);
          }
        }
        thisBookList.filterBooks();
      });
    }

    filterBooks(){
      
      const thisBookList = this;

      for (let books of dataSource.books) {
  
        let shouldBeHidden = false;
        console.log(books);
  
        for(let filter of thisBookList.filters){
          if(!books.details[filter]){
            shouldBeHidden = true ;
            break;
          }
        }
        console.log(shouldBeHidden);
        const hidingBooks = document.querySelector('.book__image[data-id="' + books.id + '"]');
        if(shouldBeHidden == true){
          console.log(hidingBooks);
          hidingBooks.classList.add('hidden');
        }else{
  
          hidingBooks.classList.remove('hidden');
        }
  
      }
  
  
    }

    determineRatingBgc(rating){

      let background = '';
      if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      } else if(rating > 8 && rating <= 9){
  
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 6 && rating<= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else{
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }
      return background;
  
    }

  }

  const app = new BooksList();

  console.log(app);

 

  
  
  

  

}