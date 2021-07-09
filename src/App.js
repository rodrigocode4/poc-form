import { Field } from './Components/'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    console.log(data);
  };
  console.log('aaaa')
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
          onChangeInput={true}
          />
        <Field 
          name="site" 
          control={control}/>
        <input type="submit" />
      </form>
    </>
  );
}

export default App;
