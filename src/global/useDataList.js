import { useState, useEffect } from "react";

const makeObjectFilter = (obj, keys) => {
    let result = false
    let objFilter = {
        value : '',
        dataValue: ''
    }

    for (let i = 0; i < keys.length; i++) {
        if (obj.hasOwnProperty(keys[i])) {
            const exten = i + 1 === keys.length ? '' : ' | '

            if (i === 0) {
                objFilter.dataValue = obj[keys[i]]
            }

            objFilter.value = objFilter.value + obj[keys[i]] + exten
            result = true
        }
    }

    return {objFilter, result}
}

const useDataList = () => {

    const [dataIn, setDataIn] = useState([])
    const [dataOut, setDataOut] = useState([])

    useEffect(() => {
        if (dataIn.length > 0) {
            const [data, filters] = dataIn

            const dataList = data.map(dataOnly => {
                const {objFilter, result} = makeObjectFilter(dataOnly, filters)
                return result ? objFilter : result
            }).filter(value => {
                return value
            })
            
            setDataOut(dataList)
        }
    }, [dataIn])

    return [dataOut, setDataIn]
}

export default useDataList