export const Card = ({ name, bio, profilePhoto, isProfileComplete }) => (
  <div className="card bg-base-100 image-full w-96 shadow-sm">
    <figure>
      <img src={profilePhoto} alt={name} />
    </figure>

    <div className="card-body flex flex-col">
      <h2 className="card-title">{name}</h2>

       <p>{bio}</p>

      <div className="card-actions justify-center mt-auto gap-4">
        <button className="btn btn-primary">Left Swipe</button>
        <button className="btn btn-secondary">Right Swipe</button>
      </div>
    </div>
  </div>
);