const ONEMONTH = 29 * 1000 * 60 * 60 * 24;
const D = new Date();
const TODAY = new Date();

export const getOneMonth = () => {
    let result = [];
    const lastDate = new Date(Date.parse(D) - ONEMONTH);
    while (lastDate <= new Date(TODAY)) {
        result.push(lastDate.getDate());
        lastDate.setDate(lastDate.getDate() + 1);
    }
    return (
        result
    );
}

export const getMonthData = () => {
    const M = '월';
    const result = [];
    const oneMonthAgo = new Date(Date.parse(D) - ONEMONTH);
    result.push(TODAY.getMonth() + 1 + M);
    result.push(oneMonthAgo.getMonth() + 1 + M);
    return (
        result
    );
}