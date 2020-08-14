export default `
<h3>54. Отображение объекта в консоли</h3>

<p>Когда вы набираете <span>console.log</span> в JavaScript-программе, запущенной в браузере, то получаете что-то вроде этого:</p>

<img src="img/54-1.png" alt="">

<p>При нажатии на стрелочку, лог раскрывается и вы видите свойства объекта:</p>

<img src="img/54-2.png" alt="">

<p>В Node.js происходит тоже самое. 

<p>Это выглядит не так красиво, как в браузере. Объект выводится в терминал или в лог-файл. Мы получаем строковое представление объекта. 

<p>Все хорошо до определенного уровня вложенности. После второго уровня Node.js выводит заменитель <span>[Object]</span>:

<code>
const obj = {
    name: 'joe',
    age: 35,
    person1: {
        name: 'Tony',
        age: 50,
        person2: {
            name: 'Albert',
            age: 21,
            person3: {
                name: 'Peter',
                age: 23
            }
        }
    }
}
console.log(obj)


{
    name: 'joe',
    age: 35,
    person1: {
        name: 'Tony',
        age: 50,
        person2: {
            name: 'Albert',
            age: 21,
            person3: [Object]
        }
    }
}
</code>

<p>Как же нам увидеть весь объект? 

<p>Лучшим способом это сделать является следующий: 

<code>
console.log(JSON.stringify(obj, null, 2))
</code>

<p>Здесь <span>2</span> - это количество пробелов - отступов каждого уровня вложенности. 

<p>Другой способ: 

<code>
require('util').inspect.defaultOptions.depth = null
console.log(obj)
</code>

<p>При использовании данного способа необходимо учитывать, что после второго уровня вложенности объекты разворачиваются, это может стать проблемой при работе со сложными объектами. 
`