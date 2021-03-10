Vue.component('error',{
    props: ['error'],
    template: `<p class="errMsg">Ошибка: "{{ error }}"</p>`
})