const timeOut = (t) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (t === 2000) {
          reject(`Rejected in ${t}`)
        } else {
          resolve(`Completed in ${t}`)
        }
      }, t)
    })
  }
  
  const durations = [1000, 2000, 3000]
  
  const promises = []
  
  durations.map((duration) => {
    promises.push(timeOut(duration)) 
  })
  
  Promise.all(promises)
  .then(response => console.log(response))
  .catch(error => console.log(`Error in executing ${error}`));