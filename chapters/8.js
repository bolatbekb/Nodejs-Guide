export default `
<h3>8. Выход (завершение работы)</h3>

<p>Существуют различные способы остановки Node.js-приложения. 

<p>При запуске программы посредством терминала, вы можете закрыть его с помощью <span>ctrl-C</span>, однако давайте обсудим программные способы. 

<p>Начнем с самого радикального, и скажем, почему его не следует использовать. 

<p>Основной (глобальный, модуль ядра) модуль <span>process</span> содержит удобный метод, позволяющий программно выйти из Node.js-приложения: <span>process.exit()</span>. 

<p>Когда Node.js достигает этой строки кода, процесс выполнения программы немедленно завершается. 

<p>Это означает, что все выполняющиеся функции обратного вызова, отправленные (незавершенные) запросы, открытый доступ к файловой системе, процессы записи в <span>stdout</span> или <span>stderr</span> - все они будут жестко прерваны. 

<p>Если это для вас является приемлемым, вы можете передать методу <span>exit()</span> целое число - сигнал к завершению выполнения кода:

<code>
process.exit(1)
</code>

<p>По умолчанию код выхода - 0, указывающий на успешное завершение. Разные коды выхода имеют разное значение, вы можете использовать их для взаимодействия одних программ с другими. 

<p>Подробнее о кодах выхода можно почитать <a href="https://nodejs.org/api/process.html#process_exit_codes">здесь</a>.

<p>Также вы можете присвоить соответствующее значение свойству <span>exitCode</span>:

<code>
process.exitCode = 1
</code>

<p>и после завершения программы, Node.js вернет этот код. 

<p>Выполнение программы завершится мягко, когда все процессы будут выполнены. 

<p>В Node.js мы часто запускаем сервер:

<code>
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hi!')
})

app.listen(3000, () => console.log('Server ready'))
</code>

<p>Эта программа никогда не завершится. Если вы вызовете <span>process.exit()</span>, все ожидающие или выполняющиеся запросы будут прерваны. Это не круто. 

<p>В данном случае необходимо отправить команду-сигнал <span>SIGTERM</span> и обработать ее с помощью обработчика процессорных сигналов (<span>process</span> подключать не нужно, он доступен по умолчанию):

<code>
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hi!')
})

const server = app.listen(3000, () => console.log('Server ready'))

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated')
    })
})
</code>

<p>Что такое сигналы? Сигналы - это система коммуникации POSIX: отправка процессу уведомления о произошедшем событии. 

<p><span>SIGKILL</span> - сигнал о немедленном завершении процесса, аналогичный <span>process.exit()</span>. 

<p><span>SIGTERM</span> - сигнал о мягком завершении процесса. Этот сигнал может быть отправлен системой управления процессами, такой как <span>upstart</span>, <span>supervisord</span> и др. 

<p>Вы можете отправить данный сигнал внутри программы через другую функцию:

<code>
process.kill(process.id, 'SIGTERM')
</code>

<p>Или из другой Node.js-программы или любого другого приложения, запущенного в системе, при условии, что им известен PID процесса, который вы хотите завершить. 

<h3>Как читать переменные среды в Node.js?</h3>

<p>Основной модуль Node.js <span>process</span> имеет свойство <span>env</span>, содержащее все переменные среды, установленные при запуске процесса. 

<p>Вот пример получения доступа к переменной среды NODE_ENV, установленной в значение <span>development</span> по умолчанию:

<code>
process.env.NODE_ENV // development
</code>

<p>Установка значения в production перед выполнением скрипта сообщит Node.js о том, что перед ним среда для продакшна. 

<p>Аналогичным способом вы можете получить доступ к любой переменной среды. 
`