import jsCookie from 'js-cookie'
import axios from 'axios'
import { createBrotliCompress } from 'zlib';

let value = 'set a cookie!';

function setACookie() {
    jsCookie.set('name', value)
}
setACookie();