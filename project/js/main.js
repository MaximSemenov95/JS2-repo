const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        isServerError: false,
        errMsg: '',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.errMsg = error;
                    this.isServerError = true;
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

