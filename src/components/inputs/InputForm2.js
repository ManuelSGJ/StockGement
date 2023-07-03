import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';

const Input = ({ value, type, text, className, datalist, isBlock, active, min, max, onAction }) => {
    const [styleLabel, setStyleLabel] = useState({})
    const [valueInput, setValueInput] = useState(value)

    const inputField = useRef()

    const stylesLabelActive = {
        top: -20,
        left: -10,
        fontSize: 15
    }

    const animateInput = (event) => {
        const typeEvent = event._reactName
        const value = inputField.current.value

        if (typeEvent === 'onChange' && value.trim() !== '') {
            setStyleLabel(stylesLabelActive)
        }

        if (typeEvent === 'onFocus') {
            setStyleLabel(stylesLabelActive)
        }

        if (typeEvent === 'onBlur' && value.trim() === '') {
            setStyleLabel({})
        }
    }

    const getBaseValueDataInput = (valueToFind) => {
        if (valueToFind.trim() === '') {
            return ''
        }

        const valueFound = datalist.data.map(({ value, dataValue }) => (
            value === valueToFind ? dataValue : false
        )).filter(value => (value))

        return valueFound.length > 0 ? valueFound[0] : 0
    }

    const handleValueInputChange = (evt) => {
        const value = evt.target.value
        setValueInput(value)
    }

    useEffect(() => {
        if (type === 'date') {
            setStyleLabel(stylesLabelActive)
        }
        if (isBlock || active) {
            setStyleLabel(stylesLabelActive)
        }
        if (value.trim() !== '') {
            setStyleLabel(stylesLabelActive)
        }
    }, [])


    return (
        <div className={className}>

            {type !== 'dataInput' && (
                <div>
                    <input
                        value={valueInput}
                        type={type}
                        ref={inputField}
                        onChange={(evt) => {
                            animateInput(evt)
                            handleValueInputChange(evt)
                        }}
                        onFocus={animateInput}
                        onBlur={(evt) => {
                            animateInput(evt)
                            if (onAction) {
                                onAction({
                                    inputLabel: text,
                                    value: inputField.current.value
                                })
                            }
                        }}
                        disabled={isBlock}
                        min={min}
                        max={max}
                    />

                    <label style={styleLabel}>
                        {text}
                    </label>
                </div>
            )}


            {type === 'dataInput' && (
                <div>
                    <input
                        value={valueInput}
                        type={type}
                        ref={inputField}
                        onChange={(evt) => {
                            animateInput(evt)
                            handleValueInputChange(evt)
                        }}
                        onFocus={animateInput}
                        onBlur={(evt) => {
                            animateInput(evt)
                            if (onAction) {
                                onAction({
                                    inputLabel: text,
                                    value: getBaseValueDataInput(inputField.current.value)
                                })
                            }
                        }}
                        disabled={isBlock}
                        list={datalist.nameList}
                    />

                    <datalist id={datalist.nameList}>
                        {
                            datalist.data.map(({ value, dataValue }) => (
                                <option
                                    key={value}
                                    data-value={dataValue}
                                    value={value}
                                />
                            ))
                        }
                    </datalist>

                    <label style={styleLabel}>
                        {text}
                    </label>
                </div>
            )}

        </div>
    )
}


const InputForm = styled(Input).attrs(props => ({
    value: props.value ? props.value : '',
    type: props.type ? props.type : '',
    text: props.text ? props.text : '',
    datalist: props.datalist ? props.datalist : false,
    isBlock: props.isBlock ? true : false,
    active: props.active ? true : false,
    min: props.min ? props.min : '',
    max: props.max ? props.max : '',
    onAction: props.onAction ? props.onAction : false
})
)`
    width: ${props => props.fullInput ? '100%' : '30%'};
    margin: ${props => props.fullInput ? '1em' : '50px 10px'};
    position: relative;
    display: inline-block;
    background-color: transparent;
    
    label{
        user-select: none;
        pointer-events: none;
        position: absolute;
        top: -4px;
        left: 0;
        display: flex;
        font-size: 1vw;
        background-color: transparent;
        transition: all 0.3s ease-in-out;
    }

    label p{
        margin-left: 10px;
    }

    input{
        width: 100%;
        border: none;
        border-bottom: 1px solid #54B9D9;
        padding: 2px;
        outline: none;
        background-color: transparent;
    }
`

export default InputForm