const MentorInfo = (props) => {
  const date1 = new Date(props.mentor.matchedDate);
  const date2 = new Date(props.mentor.endDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className="object-center  w-[90%] bg-white shadow-md rounded-md pt-4 mb-12  relative mx-auto block ">
        <br />

        <img
          src={props.mentor && props.mentor.pic}
          alt={props.mentor && props.mentor.pic}
          className="rounded-full border-blue-700 border-dashed border mb-6 w-[170px] h-[170px]  object-center object-cover relative mx-auto block shadow-md"
        />
        <h1 class="bg-gradient-to-r text-center mx-auto block font-bold text-4xl w-fit from-blue-500 to-indigo-500 text-transparent bg-clip-text">
          {props.mentor.name}
        </h1>
        <h1 class=" text-center mx-auto text-xl mb-9 block mt-2 font-semibold ">
          Expertise: {props.mentor.expertise}
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
          <strong>Meetings Held:</strong> {props.mentor.pastMeetings.length}{" "}
        </p>
        <p class="mb-4 px-20">
          <strong>Documents/Resources Available:</strong>{" "}
          {props.mentor.materials.otherDocs.length +
            props.mentor.materials.taskRefs.length}{" "}
        </p>

        <hr class="w-full border-t-1.5 border-gray-300 my-8" />
        <p class="mb-4 px-20">
          {" "}
          <strong>
            What {props.mentor.name.split(" ")[0]} can help you with:
          </strong>{" "}
          "{props.mentor.mentorshipProp}"
        </p>
        <p class="mb-4 px-20">
          <strong>Mentor Strengths:</strong>

          <div className="mt-4">
            <ul role="list" className="pl-4 list-disc space-y-2">
              {props.mentor &&
                props.mentor.strengths.map((str) => (
                  <li key={str} className="">
                    <span className="">{str}</span>
                  </li>
                ))}
            </ul>
          </div>
        </p>
        <p class="mb-4 px-20">
          {" "}
          <strong>{props.mentor.name.split(" ")[0]}'s background:</strong> "
          {props.mentor.background}"
        </p>
        <p class="mb-5 px-20">
          <strong>Co-founder/Mentor at the following companies:</strong>
          <div class={`grid grid-cols-4 w-fit top-2 mt-3 pb-2 relative`}>
            {props.mentor.orgs.map((org, i) => {
              return (
                <>
                  <span class="block mb-3">
                    {" "}
                    <img
                      src={org.pic}
                      class="w-7 h-7 ml-2 mb-1 inline shadow-sm border-[0.5px] border-gray-300 rounded-full"
                    ></img>{" "}
                    <span class="ml-1">{org.name}</span>{" "}
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
