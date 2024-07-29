create_user_schema = {
    "fullname": {"type": "string", "empty": False, "required": True},
    "email": {"type": "string", "empty": False, "required": True, "regex": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"},
    "password": {"type": "string", "empty": False, "required": True, "minlength": 8}
}
