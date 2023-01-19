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

  const favoriteBooks = [];
  const filters = [];

  function render (){



    for (let books of dataSource.books) {

      const ratingBgc = determineRatingBgc(books.rating);
      const ratingWidth = books.rating * 10;
      books.ratingWidth = ratingWidth;
      books.ratingBgc = ratingBgc;
      const generatedHTML = templates.menuBooks(books);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.containerOf.books);
      booksContainer.appendChild(generatedDOM);


    }



  }

  function initActions(){


    const coversContainer = document.querySelector(select.containerOf.books);
    console.log(coversContainer);
    const filtersContainer = document.querySelector(select.containerOf.filters);



    coversContainer.addEventListener('dblclick', function(event){
      event.preventDefault();
      console.log(event.target.offsetParent);

      if(event.target.offsetParent.classList.contains('book__image')){

        if(event.target.offsetParent.classList.contains('favorite')){
          event.target.offsetParent.classList.remove('favorite');
          const index = favoriteBooks.indexOf(event.target.offsetParent.getAttribute('data-id'));
          favoriteBooks.splice(index, 1);

        }else{
          event.target.offsetParent.classList.add('favorite');
          const fav = event.target.offsetParent.getAttribute('data-id');
          favoriteBooks.push(fav);

        }


      }


    });

    filtersContainer.addEventListener('click', function(event){

      if(event.target.tagName == 'INPUT'){

        if(event.target.checked){

          filters.push(event.target.value); 
          console.log(filters);
        }else{

          filters.splice(filters.indexOf(event.target.value, 1));
          console.log(filters);
        }


      }

      filterBooks();
    });

  }
  function filterBooks(){

    for (let books of dataSource.books) {

      let shouldBeHidden = false;
      console.log(books);

      for(let filter of filters){
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
  function determineRatingBgc(rating){

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

  render();
  initActions();

}