const MentorInfo = (props) => {
  const date1 = new Date(props.mentor.matchedDate);
  const date2 = new Date(props.mentor.endDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className="object-center  sm:w-[90%] w-[100%] bg-white shadow-md rounded-md pt-4 mb-12  relative mx-auto block ">
        <br />

        <img
          src={props.mentor && props.mentor.pic}
          alt={props.mentor && props.mentor.pic}
          className="rounded-full border-blue-700 border-dashed border mb-6 sm:w-[170px] sm:h-[170px] w-[140px] h-[140px]  object-center object-cover relative mx-auto block shadow-md"
        />
        <h1 class="bg-gradient-to-r text-center px-4 mx-auto block font-bold sm:text-4xl text-3xl w-fit from-blue-500 to-indigo-500 text-transparent bg-clip-text">
          {props.mentor.name}
        </h1>
        <h1 class=" text-center mx-auto sm:text-xl text-lg mb-9  px-4 block mt-2 font-semibold ">
          Expertise: {props.mentor.expertise}
        </h1>
        <p class="mb-4 lg:px-20 sm:text-left text-center sm:text-base text-sm sm:px-12 px-6">
          <strong>Time Remaining With This Mentor:</strong>
          <br class="sm:hidden block" /> {diffDays} days{" "}
        </p>
        <p class="mb-4 lg:px-20 sm:text-left text-center sm:text-base text-sm sm:px-12 px-6">
          <strong>Mentorship Started On:</strong>
          <br class="sm:hidden block" /> {date1.toDateString().substring(0, 10)}{" "}
        </p>
        <p class="mb-4 lg:px-20 sm:text-left text-center sm:text-base text-sm sm:px-12 px-6">
          <strong>Mentorship Ends On:</strong>
          <br class="sm:hidden block" /> {date2.toDateString().substring(0, 10)}{" "}
        </p>
        <p class="mb-4 lg:px-20 sm:text-left text-center sm:text-base text-sm sm:px-12 px-6">
          <strong>Meetings Held:</strong>
          <br class="sm:hidden block" /> {props.mentor.pastMeetings.length}{" "}
        </p>
        <p class="mb-4 lg:px-20 sm:text-left text-center sm:text-base text-sm sm:px-12 px-6">
          <strong>Documents/Resources Available:</strong>{" "}
          <br class="sm:hidden block" />
          {props.mentor.materials.otherDocs.length +
            props.mentor.materials.taskRefs.length}{" "}
        </p>

        <hr class="w-full border-t-1.5 border-gray-300 my-8" />
        <p class="mb-4 lg:px-20 sm:px-12 sm:text-base text-sm px-6">
          {" "}
          <strong>
            What {props.mentor.name.split(" ")[0]} can help you with:
          </strong>{" "}
          "{props.mentor.mentorshipProp}"
        </p>
        <p class="mb-4 lg:px-20 sm:px-12 sm:text-base text-sm px-6">
          <strong>Mentor Strengths:</strong>

          <div className="mt-4 sm:text-base text-sm">
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
        <p class="mb-4 lg:px-20 sm:px-12 sm:text-base text-sm px-6">
          {" "}
          <strong>{props.mentor.name.split(" ")[0]}'s background:</strong> "
          {props.mentor.background}"
        </p>
        <p class="mb-5 lg:px-20 sm:px-12 sm:text-base text-sm px-6">
          <strong class="">
            Co-founder/Mentor at the following companies:
          </strong>
          <div
            class={`grid md:grid-cols-4 sm:text-base text-sm sm:grid-cols-3 grid-cols-2  w-fit top-2 mt-3 pb-2 relative`}
          >
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
