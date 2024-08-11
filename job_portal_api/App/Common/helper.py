def replace_none_strings_with_none(data):
    if isinstance(data, dict):
        return {k: replace_none_strings_with_none(v) for k, v in data.items()}
    elif data == 'None':
        return None
    else:
        return data