// let hello = new Promise(function(resolve, reject) {
//     // resolve('Some message for Jeka \n');
//     reject('Some error with Jeka \n');
// });

// hello.then(str => `${str} sent successfully \n`, () => {
//     alert('errorMessage');
//     return 'default message'
// })
//      .then(str => `${str}!!!`)
//      .then(str => console.log(str))
//      .then(() => console.log('nothing'))
//     //  .catch(err => {
//     //         console.log(err)
//     //         return err;
//     //  } )

//      .then((msg) => {
//         console.log('despite the error we go further !!! ')
//      })



      
// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('You win');
//         reject('Total fail')
//     }, 1000);
// })

// promise.then(
//     msg => {
//         console.log("Fullfield " + msg)
//     }, 
//     error => {
//         console.log('Rejected: ' + error)
//     }
// )




// let p1 = new Promise((resolve, reject) => {
//     setTimeout(reject, 2000, 'Bad connection');
// }).then(
//     message => {
//         console.log(message);
//         return message;
//     }
// )

// let p2 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 4000, 'my second message')
// }).then(msg => {
//     console.log(msg);
//     return msg;
// }).then( msg => `hello ${msg}`)


// Promise.allSettled([p1, p2]).then((values) => { 

//     console.log(values)

//     if (values[0].status == 'rejected') {
//         alert(values[0].reason)
//     }
// })


