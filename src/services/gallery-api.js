function fetchGallery(page, search) {
  const KEY_API = '34339864-0ee58b65a9ac9bce25a8041d2';

  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error('Error'));
  });
}
const api = {
  fetchGallery,
};
export default api;
