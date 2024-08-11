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