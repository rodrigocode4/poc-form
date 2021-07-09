import { useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Field } from './Components/'

const schema = yup.object().shape({
  nome: yup
    .string()
    .required((field) => `${field.path} é obrigatório`),
  total: yup
    .number('deve ser número')
    .required((field) => `${field.path} é obrigatório`)
    .transform((_, originalValue) => {
      if(originalValue === '') return undefined
      return parseInt(String(originalValue).replace(/\./g, ''))
    })
    .max(999999, 'Quantidade excedida'),
  site: yup
    .string()
    .url()
    .required('campo obrigatório')
});


function App() {
  const [dataForm, setDataForm] = useState()

  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  
  const onSubmit = (data) => {
    setDataForm(data);
  };

  const handleChangeInput = useCallback((event) => {
    const validator = event.nativeEvent.data
    if(validator === null) return event
    if(isNaN(parseInt(validator))) return;
  
    const value = String(event.target.value).replace(/\./g, '')
    let valueFormated = new Intl.NumberFormat('pt-BR').format(value)
    event.target.value = valueFormated
    return event
  },[])
  

  return (
    <>
      <h1 style={{textAlign: 'center'}}>Configuração Inicial da POC-Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="nome"
          control={control}/>
        <Field 
          name="total"
          control={control}
          onChangeInput={handleChangeInput}
          />
        <Field 
          name="site" 
          control={control}/>
        <input type="submit" />
      </form>
      {dataForm && (
          <pre style={{textAlign: 'center'}}>
            <code>{JSON.stringify(dataForm)}</code>
          </pre>
          )
      }
    </>
  );
}

export default App;
