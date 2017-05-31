/**
 * Created by netre on 30.05.2017.
 */
import axios from 'axios';

export class DumbApi {
    //TODO: Fetch products
    fetchProducts() {
        return axios.get('https://vladimirmilenko.github.io/lightspeed/products.json')
            .then((response) => {
                return response.data
            })
    }
}