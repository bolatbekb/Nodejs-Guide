export default `
<h3>30. Таймеры (счетчики)</h3>

<h5>setTimeout()</h5>

<p>При написании JS-кода может возникнуть необходимость отложить выполнение функции. 

<p>Это как раз то, что делает <span>setTimeout()</span>. Вы определяете функцию с отложенным выполнением и указываете время в миллисекундах:

<code>
    setTimeout(() => {
        // запустить через 2 секунды
    }, 2000)

    setTimeout(() => {
        // запустить через 50 миллисекунд 
    }, 50)
</code>

<p>Здесь мы определяем новую функцию. Однако вы также можете вызывать любые другие функции, передавать название существующей функции или набор параметров:

<code>
    const myFunction = (firstParam, secondParam) => {
        // код 
    }

    // запустить через 2 секунды 
    setTimeout(myFunction, 2000, firstParam, secondParam)
</code>

<p><span>setTimeout()</span> возвращает идентификатор счетчика. Обычно он не используется, но вы можете его сохранить с целью дальнейшей остановки таймера:

<code>
    const id = setTimeout(() => {
        // запустить через 2 секунды 
    }, 2000)

    clearTimeout(id)
</code>

<h5>Нулевая задержка</h5>

<p>Если значением счетчика является 0, функция обратного вызова выполняется максимально быстро, но после выполнения текущей функции: 

<code>
    setTimeout(() => {
        console.log('after')
    }, 0)

    console.log('before')
</code>

<p>Этот код выведет в консоль <span>before after</span>. 

<p>Такой подход применяется во избежание блокировки ЦП сложными задачами, с целью выполнения других функций во время тяжелых вычислений, посредством помещения данных вычислений в очередь планировщика задач. 

<p>Некоторые браузеры (IE и Edge) реализуют метод <span>setImmediate()</span> с похожим функционалом, но он не является стандартным и не поддерживается другими браузерами. Однако <span>setImmediate()</span> является стандартной функцией в Node.js. 

<h5>setInterval()</h5>

<p><span>setInterval()</span> - это функция, похожая на <span>setTimeout()</span>, с небольшим отличием: вместо однократного запуска колбека, она запускает его снова и снова, через заданные промежутки времени (в мс): 

<code>
    setInterval(() => {
        // запускать каждые 2 секунды 
    }, 2000)
</code>

<p>Приведенная функция будет выполняться каждые 2 секунды до тех пор, пока вы не выключите таймер с помощью <span>clearInterval()</span>, передав этому методу идентификатор счетчика: 

<code>
    const id = setInterval(() => {
        // запускать каждые 2 секунды 
    }, 2000)

    clearInterval(id)
</code>

<p>Обычной практикой является вызов <span>clearInterval()</span> внутри <span>setInterval()</span>, позволяя последней самостоятельно определять, следует ли ей продолжать выполнение или же ей следует остановиться. В следующем примере код будет выполняться до тех пор, пока App.somethingIWait не получит значения <span>arrived</span>:

<code>
    const interval = setInterval(() => {
        if (App.somethingIWait === 'arrived') {
            clearInterval(interval)
            return
        }
        // другой код 
    }, 100)
</code>

<h5>Рекурсивный setTimeout()</h5>

<p><span>setInterval()</span> запускает функцию каждые n мс, независимо от завершения выполнения этой функции. 

<p>Если функция всегда выполняется за одно и тоже время, то все в порядке:</p>

<img src="./img/30-1.png" alt="">

<p>Но что, если выполнение функции занимает разное время, например, в зависимости от условий соединения:</p>

<img src="./img/30-2.png" alt="">

<p>Или одно долгое выполнение накладывается на другое: 

<img src="./img/30-3.png" alt="">

<p>Во избежание этого вы можете создать рекурсивный <span>setTimeout()</span> с целью следующего вызова функции после завершения предыдущего: 

<code>
    const myFunction = () => {
        // код 

        setTimeout(myFunction, 1000)
    }

    setTimeout(myFunction, 1000)
</code>

<p>Этот сценарий выглядит так:</p> 

<img src="./img/30-4.png" alt="">

<p><span>setTimeout()</span> и <span>setInterval()</span> доступны в Node.js благодаря <a href="https://nodejs.org/api/timers.html">модулю "Таймер"</a>. 

<p>Node.js также предоставляет <span>setImmediate()</span>, являющийся эквивалентом <span>seTimeout(() => {}, 0)</span>, используемый, преимущественно, для работы с циклом событий. 
`