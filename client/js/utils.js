function testLag() {
  let j = 0
  const count = 8000000
  for (let i = 0; i < count; i++) {
      j = i * i + Math.sqrt(i)
  }
  console.log(j)
}
  
  
function checkError(message) {
  if (isDebug) {
    throw new Error(message)
  } else {
    console.error(message)
  }
}