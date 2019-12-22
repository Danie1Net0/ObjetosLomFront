import { FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('Informe um campo para a validação');
      }

      if (!formControl.root || !(formControl.root as FormGroup).controls) {
        return null;
      }

      const field = (formControl.root as FormGroup).get(otherField);

      if (field == null) {
        throw new Error('Informe um campo válido');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: otherField };
      }

      return null;
    };

    return validator;
  }

  static getErrorMessage(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      required:     `O campo '${ fieldName }' é obrigatório`,
      minlength:    `O campo '${ fieldName }' deve ter no mínimo ${validatorValue.requiredLength} caracteres`,
      maxlength:    `O campo '${ fieldName }' deve ter no máximo ${validatorValue.requiredLength} caracteres`,
      email:        `O campo '${ fieldName }' deve ter um e-mail válido`,
      invalidEmail: `E-mail já cadastrado`,
      equalsTo:     `O campo '${ fieldName }' não corresponde com o primeiro valor informado`,
    };

    return config[validatorName];
  }

}
