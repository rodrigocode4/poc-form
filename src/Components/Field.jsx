import { useController } from 'react-hook-form'

export const Field = ({ name, control, onChangeInput, ...restProps }) => {

    const {
        field: { value, onChange, onBlur },
        fieldState: { error },
      } = useController({ name, control,  });
    
    return (
        <>
            <label htmlFor={name}>{name}</label>
            <input
                id={name}
                title={name}
                onChange={e => onChangeInput ? onChange(onChangeInput(e)) : onChange(e)}
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