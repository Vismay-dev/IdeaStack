const MentorInfo = (props) => {
  const date1 = new Date(props.startup.currentMentorship.matchedDate);
  const date2 = new Date(props.startup.currentMentorship.endDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className="object-center  w-[90%] bg-white shadow-md rounded-md pt-4 mb-12  relative mx-auto block ">
        <br />

        <img
          src={props.startup && props.startup.projPic}
          alt={props.startup && props.startup.projPic}
          className="rounded-full border-blue-700 border-dashed border mb-6 w-[170px] h-[170px]  object-center object-cover relative mx-auto block shadow-md"
        />
        <h1 class="bg-gradient-to-r text-center mx-auto block font-bold text-4xl w-fit from-blue-500 to-indigo-500 text-transparent bg-clip-text">
          {props.startup && props.startup.name}
        </h1>
        <h1 class=" text-center mx-auto text-xl mb-9 block mt-2 font-semibold ">
          Category: {props.startup.category}
        </h1>
        <p class="mb-4 px-20">
          <strong>Time Remaining With This Mentor:</strong> {diffDays} days{" "}
        </p>
        <p class="mb-4 px-20">
          <strong>Mentorship Started On:</strong>{" "}
          {date1.toDateString().substring(0, 10)}{" "}
        </p>
        <p class="mb-4 px-20">
          <strong>Mentorship Ends On:</strong>{" "}
          {date2.toDateString().substring(0, 10)}{" "}
        </p>
        <p class="mb-4 px-20">
          <strong>Meetings Held:</strong>{" "}
          {props.startup.currentMentorship.pastMeetings.length}{" "}
        </p>
        <p class="mb-4 px-20">
          <strong>Documents Uploaded By Startup:</strong>{" "}
          {props.startup.documents.filter((doc) => doc.visibleToMentors)
            .length +
            props.startup.currentMentorship.materials.uploads.length}{" "}
        </p>
        <p class="mb-4 px-20">
          <strong>Your Resources / Reference Documents:</strong>{" "}
          {props.startup.currentMentorship.materials.otherDocs.length +
            props.startup.currentMentorship.materials.taskRefs.length}{" "}
        </p>

        <hr class="w-full border-t-1.5 border-gray-300 my-8" />
        <p class="mb-4 px-20">
          {" "}
          <strong>Startup Description:</strong> {props.startup.problem}
        </p>

        <p class="mb-4 px-20">
          {" "}
          <strong>Category:</strong> {props.startup.category}
        </p>
        <p class="mb-5 px-20">
          <strong>Team-members:</strong>
          <div class={`grid grid-cols-4 w-fit top-2 mt-3 pb-2 relative`}>
            {props.startup.team.map((member, i) => {
              return (
                <>
                  <span class="block mb-3">
                    {" "}
                    <img
                      src={
                        member.profilePic
                          ? member.profilePic
                          : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                      }
                      class="w-7 h-7 ml-2 mb-1 inline shadow-sm border-[0.5px] border-gray-300 rounded-full"
                    ></img>{" "}
                    <span class="ml-1 mr-1.5">
                      {member.name.split(" ")[0] + " (" + member.role + ")"}
                    </span>{" "}
                  </span>
                </>
              );
            })}
          </div>
        </p>
      </div>
    </>
  );
};

export default MentorInfo;
