export const Popup = ({ hidePopup, dogJustAdded }) => {
 return (
  <div>
   <h1>Dog Name:{dogJustAdded?.Dog?.name}</h1>
   <h1>Dog Breed:{dogJustAdded?.Dog?.breed}</h1>
   <h1>Dog's Assigned Walker:{dogJustAdded?.Walker?.name}</h1>
   <button
    onClick={() => {
     hidePopup();
    }}
   >
    Close
   </button>
  </div>
 );
};
