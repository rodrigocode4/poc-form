import { useCallback } from 'react'
import { useController } from 'react-hook-form'

export const Field = ({ name, control, onChangeInput, ...restProps }) => {

    const {
        field: { value, onChange, onBlur },
        fieldState: { error },
      } = useController({ name, control,  });
    
    const handleChangeInput = useCallback((event) => {
        const validator = event.nativeEvent.data
        if(validator === null) return onChange(event)
        if(isNaN(parseInt(validator))) return;

        const value = String(event.target.value).replace(/\./g, '')
        let valueFormated = new Intl.NumberFormat('pt-BR').format(value)
        event.target.value = valueFormated
        onChange(event)
    },[onChange])
    return (
        <>
            <label htmlFor={name}>{name}</label>
            <input
                id={name}
                title={name}
                onChange={onChangeInput ? handleChangeInput : onChange}
                onBlur={onBlur}
                value={value || ''}
                {...restProps}
                />
            {error && <p>{processError(error).message}</p>}
        </>
    )
}

const processError = error => {
    console.log(error)
    if (error.type === 'typeError') {
        return {...error, message: 'Caracter inesperado e inválido!'}
    }
    return error
}