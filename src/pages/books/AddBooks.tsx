import CustomInput from "../../components/CustomInput";

export default function AddBooks() {

  // TODO: API Integration

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // input values extraction from the form
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData);
    console.log(formValues);

  // always wrap API calls in try-catch block
    try {
      const response = await fetch("http://localhost:3000/books", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-lg font-bold">Add Books</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-8 rounded-lg shadow-md w-full">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col space-y-2 w-1/2">
            <CustomInput label="Title" type="text" />
            <CustomInput label="Author" type="text" />
            <CustomInput label="ISBN" type="text" />
            <CustomInput label="Publisher" type="text" />
          </div>
          <div className="flex flex-col space-y-2 w-1/2">
            <CustomInput name="published_date" label="Published Date" type="date" />
            <CustomInput label="Category" type="string" />
            <CustomInput name="available_copies" label="Available Copies" type="text" />
            <CustomInput name="total_copies" label="Total Copies" type="text" />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-black w-[150px] text-white py-2 rounded-md">
            + Add Book
          </button>
        </div>
      </form>
    </div>
  );
}

// FOR SPACING
// margin
// padding
// gap
// space-x
// space-y