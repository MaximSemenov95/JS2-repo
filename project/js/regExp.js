//в индексе этот скрипт подключен, но закомментирован

//сделал два варианта: сначала - простой с двумя реплейесами, потом - вымучал
//и сделал через один, но он как-то замудрено выглядит, на мой взгляд
//еще не понял, зачем в последней строке одинарная кавычка посередине и убрал ее, 
//т.к. она все ломала, а грамматического или синтаксического смысла, 
//насколько я знаю английский, она не несет

let str = `One: 'Hi Mary.' 
Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.' `;

let replaceTicks = () => {
    let exampleReg = new RegExp(/(\s)'(.+?)'(\s)/ig);
    str = str.replace(exampleReg, '$1"$2"$3');
    /*
    let singleToDouble = new RegExp(/'/g);
    let doubleToSingle = new RegExp(/\b\"\b/g);
    str = str.replace(singleToDouble, '"');
    str = str.replace(doubleToSingle, "'");
    */
    return str
}

console.log(replaceTicks());