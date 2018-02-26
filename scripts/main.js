
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var BUTTON_PREVIOUS_SELECTOR = '[button-role="previous"]';
var BUTTON_NEXT_SELECTOR = '[button-role="next"]';
var imagePosition = 0;

function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailsArray = [].slice.call(thumbnails);
  return thumbnailsArray;
}
function previousClickHandler(thumbnails) {
'use strict'
/*  if(thumbnails[index]==0)
  index = thumbnails.length;
   else if (thumbnails[index]==thumbnails.length) {
     index= index-1;
   }
   else {
     index=index-1;
   }*/
   if (imagePosition > 0) {
   imagePosition--;
   setDetailsFromThumb(thumbnails[imagePosition]);
 } else if(imagePosition = 0){
   imagePosition = 0;
 }
 else {
   imagePosition = thumbnails.length-1;
   setDetailsFromThumb(thumbnails[imagePosition])
 }
 }



function nextClickHandler(thumbnails){
  'use strict'
    /* if(thumbnails[index]==0)
    index = index+1;
     else if (thumbnails[index]==thumbnails.length) {
       index =0;
     }
     else {
       index++;
     }*/
     imagePosition++;
     if (imagePosition < thumbnails.length) {
    setDetailsFromThumb(thumbnails[imagePosition]);
  }else if (imagePosition = (thumbnails.length-1)) {
    imagePosition = 0;
    setDetailsFromThumb(thumbnails[imagePosition])
  }
  else {
    imagePosition = thumbnails.length - 1;
  }
  }

//Algorithm:
// 1. Get the list of thumbnails getThumbnailsArray();
// 2. Check the position based on the data from the button
// 3. Change the image on Display image

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);

  for (var i = 0; i < thumbnails.length; i++) {
    (function(index) {
      thumbnails[index].addEventListener("click", function() {
        imagePosition = index;
      });
    })(i);
  }

var previous = document.querySelector(BUTTON_PREVIOUS_SELECTOR);
previous.addEventListener('click',function(){
  previousClickHandler(thumbnails);
});
var next = document.querySelector(BUTTON_NEXT_SELECTOR);
next.addEventListener('click',function(){
  nextClickHandler(thumbnails);
});

}

initializeEvents();
