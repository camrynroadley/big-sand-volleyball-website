import { FormInput } from "../../../../types/app";

const SignUpFormContent: FormInput[] = [
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
  { id: "shirt_size", label: "T-Shirt Size (Women's)", type: "text" },
  {
    id: "health_info",
    label: "Any allergies or past injuries we should be aware of?",
    type: "textarea",
  },
];

export default SignUpFormContent;
