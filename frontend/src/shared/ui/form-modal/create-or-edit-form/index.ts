import { CreateOrEditForm as MainComponent } from './form';
import { ColorPicker } from './color-picker';
import { OptionalNumber } from './optional-number';

type CreateOrEditFormType = typeof MainComponent & {
  ColorPicker: typeof ColorPicker;
  OptionalNumber: typeof OptionalNumber;
};

export const CreateOrEditForm: CreateOrEditFormType = Object.assign(MainComponent, {
  ColorPicker,
  OptionalNumber,
});
