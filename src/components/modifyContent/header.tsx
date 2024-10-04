import Link from 'next/link';

export default function ModifyContentHeader({
  registered_person_name,
  userName,
}: {
  registered_person_name: string | undefined;
  userName: string;
}) {
  return (
    <div
      className={`flex items-center my-12 ${
        registered_person_name === userName
          ? 'justify-between'
          : 'justify-start'
      }`}
    >
      <div className="col-span-2 flex flex-col items-center">
        <div className="bg-slate-800 rounded-full w-[75px] h-[75px] flex justify-center items-center">
          <p className="text-white font-bold text-2xl opacity-40">
            {registered_person_name?.slice(0, 1).toUpperCase()}
          </p>
        </div>
        <span className="text-sm mt-2">{registered_person_name}</span>
      </div>
      <button
        type="submit"
        className="bg-slate-700 text-white px-4 py-2 mx-1 rounded-md hover:opacity-75"
      >
        SUBMIT
      </button>
    </div>
  );
}
