import config from '../config';
import TokenService from './token-service';

const ItemApiService = {
  getItems() {
    return fetch(`${config.API_ENDPOINT}/items`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getItem(itemId) {
    return fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postItem(content, index) {
    return fetch(`${config.API_ENDPOINT}/items`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        content,
        index,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  updateItem(content, completed, itemId) {
    return fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        content,
        completed,
      }),
    })
      .then(res => {
        // (!res.ok)
        //   ? res.json().then(e => Promise.reject(e))
        //   : res.json()
        if(!res.ok){
          res.json().then(e => Promise.reject(e))
        }
      })
  },
  deleteItem(itemId) {
    return fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      })
      .then(res => {
        if(!res.ok){
          res.json().then(e => Promise.reject(e))
        }
      })
    }
  }

export default ItemApiService