/**
 * Created by Mohamed Eliyas on 09-01-2018.
 */

import axios from "axios";


export function searchBooks(searchTerm) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8090/api/search/book/'+searchTerm)
            .then((res) => {
                return resolve(res.data);
            })
            .catch((err) => {
                return reject(err)
            })
    })
}