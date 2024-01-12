import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useQuery } from '@apollo/client';
import { InputType, formatRequest } from "./helpers/requestFormatter";
import { GET_INDIVIDUAL } from "./graphql/individuals";

const QueryCreator = () => {
  // const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm<InputType>();
  const { control, register, handleSubmit, watch, getValues } = useForm();
  const { append, remove, fields } = useFieldArray({
    control,
    name:"query"
  });

  const onSubmit = (data: any) => {
    console.log(data)
  };

  const {loading,error,data} = useQuery(GET_INDIVIDUAL, {
    variables: {
      where: {
        firstname: {
          contains: "Jo"
        },
        lastname: {
          contains: "S"
        }, 
      }
    }
  });

  return (
    <section className="bg-gray-600 mx-auto my-16 w-4/5 shadow-gray-600 border border-gray-600 rounded-xl py-12">
      <form onSubmit={handleSubmit(onSubmit)} >
        {fields.map((field,index) => {
          return (
            <div className="flex rounded border justify-evenly bg-gray-200 w-4/5 mx-auto">
              <p className="font-lato text-lg my-auto">SELECT</p>
              <select {...register(`query.${index}.relation`, { required: true })} defaultValue="" className="cursor-pointer font-lato text-lg p-4">
                <option value=''></option>
                <option value='individual'>Individuals</option>
                <option value='address'>Addresses</option>
              </select>
              <p className="font-lato text-lg my-auto">WHERE</p>
              <select {...register(`query.${index}.field`, { required: true, value:'' })} disabled={!watch('relation')} className="disabled:bg-gray-300 disabled:cursor-not-allowed disabled:border cursor-pointer font-lato text-lg p-4">
                <option value=''></option>
                <option value='firstname'>First Name</option>
                <option value='lastname'>Last Name</option>
                <option value='email'>Email</option>
              </select>
              <select {...register(`query.${index}.operator`, { required: true, disabled:!watch('field') })}  className="disabled:bg-gray-300 disabled:cursor-not-allowed disabled:border cursor-pointer font-lato text-lg p-4">
                <option value=''></option>
                <option value='equals'>Equals</option>
                <option value='contains'>Contains</option>
                <option value='startsWith'>Starts With</option>
                <option value='endsWith'>Ends With</option>
              </select>
              <input {...register(`query.${index}.value`, { required: true,  disabled:!watch('operator') })} placeholder="value.." className="disabled:bg-gray-300 disabled:border disabled:cursor-not-allowed cursor-pointer font-lato text-lg p-4"/>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => {
            append({ selectValues: ['', '', ''] });
          }}
        >
          Add Form
        </button>
        
        <button className="font-lato font-bold text-white bg-blue-400 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed rounded block mx-auto my-8 p-4 " disabled={getValues('value') === undefined}>Search</button>
      </form>
    </section>
  )
}

const App = () => {
  return (
    <div className="bg-gray-800 min-h-screen">
      <header className="p-4">
        <p className="text-blue-100 text-3xl font-raleway">
          Query Builder Demo
        </p>
        <div className="w-full py-16">
          <p className="text-white font-lato text-3xl mx-auto text-center">Use the Following Section to Query the Database</p>
          <QueryCreator />
        </div>
      </header>
    </div>
  );
}

export default App;
