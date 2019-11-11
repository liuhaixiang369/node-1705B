function num(n) {
    let arr = [];
    let t = [];
    for (let i = 0; i <= n; i++) {
        t.push(i);
    }
    for (let i = parseInt(n / 2) + 1; i >= 2; i--) {
        let temp = n / i;
        if (i % 2 === 1 && temp === parseInt(temp)) {
            let left = temp - (i - 1) / 2;
            let right = temp + (i - 1) / 2;
            if (left > 0) {
                let r = t.slice(left,right + 1);
                arr.push(r);
            }
        }
        if (i % 2 === 0 && temp !== parseInt(temp) && temp * 2 === parseInt(temp * 2)) {
            let left = parseInt(temp) - (i / 2 - 1);
            let right = parseInt(temp) + i / 2;
            if (left > 0) {
                let r = t.slice(left,right + 1);
                arr.push(r);
            }
        }
    }
    return arr;
}
console.log(num(15));