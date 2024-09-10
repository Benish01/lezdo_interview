export const to_readable_str = (str) => {
  if (typeof str !== 'string' || !str) {
    return str;
  }
  if (!str.includes('_')) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }
  return str
    .replace(/_/g, ' ')               
    .toLowerCase()                    
    .replace(/\b\w/g, char => char.toUpperCase()); 
};

  


export const  to_code_str =(str) => {
  return str
      .toLowerCase()                     
      .replace(/\s+/g, '_');           
}



export const  hasKeyWithValue=(obj, check_count = false)=> {
  var key_value_count = 0
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
        if(!check_count){
          return true
        }
        else{
          key_value_count = key_value_count+1
        }
      }
    }

    if(check_count){
      return key_value_count
    }
    return false;
  }


export const is_csv_file = (file)=>{
  return file.type === 'text/csv' || file.name.endsWith('.csv');
}

export const array_to_str = (value)=>{
  return value.toString()
}


export const generate_columns_for_imported_data = (file_data_obj)=>{
  var result = []
    if(file_data_obj){
        for(const key in file_data_obj){
          if (file_data_obj.hasOwnProperty(key)) {
            const newColumn = {
              field: to_code_str(key),
              headerName: to_readable_str(key),
              width:200,
              valueFormatter: (value ) => {
                  if(Array.isArray(value)){
                    return array_to_str(value)
                  }
                  else if(typeof value == 'object' || !value || !value.replace(/ /g, '')){
                    return "-"
                  }
                  else{
                    return to_readable_str(value)
                  }
              },
              
            };
            
    
            result.push(newColumn);

        }
    }
  }

    return result

}