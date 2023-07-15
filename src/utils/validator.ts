import * as helpers from '../helpers/checkers';

import { Login } from '../types/exporter';

function loginFields(fields: Login) : void {
  type KeyFields = keyof typeof fields;

  ['username', 'password'].forEach((field) => {
    if (!helpers.keyChecker(fields, field) || !helpers.isEmpty(fields[field as KeyFields])) {
      throw new Error('"username" and "password" are required');
    }
  });
}

export default loginFields;