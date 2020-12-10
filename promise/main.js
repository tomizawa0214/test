// 処理1
let promise = new Promise((resolve, reject) => {
    console.log('処理1')
    resolve('Hello ')
})

promise.then((msg) => {
    // 処理2
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        console.log('処理2')
        resolve(msg + "I'm ")
        }, 3000)
    })
    // 処理3
    }).then((msg) => {
        console.log('処理3')
        return msg + 'Jun.'
    // 処理4
    }).then((msg) => {
        console.log('処理4')
        console.log(msg)
    }).catch(() => { // エラーハンドリング
    console.error('Something wrong!')
})