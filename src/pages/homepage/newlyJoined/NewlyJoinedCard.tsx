import { NewlyJoinedHandyman } from "../../../interfaces/Interfaces";

const NewlyJoinedCard = ({ newMember }: { newMember: NewlyJoinedHandyman }) => {
  return (
    <div className="newly-joined-card d-flex flex-column align-items-center justify-content-center ">
      <img src={newMember.img} alt={newMember.name} />
      <div className="d-flex flex-row align-items-center text-center img-container mt-3">
        <h6 className="mb-0 new-Handyman pe-1">{newMember.name}</h6>
        <img src="/icons/verified-icon.svg" alt="" />
      </div>
      <p>{newMember.specialty}</p>
    </div>
  );
};

export default NewlyJoinedCard;
