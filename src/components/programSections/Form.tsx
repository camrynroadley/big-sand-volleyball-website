  "use client";
import { useForm } from "react-hook-form";
import GradientText from "../ui/GradientText";

type FormData = {
  childFirstName: string;
  childLastName: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(`Submitted: ${data.childFirstName} ${data.childLastName}`);
  };

  return (
    <section className="bg-[#f5f5f5] py-16 px-4">
      <GradientText
      >
        <p className="text-sm font-semibold text-center">Ready to join?</p>
      </GradientText>
      <h2 className="text-5xl font-semibold text-black mb-4 text-center">
        Sign up now
      </h2>
      <p className="text-sm text-center mb-4"><i>* indicates a required field</i></p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* First Name */}
        <div className="flex flex-col">
          <label htmlFor="childFirstName" className="mb-1 font-medium">
            Child First Name *
          </label>
          <input
            id="childFirstName"
            {...register("childFirstName", { required: "Child first name is required" })}
            className="bg-white border border-black rounded-md px-3 py-2"
          />
          {errors.childFirstName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.childFirstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="childLastName" className="mb-1 font-medium">
            Child Last Name *
          </label>
          <input
            id="childLastName"
            {...register("childLastName", { required: "Last name is required" })}
            className="bg-white border border-black rounded-md px-3 py-2"
          />
          {errors.childLastName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.childLastName.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="sm:col-span-2 mt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
