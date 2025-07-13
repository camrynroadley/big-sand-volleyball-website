import { FormInput } from "../../../types/app";

export const formContent: FormInput[] = [
  {
    id: "child_first_name",
    label: "Child First Name *",
    error: "Required",
    required: true,
  },
  {
    id: "child_last_name",
    label: "Child Last Name *",
    error: "Required",
    required: true,
  },
  {
    id: "parent_1_first_name",
    label: "Parent or Guardian 1 First Name *",
    error: "Required",
    required: true,
  },
  {
    id: "parent_1_last_name",
    label: "Parent or Guardian 1 Last Name *",
    error: "Required",
    required: true,
  },
  {
    id: "parent_1_phone",
    label: "Parent or Guardian 1 Phone Number *",
    error: "Required",
    required: true,
    type: "tel",
  },
  {
    id: "parent_1_email",
    label: "Parent or Guardian 1 Email *",
    error: "Required",
    required: true,
    type: "email",
  },
  {
    id: "parent_2_first_name",
    label: "Parent or Guardian 2 First Name",
    type: "text",
  },
  {
    id: "parent_2_last_name",
    label: "Parent or Guardian 2 Last Name",
    type: "text",
  },
  {
    id: "parent_2_phone",
    label: "Parent or Guardian 2 Phone Number",
    type: "tel",
  },
  { id: "parent_2_email", label: "Parent or Guardian 2 Email", type: "email" },
  {
    id: "grade",
    label: "Grade *",
    error: "Required",
    type: "select",
    required: true,
    options: ["4", "5", "6", "7", "8", "9", "10", "11", "12"],
  },
  { id: "school", label: "School", type: "text" },
  {
    id: "shirt_size",
    label: "T-Shirt Size (Women's) *",
    type: "select",
    error: "Required",
    required: true,
    options: ["XS", "SM", "MD", "LG", "XL", "Other"],
  },
  {
    id: "agree_to_privacy",
    label: "I agree to the collection of this information *",
    type: "checkbox",
    error: "You must agree to the privacy policy to continue.",
    required: true,
  },
  {
    id: "agree_to_photos",
    label:
      "I understand that there may be photos taken and used for promotional purposes only",
    type: "checkbox",
  },
];
