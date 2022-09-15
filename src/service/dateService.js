const ONEMONTH = 29 * 1000 * 60 * 60 * 24;
const D = new Date();
const TODAY = new Date();

/**
 * @namespace dateService
 * @description 날짜(Date) 관련 데이터 처리
 */

/**
 * @function getOneMonth
 * @description 오늘 날짜 기준 30일 전 까지 사이 날짜 전부 반환
 * @example today : 2022-09-15
 *         8월----------------9월
 * return [17,18,19,...30,31,1,2....15];
 * @returns {Array} result 
 * @memberof dateService#
 */
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

/**
 * @function getMonthData
 * @description 현재 월, 30일 이전 월 데이터 반환
 * @example today : 2022-09-15 > return ["9월","8월"]
 * today : 2022-08-30 > return ["8월","8월"]
 * @returns {Array} result
 * @memberof dateService#
 */
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