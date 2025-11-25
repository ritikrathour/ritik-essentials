import Input from "../Input";
import { Button } from "../ui/Button";

const Setting = ({ data }: any) => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <Input
              label="full name"
              name="name"
              type="text"
              placeholder="Enter Your Name"
              defaultValue={data?.data?.name}
              value={undefined}
              onchange={function (
                e: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <div>
            <Input
              label="email"
              name="email"
              type="email"
              placeholder="Enter Your email"
              defaultValue={data?.data?.email}
              value={undefined}
              onchange={function (
                e: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <div>
            <Input
              label="Phone Number"
              name="phone number"
              type="text"
              placeholder="Enter Your Phone"
              defaultValue={data?.data?.phone}
              value={undefined}
              onchange={function (
                e: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <div>
            <Input
              label="Date of birth"
              name="date of birth"
              type="date"
              placeholder="Enter Your date of birth"
              defaultValue={data?.data?.DOB}
              value={undefined}
              onchange={function (
                e: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <Button type="button" className="w-[200px]">
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
};
export default Setting;
