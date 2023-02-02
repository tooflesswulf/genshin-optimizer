onmessage = ({data}: {data: number}) => {
  console.log('TestWorker Recieved: ', data)
  postMessage(42)
}
