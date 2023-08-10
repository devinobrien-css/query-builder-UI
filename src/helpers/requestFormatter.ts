

type InputType = {
    relation: string,
    field: string,
    operator: string,
    value: string,
};
const formatRequest = (data : InputType) => {
    return {
      "where" : {
        [data.field]: {
          [data.operator] : data.value
        }
      }
    }
}


export {
    InputType,
    formatRequest
}