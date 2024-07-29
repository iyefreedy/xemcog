import sys
from functools import wraps
from flask_jwt_extended import current_user


def admin_required():
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            print('Is it checked', file=sys.stderr)

            if current_user.is_admin is False:
                return {"message": "Unauthorized"}, 403

            return func(*args, **kwargs)

        return wrapper
    return decorator
