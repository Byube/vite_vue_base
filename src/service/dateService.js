const ONEMONTH = 29 * 1000 * 60 * 60 * 24;

export const getOneMonth = () => {
    let d = new Date();
    let result = [];
    const today = new Date();
    const lastDate = new Date(Date.parse(d) - ONEMONTH);
    // console.log('today >> ', today);
    // console.log('ago >>> ', lastDate);
    while (lastDate <= new Date(today)) {
        result.push(lastDate.getDate());
        lastDate.setDate(lastDate.getDate() + 1);
    }
    return (
        result
    );
}

export const getMonthData = () => {
    const M = '월';
    const d = new Date("2022-08-30");
    const result = [];
    const today = new Date("2022-08-30");
    const oneMonthAgo = new Date(Date.parse(d) - ONEMONTH);
    result.push(today.getMonth() + 1 + M);
    result.push(oneMonthAgo.getMonth() + 1 + M);
    return (
        result
    );
}