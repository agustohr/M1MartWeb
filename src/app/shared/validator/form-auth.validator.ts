import { AbstractControl } from "@angular/forms";

export class AuthValidators {
    static equalValues(controlName: string, matchingControlName: string) {
        return (formGroup: AbstractControl) => {
            const control1Value = formGroup.get(controlName)?.value;
            const control2Value = formGroup.get(matchingControlName)?.value;
            
            if(control1Value !== control2Value){
                return {notEqualValues: true};
            }
            return null;
        }
    }
}