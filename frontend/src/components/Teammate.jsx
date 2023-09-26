import useProject from "../hooks/useProjects";
import ModalDeleteTeammate from "./ModalDeleteTeammate";

const Teammate = ({ teammate }) => {
  const { name, email } = teammate;
  const { handleModalDeleteTeammate } = useProject();
  return (
    <>
      <div className="border-b p-5 flex justify-between items-center">
        <div>
          <p className="font-black">{name}</p>
          <p className="text-sm text-gray-700">{email}</p>
        </div>
        <div className="">
          <button
            onClick={() => handleModalDeleteTeammate(teammate)}
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            type="button"
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default Teammate;
