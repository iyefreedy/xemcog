from cerberus import Validator


class CustomValidator(Validator):
    def _validate_is_equal_to(self, is_equal_to, field, value):
        """ Test the value against another field.
        The rule's arguments are validated against this schema:
        {'type': 'string'}
        """
        if value != self.document.get(is_equal_to):
            self._error(field, f'{field} must be equal to {is_equal_to}')
