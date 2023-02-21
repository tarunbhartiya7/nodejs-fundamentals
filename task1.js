function reverseString(str = "") {
    return str.split('').reverse().join('')
}

process.stdin.on("data", data => {
    data = reverseString(data.toString())
    process.stdout.write(data + "\n")
})