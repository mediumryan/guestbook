'use client';

export default function AddContentInputZone({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) {
  return (
    <>
      <label className="text-lg">Title</label>
      <input
        type="text"
        className="bg-slate-100 w-full mb-4 p-4"
        placeholder="Enter any title"
        name="title"
      />
      <label className="text-lg">Content</label>
      <textarea
        className="w-full min-h-[25vh] bg-slate-100 rounded-md p-4"
        placeholder="Enter any content"
        name="content"
      />
      <input type="hidden" value={userId} name="userId" />
      <input type="hidden" value={userName} name="userName" />
    </>
  );
}
