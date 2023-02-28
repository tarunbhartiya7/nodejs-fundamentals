function reverseString(str = "") {
    let result = ""
    
    for(let i=str.length-1;i>=0;i--) {
        result += str[i]
    }
    
    return result
}

process.stdin.on("data", data => {
    data = reverseString(data.toString())
    process.stdout.write(data + "\n")
})