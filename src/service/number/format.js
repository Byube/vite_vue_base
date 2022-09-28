

export const numberFormat = (fromData) => {
    if(fromData === null){
        return;
    }
    const resultData = fromData.toLocaleString('ko-KR');
    return (
        resultData
    );
}