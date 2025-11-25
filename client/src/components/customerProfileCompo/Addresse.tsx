import { Button } from "../ui/Button";

const Addresse = ({ address }: any) => {
  return (
    <>
      <div>
        <div className="flex items-center flex-col md:flex-row space-y-4 justify-between mb-6">
          <h2 className="text-2xl font-bold">Saved Addresses</h2>
          <Button type="button" className="w-[220px]">
            Add New Address
          </Button>
        </div>
        <div className="space-y-4">
          {address.map((address: any) => (
            <div key={address.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-5 items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{address.name}</h3>
                  <p className="text-gray-600 mb-2">{address.address}</p>
                  <p className="text-gray-600">Phone: {address.phone}</p>
                </div>
                <div className="flex space-x-2">
                  <Button type="button" variant="secondary">
                    Edit
                  </Button>
                  <Button type="button" variant="danger">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Addresse;
