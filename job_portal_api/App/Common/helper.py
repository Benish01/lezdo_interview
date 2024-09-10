from dotenv import load_dotenv
import os
load_dotenv()
def replace_none_strings_with_none(data):
    if isinstance(data, dict):
        return {k: replace_none_strings_with_none(v) for k, v in data.items()}
    elif data == 'None':
        return None
    else:
        return data
    
def get_from_env(key):
    env_val = os.getenv(key)
    return env_val if env_val else None
    